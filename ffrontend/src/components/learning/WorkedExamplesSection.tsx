import React, { useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Award,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Eye,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { WorkedExample } from '../../types';
import { MathRenderer } from '../common/MathRenderer';

interface WorkedExamplesSectionProps {
  examples: WorkedExample[];
}

export const WorkedExamplesSection: React.FC<WorkedExamplesSectionProps> = ({ examples }) => {
  // Store which examples are expanded (accordion)
  const [openExampleIds, setOpenExampleIds] = useState<Record<string, boolean>>({
    [examples[0]?.id || '']: true,
  });

  // Store the active visible step index for each example (Step-by-Step progression)
  const [activeStepIndices, setActiveStepIndices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    examples.forEach((ex) => {
      // Default to revealing the first step
      initial[ex.id] = 1;
    });
    return initial;
  });

  // Store whether the final answer is explicitly revealed
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const toggleExample = (id: string) => {
    setOpenExampleIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextStep = (exampleId: string, totalSteps: number) => {
    setActiveStepIndices((prev) => {
      const current = prev[exampleId] || 1;
      const next = Math.min(current + 1, totalSteps);
      return { ...prev, [exampleId]: next };
    });
  };

  const handlePrevStep = (exampleId: string) => {
    setActiveStepIndices((prev) => {
      const current = prev[exampleId] || 1;
      const next = Math.max(current - 1, 1);
      return { ...prev, [exampleId]: next };
    });
  };

  const handleRevealAll = (exampleId: string, totalSteps: number) => {
    setActiveStepIndices((prev) => ({
      ...prev,
      [exampleId]: totalSteps,
    }));
    setRevealedAnswers((prev) => ({
      ...prev,
      [exampleId]: true,
    }));
  };

  const handleResetSteps = (exampleId: string) => {
    setActiveStepIndices((prev) => ({
      ...prev,
      [exampleId]: 1,
    }));
    setRevealedAnswers((prev) => ({
      ...prev,
      [exampleId]: false,
    }));
  };

  return (
    <section id="examples-section" className="space-y-6 scroll-mt-6 md:scroll-mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
              أمثلة محلولة نموذجية (Exemples Corrigés)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              حل تفاعلي خطوة بخطوة بالنقر والتدرج البيداغوجي المنهجي
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50 self-start sm:self-auto">
          {examples.length} أمثلة نموذجية تفاعلية
        </span>
      </div>

      <div className="space-y-5">
        {examples.map((example, idx) => {
          const isOpen = openExampleIds[example.id] ?? false;
          const totalSteps = example.steps.length;
          const currentStep = activeStepIndices[example.id] ?? 1;
          const isAllStepsVisible = currentStep >= totalSteps;
          const isAnswerRevealed = revealedAnswers[example.id] || isAllStepsVisible;

          return (
            <div
              key={example.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:border-indigo-200 dark:hover:border-indigo-700 transition-all"
            >
              {/* Header Card */}
              <button
                onClick={() => toggleExample(example.id)}
                className="w-full p-5 md:p-6 text-right flex items-center justify-between gap-4 bg-white dark:bg-slate-900 hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center font-mono shadow-xs shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100">
                      {example.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        {totalSteps} خطوات حل مفصلة
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {isAllStepsVisible ? 'مكتمل العرض' : `الخطوة ${currentStep} من ${totalSteps}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                    {isOpen ? 'إخفاء البطاقة' : 'فتح الحل التفاعلي'}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </button>

              {/* Collapsible Interactive Body */}
              {isOpen && (
                <div className="p-5 md:p-7 pt-0 space-y-6 border-t border-slate-100 dark:border-slate-700">
                  {/* Problem Statement Card */}
                  <div className="bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 md:p-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>نص المسألة الرياضية:</span>
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                        سؤال بكالوريا نموذجي
                      </span>
                    </div>

                    <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                      {example.problemStatement}
                    </p>

                    {example.problemMath && (
                      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center my-2 font-mono shadow-2xs">
                        <MathRenderer math={example.problemMath} block />
                      </div>
                    )}
                  </div>

                  {/* Step Control Header & Progress */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          البرهان والحل المتدرج (Step-by-Step):
                        </span>
                      </div>

                      {/* Controls toolbar */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleResetSteps(example.id)}
                          className="px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          title="إعادة البدء من الخطوة الأولى"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">إعادة البدء</span>
                        </button>

                        {!isAllStepsVisible ? (
                          <button
                            type="button"
                            onClick={() => handleRevealAll(example.id, totalSteps)}
                            className="px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-900/50"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>كشف جميع الخطوات</span>
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {/* Step progress pills */}
                    <div className="grid grid-flow-col auto-cols-fr gap-2 pt-1">
                      {example.steps.map((step) => {
                        const isReached = step.stepNumber <= currentStep;
                        const isCurrent = step.stepNumber === currentStep;

                        return (
                          <button
                            key={step.stepNumber}
                            type="button"
                            onClick={() => {
                              setActiveStepIndices((prev) => ({
                                ...prev,
                                [example.id]: step.stepNumber,
                              }));
                            }}
                            className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border ${
                              isCurrent
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                                : isReached
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span className="block font-mono">الخطوة 0{step.stepNumber}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rendered Visible Steps */}
                  <div className="space-y-4">
                    {example.steps
                      .filter((step) => step.stepNumber <= currentStep)
                      .map((step, stepIdx) => {
                        const isLatestActive = step.stepNumber === currentStep;

                        return (
                          <div
                            key={step.stepNumber}
                            className={`p-5 rounded-2xl border transition-all animate-fadeIn ${
                              isLatestActive
                                ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-700 shadow-sm ring-1 ring-indigo-500/20'
                                : 'bg-slate-50/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shadow-2xs">
                                  {step.stepNumber}
                                </span>
                                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                                  الخطوة {step.stepNumber}:
                                </span>
                              </div>
                              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>مفهوم ومحلل</span>
                              </span>
                            </div>

                            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                              {step.explanation}
                            </p>

                            {step.mathExpression && (
                              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono my-3 shadow-2xs">
                                <MathRenderer math={step.mathExpression} block />
                              </div>
                            )}

                            {step.hint && (
                              <div className="flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/60 mt-2">
                                <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                  <strong>تلميح المنهجية:</strong> {step.hint}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  {/* Next Step / Previous Step Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      disabled={currentStep <= 1}
                      onClick={() => handlePrevStep(example.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        currentStep <= 1
                          ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>الخطوة السابقة</span>
                    </button>

                    {!isAllStepsVisible ? (
                      <button
                        type="button"
                        onClick={() => handleNextStep(example.id, totalSteps)}
                        className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-xs shadow-indigo-600/20 transition-all cursor-pointer"
                      >
                        <span>انتقل للخطوة التالية (0{currentStep + 1})</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>تم استعراض كامل خطوات البرهان بنجاح!</span>
                      </div>
                    )}
                  </div>

                  {/* Final Answer (Displayed when completed or revealed) */}
                  {isAnswerRevealed ? (
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          <span>النتيجة النهائية المصرح بها: {example.finalAnswer}</span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                          الجواب النموذجي
                        </span>
                      </div>

                      {example.finalAnswerMath && (
                        <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-2xs font-mono text-center">
                          <MathRenderer math={example.finalAnswerMath} block />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-600 rounded-2xl text-center space-y-2">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        تتبع الخطوات خطوة بخطوة أو انقر لعرض النتيجة النهائية مباشرة.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRevealAll(example.id, totalSteps)}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline cursor-pointer"
                      >
                        إظهار النتيجة النهائية الآن
                      </button>
                    </div>
                  )}

                  {/* BAC Correction Tip */}
                  {example.bacTip && (
                    <div className="bg-indigo-50/80 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-4 flex items-start gap-3 text-xs md:text-sm text-indigo-950 dark:text-indigo-100">
                      <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-extrabold block text-indigo-900 dark:text-indigo-200">
                          ملاحظة تصحيح البكالوريا الرسمية (Note BAC):
                        </span>
                        <p className="leading-relaxed text-indigo-950/90 dark:text-indigo-100">{example.bacTip}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
