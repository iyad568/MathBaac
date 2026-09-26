import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

interface ObjectivesSectionProps {
  objectives: string[];
}

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({ objectives }) => {
  return (
    <section className="bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-base md:text-lg">
        <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2>الأهداف التعلمية لهذا المفهوم (Objectifs)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {objectives.map((obj, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 leading-relaxed shadow-2xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span className="font-medium">{obj}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
