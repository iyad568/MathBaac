export type CommunityCategoryKey =
  | 'mathematics'
  | 'functions'
  | 'derivatives'
  | 'integrals'
  | 'probability'
  | 'geometry'
  | 'bac-exercises'
  | 'study-tips'
  | 'general';

export interface CategoryInfo {
  key: CommunityCategoryKey;
  label: string;
  englishLabel: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  iconName: string;
}

export type CommunityBadgeType =
  | 'helpful-student'
  | 'math-expert'
  | 'bac-helper'
  | 'top-contributor';

export interface BadgeInfo {
  id: CommunityBadgeType;
  title: string;
  englishTitle: string;
  description: string;
  icon: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export interface CommunityUser {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  stream: string;
  reputation: number;
  badges: CommunityBadgeType[];
  postsCount: number;
  answersCount: number;
  helpfulAnswersCount: number;
  joinedDate: string;
  bio?: string;
}

export interface CommunityReply {
  id: string;
  answerId: string;
  author: CommunityUser;
  content: string;
  createdAt: string;
  votes: number;
  userVote?: 'up' | 'down' | null;
}

export interface CommunityAnswer {
  id: string;
  postId: string;
  author: CommunityUser;
  content: string;
  createdAt: string;
  votes: number;
  userVote?: 'up' | 'down' | null;
  isBestAnswer: boolean;
  replies: CommunityReply[];
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: CommunityCategoryKey;
  author: CommunityUser;
  createdAt: string;
  votes: number;
  userVote?: 'up' | 'down' | null;
  isFollowed?: boolean;
  viewsCount: number;
  answersCount: number;
  hasBestAnswer: boolean;
  imageUrl?: string;
  imageCaption?: string;
  tags: string[];
  answers: CommunityAnswer[];
}

export type CommunityTab = 'latest' | 'popular' | 'unanswered' | 'my-discussions';
