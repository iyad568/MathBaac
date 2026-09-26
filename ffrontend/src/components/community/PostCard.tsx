import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bookmark,
  CheckCircle2,
  Clock,
  Eye,
  ImageIcon
} from 'lucide-react';
import { CommunityPost } from '../../types/community';
import { CategoryBadge } from './CategoryBadge';
import { BadgeDisplay } from './BadgeDisplay';
import { MathContentRenderer } from './MathContentRenderer';
import { communityService } from '../../services/communityService';

interface PostCardProps {
  post: CommunityPost;
  onOpenAuthorProfile?: (userId: string) => void;
  onCategoryClick?: (categoryKey: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onOpenAuthorProfile,
  onCategoryClick
}) => {
  const navigate = useNavigate();

  // Local, optimistic overlay on top of the fetched post — avoids re-fetching the whole list on every click.
  const [votes, setVotes] = useState(post.votes);
  const [userVote, setUserVote] = useState(post.userVote);
  const [isFollowed, setIsFollowed] = useState(post.isFollowed);

  const handleVote = async (e: React.MouseEvent, direction: 'up' | 'down') => {
    e.stopPropagation();
    const previous = { votes, userVote };
    try {
      const result = await communityService.votePost(post.id, direction);
      setVotes(result.votes);
      setUserVote(result.userVote);
    } catch {
      setVotes(previous.votes);
      setUserVote(previous.userVote);
    }
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowed(communityService.toggleFollowPost(post.id));
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenAuthorProfile && post.author?.id) {
      onOpenAuthorProfile(post.author.id);
    } else if (post.author?.id) {
      navigate(`/community/user/${post.author.id}`);
    }
  };

  return (
    <article
      onClick={() => navigate(`/community/post/${post.id}`)}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-700 hover:border-indigo-300/80 dark:hover:border-indigo-700 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row overflow-hidden group cursor-pointer"
    >
      {/* Like / Dislike Reaction Column (Desktop) */}
      <div
        className="hidden md:flex flex-col items-center justify-start p-2.5 bg-slate-50/80 dark:bg-slate-800/60 border-l border-slate-100 dark:border-slate-700 min-w-[62px] gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => handleVote(e, 'up')}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            userVote === 'up'
              ? 'text-blue-600 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-900/30 shadow-xs ring-1 ring-blue-300'
              : 'text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/70'
          }`}
          title="أعجبني"
          aria-label="إعجاب"
        >
          <ThumbsUp className={`w-4 h-4 ${userVote === 'up' ? 'fill-blue-600' : ''}`} />
        </button>

        <span
          className={`font-mono font-bold text-xs py-0.5 ${
            votes > 0
              ? 'text-blue-600 dark:text-blue-400'
              : votes < 0
              ? 'text-rose-600 dark:text-rose-400'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {votes}
        </span>

        <button
          type="button"
          onClick={(e) => handleVote(e, 'down')}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            userVote === 'down'
              ? 'text-rose-600 dark:text-rose-400 bg-rose-100/90 dark:bg-rose-900/30 shadow-xs ring-1 ring-rose-300'
              : 'text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50/70'
          }`}
          title="لم يعجبني"
          aria-label="لم يعجبني"
        >
          <ThumbsDown className={`w-4 h-4 ${userVote === 'down' ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between space-y-3">
        {/* Top Meta Bar: Category, Author, Badges, Time, Follow */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span
              onClick={(e) => {
                if (onCategoryClick) {
                  e.stopPropagation();
                  onCategoryClick(post.category);
                }
              }}
            >
              <CategoryBadge categoryKey={post.category} size="sm" />
            </span>

            {/* Best Answer Indicator */}
            {post.hasBestAnswer && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/60 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>إجابة معتمدة</span>
              </span>
            )}

            {/* Image attachment indicator */}
            {post.imageUrl && (
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-[11px] font-medium">
                <ImageIcon className="w-3 h-3 text-indigo-500" />
                <span>مرفق تمرين</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{post.createdAt}</span>
            </span>

            <button
              type="button"
              onClick={handleFollow}
              title={isFollowed ? 'إلغاء المتابعة' : 'متابعة السؤال'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isFollowed
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isFollowed ? 'fill-amber-500 text-amber-600 dark:text-amber-400' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Title with Mathematical KaTeX Rendering */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors leading-snug">
          <MathContentRenderer content={post.title} inline />
        </h2>

        {/* Content Preview with Mathematical KaTeX Rendering */}
        <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-h-24 sm:max-h-28 overflow-hidden relative">
          <MathContentRenderer content={post.content} compact maxParagraphs={2} />
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
        </div>

        {/* Bottom Bar: Author Profile Info + Comments Count + Views */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Author Badge */}
          <div
            onClick={handleAuthorClick}
            className="flex items-center gap-2 group/author hover:opacity-90"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {post.author?.name ? post.author.name.charAt(0) : 'ط'}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-slate-800 dark:text-slate-100 group-hover/author:text-indigo-600 group-hover/author:underline transition-colors">
                {post.author?.name}
              </span>

              {post.author?.badges && post.author.badges.length > 0 && (
                <BadgeDisplay badge={post.author.badges[0]} size="xs" />
              )}
            </div>
          </div>

          {/* Mobile Vote Controls + Counters */}
          <div className="flex items-center gap-4">
            {/* Mobile Like / Dislike Controls */}
            <div
              className="flex md:hidden items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 px-2 py-1 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => handleVote(e, 'up')}
                className={`p-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors ${
                  userVote === 'up' ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20' : 'text-slate-400 hover:text-blue-600 dark:hover:text-blue-300'
                }`}
                title="أعجبني"
                aria-label="إعجاب"
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${userVote === 'up' ? 'fill-blue-600' : ''}`} />
              </button>
              <span className={`font-mono font-bold text-xs px-0.5 ${
                votes > 0 ? 'text-blue-600 dark:text-blue-400' : votes < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {votes}
              </span>
              <button
                type="button"
                onClick={(e) => handleVote(e, 'down')}
                className={`p-1 rounded-lg cursor-pointer transition-colors ${
                  userVote === 'down' ? 'text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-900/20' : 'text-slate-400 hover:text-rose-600 dark:hover:text-rose-300'
                }`}
                title="لم يعجبني"
                aria-label="لم يعجبني"
              >
                <ThumbsDown className={`w-3.5 h-3.5 ${userVote === 'down' ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Comments Counter */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold text-xs ${
                post.answersCount > 0
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-mono">{post.answersCount}</span>
              <span>{post.answersCount === 1 ? 'إجابة' : 'إجابات'}</span>
            </div>

            {/* Views Count */}
            <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs">
              <Eye className="w-3.5 h-3.5" />
              <span className="font-mono">{post.viewsCount || 1}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
