import React, { useMemo, useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { QuizQuestion, QuizSubmission, QuizAnswerInput, QuizGradedAnswer } from '../../types';
import { MathRenderer } from '../common/MathRenderer';

interface QuizSectionProps {
  questions: QuizQuestion[];
  existingResult?: QuizSubmission;
  onSubmitQuiz: (answers: QuizAnswerInput[], timeSpentSeconds: number) => Promise<QuizSubmission | undefined>;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  existingResult,
  onSubmitQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(() => {
    if (existingResult) {
      const map: Record<string, string> = {};
      existingResult.answers.forEach(a => {
        map[a.questionId] = a.selectedOptionId;
      });
      return map;
    }
    return {};
  });
  const [result, setResult] = useState<QuizSubmission | undefined>(existingResult);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [startTime] = useState<number>(Date.now());

  const submitted = !!result;

  // Correct answers only exist once the backend has graded a submission —
  // the question list itself never carries the answer key.
  const gradedByQuestionId = useMemo(() => {
    const map: Record<string, QuizGradedAnswer> = {};
    result?.answers.forEach(a => {
      map[a.questionId] = a;
    });
    return map;
  }, [result]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];
  const currentGraded = gradedByQuestionId[currentQ.id];
  const isLastQuestion = currentIdx === questions.length - 1;
  const totalQuestions = questions.length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const answers: QuizAnswerInput[] = questions.map(q => ({
        questionId: q.id,
        selectedOptionId: selectedAnswers[q.id] || null,
      }));
      const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
      const submission = await onSubmitQuiz(answers, timeSpentSeconds);
      if (submission) setResult(submission);
    } catch {
      setSubmitError('تعذر إرسال الإجابات، حاول مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setResult(undefined);
    setCurrentIdx(0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentScore = result?.score ?? 0;

  return (
    <section id="quiz-section" className="space-y-6 scroll-mt-6 md:scroll-mt-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
              اختبار الفهم السريع (Quiz Rapide)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              5 أسئلة مباشرة للتحقق من استيعابك لقواعد الاشتقاق
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50 font-mono">
              النتيجة: {currentScore} / {totalQuestions} ({Math.round((currentScore / totalQuestions) * 100)}%)
            </span>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
              title="إعادة المحاولة"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة</span>
            </button>
          </div>
        ) : (
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            تمت الإجابة: {answeredCount} من {totalQuestions}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-6 shadow-sm">
        {/* Question Step Indicator Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {questions.map((q, idx) => {
            const graded = gradedByQuestionId[q.id];
            const isAnswered = !!selectedAnswers[q.id];
            const isCorrect = submitted && !!graded?.isCorrect;
            const isWrong = submitted && !!selectedAnswers[q.id] && graded && !graded.isCorrect;
            const isActive = idx === currentIdx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-indigo-600 ring-offset-2 bg-indigo-600 text-white'
                    : isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                    : isWrong
                    ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
                    : isAnswered
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Current Question Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/50">
              السؤال {currentQ.questionNumber} من {totalQuestions}
            </span>
          </div>

          <div className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
            {currentQ.questionText}
          </div>

          {currentQ.questionMath && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center my-3 text-lg md:text-xl font-mono">
              <MathRenderer math={currentQ.questionMath} block />
            </div>
          )}

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              const isCorrectOption = submitted && opt.id === currentGraded?.correctOptionId;

              let optionStyle = 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900';
              if (isSelected && !submitted) {
                optionStyle = 'border-2 border-indigo-600 bg-indigo-50/60 dark:bg-indigo-900/20 shadow-2xs';
              } else if (submitted) {
                if (isCorrectOption) {
                  optionStyle = 'border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300';
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = 'border-2 border-rose-600 bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-700 opacity-60 bg-slate-50 dark:bg-slate-800/60';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? submitted
                            ? isCorrectOption
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-rose-600 bg-rose-600'
                            : 'border-indigo-600 bg-indigo-600'
                          : 'border-slate-400'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white dark:bg-slate-900"></div>}
                    </div>

                    <div className="text-base font-medium">
                      {opt.text && <span className="mr-2">{opt.text}</span>}
                      {opt.mathTex && <MathRenderer math={opt.mathTex} />}
                    </div>
                  </div>

                  {submitted && isCorrectOption && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" /> الإجابة الصحيحة
                    </span>
                  )}

                  {submitted && isSelected && !isCorrectOption && (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300">
                      <XCircle className="w-4 h-4" /> إجابتك غير صحيحة
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box (Visible after submission) */}
          {submitted && currentGraded?.explanation && (
            <div className="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>الشرح والتعليل النموذجي:</span>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                {currentGraded.explanation}
              </p>
              {currentGraded.explanationMath && (
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50 text-center my-1 font-mono">
                  <MathRenderer math={currentGraded.explanationMath} block />
                </div>
              )}
            </div>
          )}

          {submitError && (
            <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{submitError}</p>
          )}
        </div>

        {/* Navigation & Submit footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-2 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          {!submitted ? (
            isLastQuestion || answeredCount === totalQuestions ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount === 0 || submitting}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <span>{submitting ? 'جارِ التصحيح...' : 'تصحيح الاختبار (+15%)'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )
          ) : (
            <button
              onClick={() => {
                if (!isLastQuestion) {
                  setCurrentIdx(prev => prev + 1);
                } else {
                  const exSec = document.getElementById('exercises-section');
                  if (exSec) exSec.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isLastQuestion ? 'الانتقال إلى التمارين التدريبية' : 'السؤال التالي'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
