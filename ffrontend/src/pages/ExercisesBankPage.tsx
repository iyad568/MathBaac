import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle2, Search, PlayCircle, Lock } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import { useUnlockedConcepts } from '../hooks/useUnlockedConcepts';
import { useNextConcept } from '../hooks/useNextConcept';
import { MathRenderer } from '../components/common/MathRenderer';

export const ExercisesBankPage: React.FC = () => {
  const navigate = useNavigate();
  const { exercises, attempts, chapters, concepts } = useExercises();
  const { unlockedConceptIds } = useUnlockedConcepts();
  const { nextConcept } = useNextConcept();
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const attemptsMap = React.useMemo(() => {
    const map: Record<string, boolean> = {};
    attempts.forEach(a => {
      if (a.isCorrect) map[a.exerciseId] = true;
    });
    return map;
  }, [attempts]);

  const chapterOrder = React.useMemo(() => {
    const map: Record<string, number> = {};
    chapters.forEach((c, idx) => { map[c.id] = idx; });
    return map;
  }, [chapters]);

  const chapterTitleById = React.useMemo(() => {
    const map: Record<string, string> = {};
    chapters.forEach(c => { map[c.id] = c.title; });
    return map;
  }, [chapters]);

  const conceptOrder = React.useMemo(() => {
    const map: Record<string, number> = {};
    concepts.forEach(c => { map[c.id] = c.order; });
    return map;
  }, [concepts]);

  const filtered = exercises
    .filter(e => {
      if (difficultyFilter !== 'all' && e.difficulty !== difficultyFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return e.title.toLowerCase().includes(q) || e.question.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      // Unlocked exercises come first, then grouped by chapter/concept in curriculum order.
      const unlockedDiff = (unlockedConceptIds.has(b.conceptId) ? 1 : 0) - (unlockedConceptIds.has(a.conceptId) ? 1 : 0);
      if (unlockedDiff !== 0) return unlockedDiff;
      const chapterDiff = (chapterOrder[a.chapterId] ?? 0) - (chapterOrder[b.chapterId] ?? 0);
      if (chapterDiff !== 0) return chapterDiff;
      const conceptDiff = (conceptOrder[a.conceptId] ?? 0) - (conceptOrder[b.conceptId] ?? 0);
      if (conceptDiff !== 0) return conceptDiff;
      return a.number - b.number;
    });

  const diffLabels: Record<string, { label: string; bg: string; text: string }> = {
    easy: { label: 'سهل', bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/60', text: 'text-emerald-700 dark:text-emerald-300' },
    medium: { label: 'متوسط', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/60', text: 'text-amber-700 dark:text-amber-300' },
    hard: { label: 'صعب', bg: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/60', text: 'text-rose-700 dark:text-rose-300' },
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span>بنك ومكتبة التمارين النموذجية</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            تمارين تدريبية مصنفة حسب المفاهيم ودرجات الصعوبة مع حلول تفصيلية
          </p>
        </div>

        <button
          onClick={() => navigate(nextConcept ? `/concept/${nextConcept.concept.id}?section=exercises#exercises-section` : '/mathematics')}
          disabled={nextConcept === undefined}
          className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer self-start md:self-auto"
        >
          <PlayCircle className="w-4 h-4" />
          <span>فتح تمرين المفهوم الحالي</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن تمرين أو خاصية..."
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl pr-10 pl-3 py-2 text-xs md:text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                difficultyFilter === d
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {d === 'all' ? 'الكل' : diffLabels[d]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ex) => {
          const isDone = attemptsMap[ex.id];
          const diff = diffLabels[ex.difficulty] || diffLabels.easy;
          const isUnlocked = unlockedConceptIds.has(ex.conceptId);

          if (!isUnlocked) {
            return (
              <div
                key={ex.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 opacity-60 cursor-not-allowed flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                      #{ex.number}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${diff.bg} ${diff.text}`}>
                      {diff.label}
                    </span>
                  </div>
                  <h2 className="font-bold text-base text-slate-500 dark:text-slate-400">
                    {ex.title}
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    مقفل حتى تفتح درس هذا المفهوم أولاً
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end text-xs">
                  <span className="text-slate-400 dark:text-slate-500 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>مقفل</span>
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={ex.id}
              onClick={() => navigate(`/concept/${ex.conceptId}?section=exercises&exerciseId=${ex.id}#exercises-section`)}
              className="bg-white dark:bg-slate-900 hover:bg-slate-50/70 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-2xl p-5 space-y-4 transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                    #{ex.number} • {chapterTitleById[ex.chapterId] ?? 'محور رياضي'}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${diff.bg} ${diff.text}`}>
                    {diff.label}
                  </span>
                </div>

                <h2 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                  {ex.title}
                </h2>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {ex.question}
                </p>

                {ex.questionMath && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center my-2 font-mono">
                    <MathRenderer math={ex.questionMath} />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{ex.estimatedMinutes} دقائق</span>
                </span>

                {isDone ? (
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>محلول بنجاح</span>
                  </span>
                ) : (
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline">
                    حل التمرين الآن ←
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
