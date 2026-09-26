import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Concept, ConceptProgress } from '../../types';

interface ConceptHeaderProps {
  concept: Concept;
  progress?: ConceptProgress;
  chapterTitle?: string;
}

export const ConceptHeader: React.FC<ConceptHeaderProps> = ({ concept, progress, chapterTitle }) => {
  const percentage = progress?.overallPercentage ?? 0;
  const isCompleted = percentage >= 80;

  const difficultyMap: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    easy: { label: 'سهل', bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/60', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
    medium: { label: 'متوسط', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/60', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
    hard: { label: 'صعب', bg: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/60', text: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-500' },
  };

  const diff = difficultyMap[concept.difficulty] || difficultyMap.medium;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 relative overflow-hidden">
      {/* Top accent bar showing weighted progress */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-indigo-600 transition-all duration-500 rounded-r-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-3 flex-1">
          {/* Concept Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
              المفهوم 0{concept.order}
            </span>
            {concept.weekDate && (
              <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                الأسبوع {concept.weekNumber}: {concept.weekDate}
              </span>
            )}
            {concept.officialHours && (
              <span className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
                {concept.officialHours} س دراسية
              </span>
            )}
          </div>


          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {concept.title}
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {concept.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {concept.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-indigo-900/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Badges and Progress Widget */}
        <div className="flex flex-wrap md:flex-col items-end gap-3 min-w-[220px]">
          <div className="flex items-center gap-3">
            {/* Estimated time */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{concept.estimatedMinutes} دقيقة</span>
            </div>

            {/* Difficulty Badge */}
            <div className={`flex items-center gap-1.5 ${diff.bg} border px-3.5 py-1.5 rounded-full text-xs font-bold ${diff.text}`}>
              <span className={`w-2 h-2 rounded-full ${diff.dot}`}></span>
              <span>{diff.label}</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 mt-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">نسبة الاستيعاب الحقيقية</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{percentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
              <span>درس + كويز + تمارين + BAC</span>
              {isCompleted ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> مكتمل
                </span>
              ) : (
                <span className="font-medium text-slate-600 dark:text-slate-400">قيد التعلّم</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
