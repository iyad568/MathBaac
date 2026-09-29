import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, GraduationCap, ChevronLeft, Lock } from 'lucide-react';
import { useChapters } from '../hooks/useChapters';

export const MathematicsPage: React.FC = () => {
  const navigate = useNavigate();
  const { chapters, progressMap } = useChapters();
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Title */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span>منهاج مادة الرياضيات (البرنامج السنوي)</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          محاور دراسية مهيكلة تتبع التدرج البيداغوجي الرسمي لوزارة التربية الوطنية الجزائرية
        </p>
      </div>

      {lockedNotice && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-800 dark:text-amber-300 text-xs md:text-sm font-bold flex items-center gap-2">
          <Lock className="w-4 h-4 shrink-0" />
          <span>{lockedNotice}</span>
        </div>
      )}

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((ch, idx) => {
          const prog = progressMap[ch.id];
          const mastery = prog?.averageMasteryPercentage ?? 0;
          const previousChapter = idx > 0 ? chapters[idx - 1] : undefined;
          const previousMastery = previousChapter ? progressMap[previousChapter.id]?.averageMasteryPercentage ?? 0 : 100;
          const isUnlocked = idx === 0 || previousMastery >= 100;

          const handleOpen = () => {
            if (!isUnlocked) {
              setLockedNotice(`أكمل محور "${previousChapter?.title ?? ''}" بنسبة 100% أولاً لفتح هذا المحور.`);
              return;
            }
            setLockedNotice(null);
            navigate(`/mathematics/${ch.id}`);
          };

          return (
            <div
              key={ch.id}
              onClick={handleOpen}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 md:p-6 space-y-4 transition-all group shadow-xs ${
                isUnlocked
                  ? 'hover:bg-slate-50/70 dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer'
                  : 'border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-xl font-mono font-extrabold text-sm flex items-center justify-center border shrink-0 ${
                    isUnlocked
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                  }`}>
                    {isUnlocked ? `0${ch.order}` : <Lock className="w-4 h-4" />}
                  </span>
                  <h2 className={`text-base md:text-lg font-bold transition-colors ${
                    isUnlocked ? 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {ch.title}
                  </h2>
                </div>

                {/* Chapter Metrics Pills - Single line */}
                <div className="flex items-center gap-2 pt-0.5">
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>{ch.conceptsCount} مفاهيم</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>{ch.exercisesCount} تمرين</span>
                  </div>
                  {ch.bacExercisesCount > 0 ? (
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>{ch.bacExercisesCount} بكالوريا</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-amber-50/60 dark:bg-amber-900/20 px-2.5 py-1 rounded-lg border border-amber-200/70 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 font-medium whitespace-nowrap">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>مكتسبات قبلية</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress and Enter button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">التقدم في المحور</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">{mastery}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${mastery}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  {isUnlocked ? (
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1">
                      <span>فتح محتويات ومفاهيم المحور</span>
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>مقفل حتى إكمال المحور السابق</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
