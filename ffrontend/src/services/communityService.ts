import {
  CommunityPost,
  CommunityAnswer,
  CommunityReply,
  CommunityCategoryKey,
  CommunityUser,
  CommunityBadgeType
} from '../types/community';
import { apiClient, resolveUploadUrl } from './apiClient';
import { formatRelativeArabicTime, formatAbsoluteArabicDate } from '../utils/relativeTime';

// ── Wire shapes returned by the backend (camelCase, numeric ids) ───────────

interface ApiAuthor {
  id: number;
  name: string;
  username: string | null;
  avatarUrl: string | null;
  stream: string | null;
  badges: string[] | null;
}
interface ApiReply {
  id: number; answerId: number; author: ApiAuthor; content: string;
  createdAt: string; votes: number; userVote: 'up' | 'down' | null;
}
interface ApiAnswer {
  id: number; postId: number; author: ApiAuthor; content: string; createdAt: string;
  votes: number; userVote: 'up' | 'down' | null; isBestAnswer: boolean; replies: ApiReply[];
}
interface ApiPostListItem {
  id: number; title: string; content: string; category: string; author: ApiAuthor;
  createdAt: string; votes: number; userVote: 'up' | 'down' | null; viewsCount: number;
  answersCount: number; hasBestAnswer: boolean; imageUrl: string | null; imageCaption: string | null;
  tags: string[] | null;
}
interface ApiPostDetail extends ApiPostListItem {
  answers: ApiAnswer[];
}
interface ApiProfile {
  id: number; name: string; username: string | null; avatarUrl: string | null; stream: string | null;
  reputation: number; badges: string[] | null; postsCount: number; answersCount: number;
  helpfulAnswersCount: number; joinedDate: string | null; bio: string | null;
}
interface ApiAnswerWithPost {
  postId: number; postTitle: string; answer: ApiAnswer;
}

// ── Local-only "follow" (bookmark) state ────────────────────────────────────
// The backend has no follow/bookmark feature; this is a per-browser convenience only.
const FOLLOWS_KEY = 'mathbac_community_follows';

