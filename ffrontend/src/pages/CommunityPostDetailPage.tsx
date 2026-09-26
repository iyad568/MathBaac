import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bookmark,
  CheckCircle2,
  Clock,
  Eye,
  Share2,
  ArrowRight,
  Send,
  Sparkles,
  HelpCircle,
  AlertCircle,
  CornerDownLeft,
  Check,
  Award
} from 'lucide-react';
import { CommunityPost, CommunityAnswer } from '../types/community';
import { communityService } from '../services/communityService';
import { MathContentRenderer } from '../components/community/MathContentRenderer';
import { CategoryBadge } from '../components/community/CategoryBadge';
import { BadgeDisplay } from '../components/community/BadgeDisplay';
import { StudentProfileModal } from '../components/community/StudentProfileModal';
import { useAuth } from '../context/AuthContext';

const MATH_SHORTCUTS = [
  { label: 'كسر', latex: '$\\frac{a}{b}$' },
  { label: 'جذر', latex: '$\\sqrt{x}$' },
  { label: 'نهاية', latex: '$\\lim_{x \\to x_0} f(x)$' },
  { label: 'تكامل', latex: '$\\int_a^b f(x) dx$' },
  { label: 'مشتقة', latex: '$f\'(x)$' },
  { label: 'دالة أسية', latex: '$e^x$' },
  { label: 'لوغاريتم', latex: '$\\ln(x)$' }
];

