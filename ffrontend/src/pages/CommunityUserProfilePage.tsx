import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  Calendar,
  Sparkles,
  FileQuestion,
  MessageSquare,
  CheckCircle2,
  Award
} from 'lucide-react';
import { CommunityAnswer, CommunityPost, CommunityUser } from '../types/community';
import { communityService } from '../services/communityService';
import { BadgeDisplay } from '../components/community/BadgeDisplay';
import { CategoryBadge } from '../components/community/CategoryBadge';
import { MathContentRenderer } from '../components/community/MathContentRenderer';

interface UserAnswerEntry {
  postId: string;
  postTitle: string;
  answer: CommunityAnswer;
}

export const CommunityUserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
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

  if (!userId) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">معرّف الطالب غير محدد</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400">
        جاري تحميل الملف الشخصي...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 max-w-md mx-auto my-12 space-y-4">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">لم يتم العثور على هذا الطالب</p>
        <button
          onClick={() => navigate('/community')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          العودة للمجتمع
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-16 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/community')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة إلى مجتمع الرياضيات</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-xl border-2 border-indigo-400/30">
              {user.name.charAt(0)}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-700/50">
                  @{user.username}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>{user.stream}</span>
              </p>

              {user.bio && (
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed pt-1 max-w-xl">
                  {user.bio}
                </p>
              )}

              <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1 pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>عضو منذ: {user.joinedDate}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-700 divide-x divide-x-reverse divide-slate-200 dark:divide-slate-700 text-center">
          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span className="text-lg sm:text-2xl font-mono">{user.reputation}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">نقاط السمعة</p>
          </div>

          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
              <FileQuestion className="w-4 h-4" />
              <span className="text-lg sm:text-2xl font-mono">{user.postsCount}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">الأسئلة</p>
          </div>

          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
              <MessageSquare className="w-4 h-4" />
              <span className="text-lg sm:text-2xl font-mono">{user.answersCount}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">الإجابات</p>
          </div>

          <div className="px-2">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-lg sm:text-2xl font-mono">{user.helpfulAnswersCount}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">إجابات معتمدة</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h2 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>شارات وأوسمة التميز الأكاديمي</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {user.badges.map((badgeKey) => (
              <BadgeDisplay key={badgeKey} badge={badgeKey} size="sm" showDescription />
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 px-6 bg-slate-50/50 dark:bg-slate-800/60">
          <button
            type="button"
            onClick={() => setActiveTab('discussions')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
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
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'answers'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>الإجابات والحلول ({userAnswers.length})</span>
          </button>
        </div>

        {/* List Body */}
        <div className="p-6 space-y-3">
          {activeTab === 'discussions' ? (
            userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/community/post/${post.id}`)}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/40 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-2xl transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <CategoryBadge categoryKey={post.category} size="sm" />
                    <span className="text-xs text-slate-400">{post.createdAt}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                    <MathContentRenderer content={post.title} inline />
                  </h3>

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
              <p className="text-center text-xs text-slate-400 py-10">
                لم يطرح هذا الطالب أي أسئلة حتى الآن.
              </p>
            )
          ) : userAnswers.length > 0 ? (
            userAnswers.map(({ postId, postTitle, answer }) => (
              <div
                key={answer.id}
                onClick={() => navigate(`/community/post/${postId}`)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 group ${
                  answer.isBestAnswer
                    ? 'bg-emerald-50/40 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    إجابة في: <strong className="text-slate-800 dark:text-slate-100"><MathContentRenderer content={postTitle} inline /></strong>
                  </span>
                  {answer.isBestAnswer && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      إجابة نموذجية
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <MathContentRenderer content={answer.content} />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>{answer.votes} إعجاب</span>
                  <span>{answer.createdAt}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-slate-400 py-10">
              لم يقدم هذا الطالب إجابات حتى الآن.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
