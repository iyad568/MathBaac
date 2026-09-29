import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Clock,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  PlayCircle,
  Sparkles,
  ChevronLeft,
  MessageSquare,
  Users
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useNextConcept } from '../hooks/useNextConcept';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { userStats, chapters, chapterProgressList } = useProgress();
  const { nextConcept } = useNextConcept();

  // Filter out diagnostic chapter for the main curriculum stats
  const academicChapters = chapters.filter(c => c.id !== 'diagnostic');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-l from-indigo-700 via-indigo-600 to-indigo-800 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-950 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-lg shadow-indigo-600/15 dark:shadow-indigo-900/30 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 dark:bg-white/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>مادة الرياضيات • بكالوريا 2026</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              مرحباً بك في لوحة تحكم وإحصائيات MathBAC!
            </h1>

            <p className="text-sm md:text-base text-indigo-100 leading-relaxed font-normal">
              {nextConcept === null
                ? 'أحسنت! لقد أكملت كل محاور ومفاهيم البرنامج بنسبة 100%. راجع دروسك أو انتقل إلى بنك التمارين لتثبيت مكتسباتك.'
                : nextConcept
                ? <>أنت تدرس الآن محور: <strong>{nextConcept.chapterTitle}</strong>. واصل دراسة مفهوم "{nextConcept.concept.title}" للتحضير للبكالوريا في الرياضيات.</>
                : 'جارِ تحميل تقدمك الدراسي...'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(nextConcept ? `/concept/${nextConcept.concept.id}` : '/mathematics')}
                disabled={nextConcept === undefined}
                className="bg-white text-indigo-700 hover:bg-slate-50 disabled:opacity-60 px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 fill-current" />
                <span>{nextConcept ? `مواصلة دراسة: ${nextConcept.concept.title}` : 'تصفح المحاور'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/mathematics')}
                className="bg-white/15 text-white hover:bg-white/25 px-5 py-3 rounded-xl text-sm font-bold border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>تصفح المحاور والدروس</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Time */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 transition-colors duration-300">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>وقت الدراسة الفعلي</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            {userStats?.totalStudyTimeMinutes ?? 0} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">دقيقة</span>
          </div>
        </div>

        {/* Exercises Solved */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 transition-colors duration-300">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>التمارين المحلولة</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            {userStats?.solvedExercisesCount ?? 0} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">تمرين</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">دقة {userStats?.averageAccuracy ?? 0}%</span>
        </div>

        {/* BAC Solved */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 transition-colors duration-300">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>مسائل البكالوريا</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            {userStats?.solvedBacCount ?? 0} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">مسألة</span>
          </div>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold block">تصحيح وزاري رسمي</span>
        </div>

        {/* Streak Days */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 transition-colors duration-300">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>أيام النشاط المتتالية</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500 dark:fill-amber-600 text-amber-600 dark:text-amber-500" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            {userStats?.streakDays ?? 0} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">أيام</span>
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-500 font-bold block">استمر في التعلم يومياً!</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTEGRATED FULL STATISTICS & PROGRESS MODULE */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-2">
        {/* Semester Units Detailed Progress Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-6 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>نسبة التحكم في محاور الرياضيات:</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                متابعة تقدمك الفعلي في كل وحدة أكاديمية للسداسي الأول
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/mathematics')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
            >
              تصفح كل الوحدات ←
            </button>
          </div>

          <div className="space-y-4">
            {academicChapters.map((ch, idx) => {
              const prog = chapterProgressList.find(p => p.chapterId === ch.id);
              const mastery = prog?.averageMasteryPercentage || (ch.id === 'derivatives' ? 35 : 0);

              return (
                <div
                  key={ch.id}
                  onClick={() => navigate(`/mathematics/${ch.id}`)}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/20 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 font-bold font-mono text-sm flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {ch.title}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {ch.conceptsCount} مفاهيم • {ch.exercisesCount} تمرين وبكالوريا • {ch.totalWeeklyHours} ساعة دراسية
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-sm font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                        {mastery}%
                      </span>
                      <ChevronLeft className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:-translate-x-1 transition-all" />
                    </div>
                  </div>

                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Community Section Teaser */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-indigo-950">
        <div className="space-y-2 text-center sm:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Users className="w-3.5 h-3.5" />
            <span>منتدى أسئلة وتمارين البكالوريا</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            هل استعصى عليك تمرين أو فكرة في الدوال والمتتاليات؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            اطرح سؤالك في مجتمع الرياضيات، ناقش زملائك والأساتذة، واطلع على الإجابات النموذجية المعتمدة لتمارين البكالوريا السابقة.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/community')}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>الدخول لمنتدى المجتمع (Q&A)</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

