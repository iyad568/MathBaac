import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Award, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { ConceptProgress, Concept } from '../../types';

interface CompletionSectionProps {
  concept: Concept;
  progress?: ConceptProgress;
  onRetakeAll?: () => void;
}

export const CompletionSection: React.FC<CompletionSectionProps> = ({
  concept,
  progress,
}) => {
  const navigate = useNavigate();
  const percentage = progress?.overallPercentage ?? 0;
  const isMastered = percentage >= 80;

  useEffect(() => {
    if (isMastered) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // fallback
      }
    }
  }, [isMastered]);

  return (
    <section className="bg-gradient-to-b from-indigo-50/80 to-white dark:from-indigo-900/30 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 rounded-3xl p-6 md:p-10 text-center space-y-6 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-600/30">
        <Award className="w-8 h-8" />
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>إنجاز أكاديمي متميز</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {isMastered ? 'تهانينا! لقد حققت نسبة تمكن ممتازة في هذا المفهوم' : 'ملخص إنجازك في هذا المفهوم'}
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          مفهوم: <strong>{concept.title}</strong> • تم احتساب درجاتك بناءً على إنجازك الفعلي في الدرس، الكويز، التمارين، والبكالوريا.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">النسبة الشاملة</span>
          <div className="text-xl md:text-2xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
            {percentage}%
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            {isMastered ? 'تم الاستيعاب' : 'قيد التطوير'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">التمارين المحلولة</span>
          <div className="text-xl md:text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
            {progress?.exercisesSolvedCount ?? 0} / {progress?.exercisesTotalCount ?? 6}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">دقة: {progress?.exercisesAccuracy ?? 0}%</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">مسائل البكالوريا</span>
          <div className="text-xl md:text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
            {progress?.bacExercisesSolvedCount ?? 0} / {progress?.bacExercisesTotalCount ?? 2}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">رسمية وزارية</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">الاختبار القصير</span>
          <div className="text-xl md:text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
            {progress?.miniTestScore ?? 0} / 10
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">تقييم شامل</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigate('/mathematics/derivatives')}
          className="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <BookOpen className="w-4 h-4" />
          <span>العودة لفهرس المحور (الاشتقاقية)</span>
        </button>

        <button
          onClick={() => navigate('/mathematics/derivatives')}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-sm shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>المتابعة إلى المفاهيم التالية</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
