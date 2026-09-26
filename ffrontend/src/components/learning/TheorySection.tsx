import React from 'react';
import { BookOpen, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { TheorySection as TheorySectionType } from '../../types';
import { MathRenderer } from '../common/MathRenderer';

interface TheorySectionProps {
  theory: TheorySectionType;
  isCompleted?: boolean;
  onMarkComplete?: () => void;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ theory, isCompleted = false, onMarkComplete }) => {
  return (
    <section id="theory-section" className="space-y-6 scroll-mt-6 md:scroll-mt-10">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
          {theory.title}
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-6 shadow-sm">
        {/* Conceptual Summary */}
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {theory.summary}
        </p>

        {/* Highlighted Main Formula Box (Matches Sleek Interface Definition Card) */}
        <div className="bg-gradient-to-r from-indigo-50/90 via-indigo-50/50 dark:via-indigo-900/30 to-slate-50 dark:from-indigo-900/30 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-6 text-center space-y-3 shadow-xs">
          <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
            المبرهنة الرياضية الأساسية (Théorème Fondamental)
          </div>
          <div className="py-2 text-xl md:text-2xl text-indigo-950 dark:text-slate-100 font-bold">
            <MathRenderer math={theory.formulaTex} block />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto">
            {theory.formulaDescription}
          </p>
        </div>

        {/* Properties and Rules Grid */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>قواعد الاشتقاق الخاصة الأكثر تكراراً في مواضيع البكالوريا:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {theory.properties.map((prop, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 transition-colors space-y-2 flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  {prop.label}
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center font-semibold text-slate-900 dark:text-slate-100">
                  <MathRenderer math={prop.formulaTex} block />
                </div>
                {prop.note && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{prop.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BAC Method Tip Card */}
        {theory.keyTheorem && (
          <div className="bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>{theory.keyTheorem.title}</span>
            </div>
            <p className="text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
              {theory.keyTheorem.statement}
            </p>
            {theory.keyTheorem.mathTex && (
              <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-lg border border-amber-200 dark:border-amber-800/60 text-center">
                <MathRenderer math={theory.keyTheorem.mathTex} block />
              </div>
            )}
          </div>
        )}

        {/* Mark lesson completed button */}
        {onMarkComplete && (
          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={onMarkComplete}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'تم إكمال الدرس النظري' : 'تعليم الدرس كمكتمل (+20%)'}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