export const CommunityPostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  const [post, setPost] = useState<CommunityPost | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<CommunityPost[]>([]);
  const [answerContent, setAnswerContent] = useState('');
  const [replyContentMap, setReplyContentMap] = useState<Record<string, string>>({});
  const [replyingToAnswerId, setReplyingToAnswerId] = useState<string | null>(null);
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Reloads the post without counting another view — used after voting/answering/replying.
  const refresh = async (id: string) => {
    const p = await communityService.getPostById(id, { countView: false });
    if (p) setPost(p);
  };

  useEffect(() => {
    if (!postId) return;
    let cancelled = false;

    (async () => {
      const p = await communityService.getPostById(postId); // counts the initial view
      if (cancelled) return;
      if (!p) {
        setNotFound(true);
        return;
      }
      setPost(p);
      const all = await communityService.getPosts(p.category);
      if (!cancelled) setRelatedPosts(communityService.getRelatedPosts(all, p.id, p.category, 3));
    })();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (notFound) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 max-w-lg mx-auto my-12 space-y-4">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">السؤال غير موجود أو تم حذفه</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          قد يكون الرابط غير صحيح أو تم نقل المناقشة إلى قسم آخر.
        </p>
        <button
          onClick={() => navigate('/community')}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
        >
          العودة إلى مجتمع الرياضيات
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 max-w-lg mx-auto my-12 text-sm text-slate-500 dark:text-slate-400">
        جاري تحميل السؤال...
      </div>
    );
  }

  const handleVotePost = async (direction: 'up' | 'down') => {
    try {
      await communityService.votePost(post.id, direction);
      await refresh(post.id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'تعذر تسجيل التصويت');
    }
  };

  const handleVoteAnswer = async (answerId: string, direction: 'up' | 'down') => {
    try {
      await communityService.voteAnswer(answerId, direction);
      await refresh(post.id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'تعذر تسجيل التصويت');
    }
  };

  const handleFollow = () => {
    setPost((prev) => (prev ? { ...prev, isFollowed: communityService.toggleFollowPost(prev.id) } : prev));
  };

  const handleMarkBestAnswer = async (answerId: string) => {
    try {
      await communityService.markBestAnswer(answerId);
      await refresh(post.id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'تعذر اعتماد الإجابة');
    }
  };

  const handleInsertLatexToAnswer = (latex: string) => {
    setAnswerContent(
      (prev) => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + latex + ' '
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnswerError(null);

    if (!answerContent.trim() || answerContent.trim().length < 8) {
      setAnswerError('يرجى كتابة إجابة مفيدة وشرح خطوة بخطوة للحل');
      return;
    }

    setIsSubmittingAnswer(true);
    try {
      await communityService.addAnswer(post.id, answerContent.trim());
      setAnswerContent('');
      await refresh(post.id);
    } catch (err) {
      setAnswerError(err instanceof Error ? err.message : 'تعذر نشر الإجابة');
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const handleSendReply = async (answerId: string) => {
    const text = replyContentMap[answerId];
    if (!text || !text.trim()) return;

    try {
      await communityService.addReply(answerId, text.trim());
      setReplyContentMap((prev) => ({ ...prev, [answerId]: '' }));
      setReplyingToAnswerId(null);
      await refresh(post.id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'تعذر إرسال الرد');
    }
  };

  // Only the post's actual author may mark a best answer — the backend enforces this too.
  const isPostAuthor = Boolean(authUser && post.author?.id === authUser.id);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {actionError && (
        <div className="p-3 rounded-xl text-xs flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Back to Community Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/community')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لكافة المناقشات</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">تم نسخ الرابط!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>مشاركة</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleFollow}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              post.isFollowed
                ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${post.isFollowed ? 'fill-amber-500 text-amber-600 dark:text-amber-400' : ''}`}
            />
            <span>{post.isFollowed ? 'تمت المتابعة' : 'متابعة النقاش'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Post & Answers Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Question / Main Post Card */}
          <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 space-y-4">
              {/* Category, Status & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <CategoryBadge categoryKey={post.category} size="sm" />
                  {post.hasBestAnswer && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/60 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>تم الحل بإجابة معتمدة</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.createdAt}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{post.viewsCount || 1} مشاهدة</span>
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-snug">
                <MathContentRenderer content={post.title} inline />
              </h1>

              {/* Author Strip */}
              <div
                onClick={() => setViewingUserId(post.author?.id)}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:bg-indigo-50/50 transition-colors cursor-pointer w-fit"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {post.author?.name ? post.author.name.charAt(0) : 'ط'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 underline-offset-2 hover:underline">
                      {post.author?.name}
                    </span>
                    {post.author?.badges && post.author.badges.length > 0 && (
                      <BadgeDisplay badge={post.author.badges[0]} size="xs" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{post.author?.stream}</p>
                </div>
              </div>

              {/* Post Body (KaTeX Rendered) */}
              <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100 pt-2">
                <MathContentRenderer content={post.content} />
              </div>

              {/* Attached Image (if any) */}
              {post.imageUrl && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800/60 p-2 space-y-2">
                  <img
                    src={post.imageUrl}
                    alt={post.imageCaption || 'صورة التمرين المرفقة'}
                    className="w-full max-h-96 object-contain rounded-xl bg-white dark:bg-slate-900"
                  />
                  {post.imageCaption && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium">
                      {post.imageCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Post Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Like / Dislike Reaction Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">التفاعل مع السؤال:</span>
                  <div className="inline-flex items-center bg-slate-100/90 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 gap-1">
                    <button
                      type="button"
                      onClick={() => handleVotePost('up')}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all ${
                        post.userVote === 'up'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-white/80'
                      }`}
                      title="أعجبني"
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.userVote === 'up' ? 'fill-white' : ''}`} />
                      <span>إعجاب ({post.votes})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVotePost('down')}
                      className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 text-xs font-bold cursor-pointer transition-all ${
                        post.userVote === 'down'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-white/80'
                      }`}
                      title="لم يعجبني"
                    >
                      <ThumbsDown className={`w-4 h-4 ${post.userVote === 'down' ? 'fill-white' : ''}`} />
                      <span className="hidden sm:inline">لم يعجبني</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
                  <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{post.answersCount} إجابات مسجلة</span>
                </div>
              </div>
            </div>
          </article>

          {/* Answers List Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>الإجابات والحلول الرياضية ({post.answers?.length || 0})</span>
              </h3>
              <span className="text-xs text-slate-400">مرتبة حسب تصويت الطلاب</span>
            </div>

            {post.answers && post.answers.length > 0 ? (
              post.answers
                .sort((a, b) => {
                  if (a.isBestAnswer && !b.isBestAnswer) return -1;
                  if (!a.isBestAnswer && b.isBestAnswer) return 1;
                  return b.votes - a.votes;
                })
                .map((answer) => (
                  <div
                    key={answer.id}
                    className={`rounded-3xl border transition-all overflow-hidden ${
                      answer.isBestAnswer
                        ? 'bg-emerald-50/20 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 ring-2 ring-emerald-500/10 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-700 shadow-xs'
                    }`}
                  >
                    {/* Best Answer Banner if marked */}
                    {answer.isBestAnswer && (
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 text-white flex items-center justify-between text-xs font-bold">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>الإجابة النموذجية المعتمدة (Best Answer)</span>
                        </span>
                        <span className="text-emerald-100 text-[11px]">
                          نالت أعلى درجات الدقة والوضوح
                        </span>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Answer Author Header */}
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => setViewingUserId(answer.author?.id)}
                          className="flex items-center gap-2.5 cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                            {answer.author?.name ? answer.author.name.charAt(0) : 'ط'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600">
                                {answer.author?.name}
                              </span>
                              {answer.author?.badges && answer.author.badges.length > 0 && (
                                <BadgeDisplay badge={answer.author.badges[0]} size="xs" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400">
                              {answer.author?.stream} • {answer.createdAt}
                            </p>
                          </div>
                        </div>

                        {/* Best Answer Toggle Button (For Author or Verifiers) */}
                        {isPostAuthor && (
                          <button
                            type="button"
                            onClick={() => handleMarkBestAnswer(answer.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                              answer.isBestAnswer
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300'
                            }`}
                            title="تحديد أو إلغاء تحديد كأفضل إجابة"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>
                              {answer.isBestAnswer ? 'الإجابة المعتمدة' : 'اعتماد كأفضل إجابة'}
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Answer Content */}
                      <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100 pr-2">
                        <MathContentRenderer content={answer.content} />
                      </div>

                      {/* Like / Dislike Controls & Reply Trigger */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center bg-slate-100/90 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 gap-1">
                            <button
                              type="button"
                              onClick={() => handleVoteAnswer(answer.id, 'up')}
                              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-all ${
                                answer.userVote === 'up'
                                  ? 'text-blue-600 dark:text-blue-400 font-bold bg-white dark:bg-slate-900 shadow-xs'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-white/60'
                              }`}
                              title="أعجبني (+10 نقاط سمعة للكاتب)"
                            >
                              <ThumbsUp className={`w-3.5 h-3.5 ${answer.userVote === 'up' ? 'fill-blue-600' : ''}`} />
                              <span>إعجاب ({answer.votes})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleVoteAnswer(answer.id, 'down')}
                              className={`p-1 rounded-lg cursor-pointer transition-all ${
                                answer.userVote === 'down'
                                  ? 'text-rose-600 dark:text-rose-400 font-bold bg-white dark:bg-slate-900 shadow-xs'
                                  : 'text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-white/60'
                              }`}
                              title="لم يعجبني"
                            >
                              <ThumbsDown className={`w-3.5 h-3.5 ${answer.userVote === 'down' ? 'fill-rose-600' : ''}`} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setReplyingToAnswerId(
                                replyingToAnswerId === answer.id ? null : answer.id
                              )
                            }
                            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors px-2.5 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer flex items-center gap-1"
                          >
                            <CornerDownLeft className="w-3.5 h-3.5" />
                            <span>رد أو تعليق فرعي</span>
                          </button>
                        </div>
                      </div>

                      {/* Nested Replies Section */}
                      {answer.replies && answer.replies.length > 0 && (
                        <div className="mr-4 sm:mr-6 pr-3 border-r-2 border-slate-200 dark:border-slate-700 space-y-3 pt-2">
                          {answer.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-1.5 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  onClick={() => setViewingUserId(reply.author?.id)}
                                  className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer hover:underline"
                                >
                                  {reply.author?.name}
                                </span>
                                <span className="text-slate-400 text-[10px]">
                                  {reply.createdAt}
                                </span>
                              </div>
                              <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                <MathContentRenderer content={reply.content} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input Box (When expanded) */}
                      {replyingToAnswerId === answer.id && (
                        <div className="mr-4 sm:mr-6 pr-3 border-r-2 border-indigo-300 dark:border-indigo-700 pt-2 space-y-2">
                          <input
                            type="text"
                            placeholder="اكتب تعقيباً أو استفساراً حول هذه الإجابة..."
                            value={replyContentMap[answer.id] || ''}
                            onChange={(e) =>
                              setReplyContentMap({
                                ...replyContentMap,
                                [answer.id]: e.target.value
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSendReply(answer.id);
                              }
                            }}
                            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setReplyingToAnswerId(null)}
                              className="px-3 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 cursor-pointer"
                            >
                              إلغاء
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSendReply(answer.id)}
                              className="px-3.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                            >
                              إرسال الرد
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">لا توجد إجابات بعد على هذا السؤال</p>
                <p className="text-xs text-slate-400">
                  كن أول من يقدم حلاً مفصلاً واكسب نقاط سمعة مع وسام الطالب المتعاون!
                </p>
              </div>
            )}
          </div>

          {/* Write an Answer Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-700 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
                <span>إضافة إجابة أو برهان رياضي</span>
              </h3>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                تكسب +10 نقاط عند الإعجاب بإجابتك
              </span>
            </div>

            {answerError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                <span>{answerError}</span>
              </div>
            )}

            {/* LaTeX Toolbar */}
            <div className="flex flex-wrap gap-1 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 self-center ml-2 font-bold">
                إدراج رياضي:
              </span>
              {MATH_SHORTCUTS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInsertLatexToAnswer(item.latex)}
                  className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmitAnswer} className="space-y-3">
              <textarea
                required
                rows={5}
                placeholder="اكتب حلك المفصل هنا خطوة بخطوة مع التبريرات الرياضية... يمكنك استعمال $صيغة$ أو $$صيغة$$..."
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-sans leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-slate-400">
                  يرجى التأكد من صحة الحسابات ومراعاة شبكة التنقيط الرسمية للبكالوريا.
                </p>

                <button
                  type="submit"
                  disabled={isSubmittingAnswer}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  {isSubmittingAnswer ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>نشر الإجابة</span>
                      <Send className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar: Author Card, Badges & Related Discussions */}
        <div className="space-y-5">
          {/* Post Author Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-700 shadow-xs p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              صاحب السؤال
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/20">
                {post.author?.name ? post.author.name.charAt(0) : 'ط'}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{post.author?.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{post.author?.stream}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{post.author?.reputation} نقطة سمعة</span>
                </span>
              </div>
            </div>

            {post.author?.bio && (
              <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700 leading-relaxed">
                {post.author.bio}
              </p>
            )}

            {post.author?.badges && post.author.badges.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">الأوسمة المكتسبة:</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.author.badges.map((b) => (
                    <BadgeDisplay key={b} badge={b} size="xs" />
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setViewingUserId(post.author?.id)}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              عرض الملف الشخصي الكامل
            </button>
          </div>

          {/* Related Discussions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-700 shadow-xs p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
              <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>مناقشات ذات صلة</span>
            </h3>

            {relatedPosts.length > 0 ? (
              <div className="space-y-2.5">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/community/post/${rel.id}`}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      <MathContentRenderer content={rel.title} inline />
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>{rel.votes} إعجاب</span>
                      <span>•</span>
                      <span>{rel.answersCount} إجابات</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-2">لا توجد مناقشات أخرى في هذا المحور حالياً.</p>
            )}
          </div>
        </div>
      </div>

      {/* Student Profile Modal */}
      <StudentProfileModal
        userId={viewingUserId}
        onClose={() => setViewingUserId(null)}
      />
    </div>
  );
};
