import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Award,
  MessageSquare,
  FileQuestion,
  CheckCircle2,
  Calendar,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { CommunityAnswer, CommunityPost, CommunityUser } from '../../types/community';
import { BadgeDisplay } from './BadgeDisplay';
import { CategoryBadge } from './CategoryBadge';
import { communityService } from '../../services/communityService';
import { MathContentRenderer } from './MathContentRenderer';

interface StudentProfileModalProps {
  userId: string | null;
  onClose: () => void;
}

interface UserAnswerEntry {
  postId: string;
  postTitle: string;
  answer: CommunityAnswer;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  userId,
  onClose
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'discussions' | 'answers'>('discussions');
  const [user, setUser] = useState<CommunityUser | null>(null);
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setLoading(true);
    setUser(null);
    (async () => {
      const [profile, posts, answers] = await Promise.all([
        communityService.getUserProfile(userId),
        communityService.getUserPosts(userId),
        communityService.getUserAnswers(userId),
      ]);
      if (cancelled) return;
      setUser(profile ?? null);
      setUserPosts(posts);
      setUserAnswers(answers);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!userId) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full text-center text-sm text-slate-500 dark:text-slate-400">
          جاري تحميل الملف الشخصي...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full text-center space-y-4">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">لم يتم العثور على ملف هذا الطالب.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            إغلاق
          </button>
        </div>
      </div>
    );
  }

  const navigateToPost = (postId: string) => {
    onClose();
    navigate(`/community/post/${postId}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
            {/* Avatar */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-xl shadow-black/30 border-2 border-indigo-400/30">
              {user.name ? user.name.charAt(0) : 'ط'}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-extrabold text-white">{user.name}</h2>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-700/50">
                  @{user.username}
                </span>
              </div>

              <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>{user.stream}</span>
              </p>

              {user.bio && (
                <p className="text-xs text-slate-300/90 leading-relaxed pt-1 max-w-lg">
                  {user.bio}
                </p>
              )}

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>انضم: {user.joinedDate}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid & Reputation */}
        <div className="grid grid-cols-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-700 divide-x divide-x-reverse divide-slate-200 dark:divide-slate-700 text-center">
          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span className="text-base sm:text-xl font-mono">{user.reputation}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">نقاط السمعة</p>
          </div>

          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
              <FileQuestion className="w-4 h-4" />
              <span className="text-base sm:text-xl font-mono">{user.postsCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">الأسئلة</p>
          </div>

          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
              <MessageSquare className="w-4 h-4" />
              <span className="text-base sm:text-xl font-mono">{user.answersCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">الإجابات</p>
          </div>

          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-base sm:text-xl font-mono">{user.helpfulAnswersCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">إجابات معتمدة</p>
          </div>
        </div>

        {/* Badges Earned */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>الأوسمة والشارات المكتسبة</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              {user.badges.length} أوسمة تفوق
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.badges.map((badgeKey) => (
              <BadgeDisplay key={badgeKey} badge={badgeKey} size="sm" showDescription />
            ))}
          </div>
        </div>

        {/* Discussions & Answers Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 px-4 bg-slate-50/50 dark:bg-slate-800/60">
          <button
            type="button"
            onClick={() => setActiveTab('discussions')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'discussions'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <FileQuestion className="w-4 h-4" />
            <span>الأسئلة والمناقشات ({userPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('answers')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'answers'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>الإجابات والحلول ({userAnswers.length})</span>
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {activeTab === 'discussions' ? (
            userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigateToPost(post.id)}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/40 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-2xl transition-all cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <CategoryBadge categoryKey={post.category} size="sm" />
                    <span className="text-[11px] text-slate-400">{post.createdAt}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                    <MathContentRenderer content={post.title} inline />
                  </h4>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>{post.votes} إعجاب</span>
                    <span>•</span>
                    <span>{post.answersCount} إجابات</span>
                    {post.hasBestAnswer && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          إجابة معتمدة
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-slate-400 py-8">
                لم يطرح هذا الطالب أي سؤال بعد.
              </p>
            )
          ) : userAnswers.length > 0 ? (
            userAnswers.map(({ postId, postTitle, answer }) => (
              <div
                key={answer.id}
                onClick={() => navigateToPost(postId)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 group ${
                  answer.isBestAnswer
                    ? 'bg-emerald-50/40 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium truncate max-w-xs">
                    إجابة في: <strong className="text-slate-800 dark:text-slate-100"><MathContentRenderer content={postTitle} inline /></strong>
                  </span>
                  {answer.isBestAnswer && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      إجابة نموذجية
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                  <MathContentRenderer content={answer.content} />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>{answer.votes} إعجاب بالحل</span>
                  <span>{answer.createdAt}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-slate-400 py-8">
              لم يقدم هذا الطالب إجابات حتى الآن.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