function loadFollows(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(FOLLOWS_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function saveFollows(follows: Set<string>): void {
  try {
    localStorage.setItem(FOLLOWS_KEY, JSON.stringify(Array.from(follows)));
  } catch {
    // ignore quota/availability errors
  }
}

// ── Mappers: API shape -> frontend types ────────────────────────────────────

function toAuthor(a: ApiAuthor): CommunityUser {
  return {
    id: String(a.id),
    name: a.name,
    username: a.username ?? `user_${a.id}`,
    avatarUrl: a.avatarUrl ?? undefined,
    stream: a.stream ?? '',
    reputation: 0, // not included on the lightweight embedded author; see getPostById's enrichment
    badges: (a.badges ?? []) as CommunityBadgeType[],
    postsCount: 0,
    answersCount: 0,
    helpfulAnswersCount: 0,
    joinedDate: '',
  };
}

function toReply(r: ApiReply): CommunityReply {
  return {
    id: String(r.id),
    answerId: String(r.answerId),
    author: toAuthor(r.author),
    content: r.content,
    createdAt: formatRelativeArabicTime(r.createdAt),
    votes: r.votes,
    userVote: r.userVote,
  };
}

function toAnswer(a: ApiAnswer): CommunityAnswer {
  return {
    id: String(a.id),
    postId: String(a.postId),
    author: toAuthor(a.author),
    content: a.content,
    createdAt: formatRelativeArabicTime(a.createdAt),
    votes: a.votes,
    userVote: a.userVote,
    isBestAnswer: a.isBestAnswer,
    replies: (a.replies ?? []).map(toReply),
  };
}

function toPost(p: ApiPostListItem, answers: CommunityAnswer[] = []): CommunityPost {
  return {
    id: String(p.id),
    title: p.title,
    content: p.content,
    category: p.category as CommunityCategoryKey,
    author: toAuthor(p.author),
    createdAt: formatRelativeArabicTime(p.createdAt),
    votes: p.votes,
    userVote: p.userVote,
    isFollowed: false, // filled in by applyFollow()
    viewsCount: p.viewsCount,
    answersCount: p.answersCount,
    hasBestAnswer: p.hasBestAnswer,
    imageUrl: resolveUploadUrl(p.imageUrl),
    imageCaption: p.imageCaption ?? undefined,
    tags: p.tags ?? [],
    answers,
  };
}

function toProfile(p: ApiProfile): CommunityUser {
  return {
    id: String(p.id),
    name: p.name,
    username: p.username ?? `user_${p.id}`,
    avatarUrl: p.avatarUrl ?? undefined,
    stream: p.stream ?? '',
    reputation: p.reputation,
    badges: (p.badges ?? []) as CommunityBadgeType[],
    postsCount: p.postsCount,
    answersCount: p.answersCount,
    helpfulAnswersCount: p.helpfulAnswersCount,
    joinedDate: formatAbsoluteArabicDate(p.joinedDate),
    bio: p.bio ?? undefined,
  };
}

const voteValue = (direction: 'up' | 'down'): 1 | -1 => (direction === 'up' ? 1 : -1);

class CommunityService {
  private followed: Set<string> = loadFollows();

  private applyFollow(post: CommunityPost): CommunityPost {
    post.isFollowed = this.followed.has(post.id);
    return post;
  }

  // ── Posts ──────────────────────────────────────────────────────────────

  public async getPosts(category?: CommunityCategoryKey): Promise<CommunityPost[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const data = await apiClient.get<ApiPostListItem[]>(`/community/posts${query}`);
    return data.map((p) => this.applyFollow(toPost(p)));
  }

  public async getPostById(postId: string, options: { countView?: boolean } = {}): Promise<CommunityPost | undefined> {
    const countView = options.countView ?? true;
    try {
      const data = await apiClient.get<ApiPostDetail>(`/community/posts/${postId}?count_view=${countView}`);
      const post = toPost(data, data.answers.map(toAnswer));
      // Enrich the post author with real reputation/counts for the sidebar (the embedded
      // author on list/detail responses is lightweight and doesn't include them).
      try {
        const profile = await apiClient.get<ApiProfile>(`/community/users/${data.author.id}`);
        post.author = { ...post.author, ...toProfile(profile), id: post.author.id };
      } catch {
        // non-fatal: keep the lightweight author if the profile fetch fails
      }
      return this.applyFollow(post);
    } catch {
      return undefined;
    }
  }

  /** Returns the raw relative path from the server (e.g. "/uploads/community/xxx.jpg")
   * so it can be stored as-is in a post — resolve it for display with resolveUploadUrl. */
  public async uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);
    const { url } = await apiClient.postForm<{ url: string }>('/community/uploads/image', form);
    return url;
  }

  public async createPost(data: {
    title: string;
    content: string;
    category: CommunityCategoryKey;
    tags?: string[];
    imageUrl?: string;
    imageCaption?: string;
  }): Promise<CommunityPost> {
    const created = await apiClient.post<ApiPostListItem>('/community/posts', {
      title: data.title,
      content: data.content,
      category: data.category,
      tags: data.tags && data.tags.length > 0 ? data.tags : undefined,
      imageUrl: data.imageUrl || undefined,
      imageCaption: data.imageCaption || undefined,
    });
    this.followed.add(String(created.id)); // auto-follow your own new post
    saveFollows(this.followed);
    return this.applyFollow(toPost(created));
  }

  public async votePost(postId: string, direction: 'up' | 'down'): Promise<{ votes: number; userVote: 'up' | 'down' | null }> {
    const data = await apiClient.post<ApiPostListItem>(`/community/posts/${postId}/vote`, { value: voteValue(direction) });
    return { votes: data.votes, userVote: data.userVote };
  }

  public toggleFollowPost(postId: string): boolean {
    if (this.followed.has(postId)) this.followed.delete(postId);
    else this.followed.add(postId);
    saveFollows(this.followed);
    return this.followed.has(postId);
  }

  public isFollowed(postId: string): boolean {
    return this.followed.has(postId);
  }

  // ── Answers & replies ──────────────────────────────────────────────────

  public async addAnswer(postId: string, content: string): Promise<CommunityAnswer> {
    const data = await apiClient.post<ApiAnswer>(`/community/posts/${postId}/answers`, { content });
    return toAnswer(data);
  }

  public async voteAnswer(answerId: string, direction: 'up' | 'down'): Promise<{ votes: number; userVote: 'up' | 'down' | null }> {
    const data = await apiClient.post<ApiAnswer>(`/community/answers/${answerId}/vote`, { value: voteValue(direction) });
    return { votes: data.votes, userVote: data.userVote };
  }

  public async markBestAnswer(answerId: string): Promise<CommunityAnswer> {
    const data = await apiClient.post<ApiAnswer>(`/community/answers/${answerId}/best`);
    return toAnswer(data);
  }

  public async addReply(answerId: string, content: string): Promise<CommunityReply> {
    const data = await apiClient.post<ApiReply>(`/community/answers/${answerId}/replies`, { content });
    return toReply(data);
  }

  public async voteReply(replyId: string, direction: 'up' | 'down'): Promise<{ votes: number; userVote: 'up' | 'down' | null }> {
    const data = await apiClient.post<ApiReply>(`/community/replies/${replyId}/vote`, { value: voteValue(direction) });
    return { votes: data.votes, userVote: data.userVote };
  }

  // ── Profiles ───────────────────────────────────────────────────────────

  public async getUserProfile(userId: string): Promise<CommunityUser | undefined> {
    try {
      return toProfile(await apiClient.get<ApiProfile>(`/community/users/${userId}`));
    } catch {
      return undefined;
    }
  }

  public async getUserPosts(userId: string): Promise<CommunityPost[]> {
    const data = await apiClient.get<ApiPostListItem[]>(`/community/users/${userId}/posts`);
    return data.map((p) => this.applyFollow(toPost(p)));
  }

  public async getUserAnswers(userId: string): Promise<{ postId: string; postTitle: string; answer: CommunityAnswer }[]> {
    const data = await apiClient.get<ApiAnswerWithPost[]>(`/community/users/${userId}/answers`);
    return data.map((d) => ({ postId: String(d.postId), postTitle: d.postTitle, answer: toAnswer(d.answer) }));
  }

  // ── Client-side helpers (derived from an already-fetched post list) ────

  public getCategoryCounts(posts: CommunityPost[]): Record<string, number> {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }

  public getRelatedPosts(posts: CommunityPost[], excludePostId: string, category: CommunityCategoryKey, limit = 4): CommunityPost[] {
    return posts.filter((p) => p.id !== excludePostId && p.category === category).slice(0, limit);
  }
}

export const communityService = new CommunityService();
