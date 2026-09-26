import React, { useMemo, useState, useEffect } from 'react';
import { Timer, CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { MiniTest, TestResult, TestAnswerInput, TestGradedAnswer } from '../../types';
import { MathRenderer } from '../common/MathRenderer';

interface MiniTestSectionProps {
  miniTest: MiniTest;
  existingResult?: TestResult;
  onSubmitTest: (testId: string, answers: TestAnswerInput[], timeSpentSeconds: number) => Promise<TestResult | undefined>;
}

export const MiniTestSection: React.FC<MiniTestSectionProps> = ({
  miniTest,
  existingResult,
  onSubmitTest,
}) => {
  const [hasStarted, setHasStarted] = useState<boolean>(!!existingResult);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (existingResult) {
      const map: Record<string, string> = {};
      existingResult.answers.forEach(a => {
        map[a.questionId] = a.selectedOptionId;
      });
      return map;
    }
    return {};
  });
  const [timeLeft, setTimeLeft] = useState<number>(miniTest.timeLimitMinutes * 60);
  const [submitting, setSubmitting] = useState(false);
  const [latestResult, setLatestResult] = useState<TestResult | undefined>(existingResult);
  const [startTime] = useState<number>(Date.now());

  const submitted = !!latestResult;

  // Correct answers only exist once the backend has graded a result — the
  // question list itself never carries the answer key.
  const gradedByQuestionId = useMemo(() => {
    const map: Record<string, TestGradedAnswer> = {};
    latestResult?.answers.forEach(a => {
      map[a.questionId] = a;
    });
    return map;
  }, [latestResult]);

  const handleFinishTest = React.useCallback(async () => {
    if (submitting || submitted) return;
    setSubmitting(true);
    try {
      const answers: TestAnswerInput[] = miniTest.questions.map(q => ({
        questionId: q.id,
        selectedOptionId: selectedOptions[q.id] || null,
      }));
      const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
      const result = await onSubmitTest(miniTest.id, answers, timeSpentSeconds);
      if (result) setLatestResult(result);
    } finally {
      setSubmitting(false);
    }
  }, [submitting, submitted, miniTest.questions, miniTest.id, selectedOptions, startTime, onSubmitTest]);

  // Countdown timer when active
  useEffect(() => {
    if (!hasStarted || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, submitted, handleFinishTest]);

  const currentQ = miniTest.questions[currentIdx];
  const currentGraded = gradedByQuestionId[currentQ.id];
  const totalQuestions = miniTest.questions.length;

  const handleSelect = (questionId: string, optionId: string) => {
    if (submitted) return;
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleRetake = () => {
    setSelectedOptions({});
    setLatestResult(undefined);
    setTimeLeft(miniTest.timeLimitMinutes * 60);
    setHasStarted(true);
    setCurrentIdx(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <section id="mini-test-section" className="space-y-6 scroll-mt-6 md:scroll-mt-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Timer className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
              الاختبار القصير الشامل (Mini Test)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {totalQuestions} أسئلة موقوتة لتقييم تمكنك الشامل وتشخيص نقاط الضعف
            </p>
          </div>
        </div>

        {hasStarted && !submitted && (
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm font-bold border ${
              timeLeft < 180 ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 animate-pulse' : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
            <button
              onClick={handleFinishTest}
              disabled={submitting}
              className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-xs cursor-pointer"
            >
              {submitting ? 'جارِ التصحيح...' : 'إنهاء وتصحيح (+15%)'}
            </button>
          </div>
        )}
      </div>

      {!hasStarted ? (
        /* Test Start Invitation Card */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-900/50 shadow-2xs">
            <Timer className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {miniTest.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              يحتوي الاختبار على {totalQuestions} أسئلة تغطي كافة الحالات الرياضية، مع مؤقت لمدة {miniTest.timeLimitMinutes} دقيقة.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-xs font-bold text-slate-900 dark:text-slate-100">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-indigo-600 dark:text-indigo-400 text-base font-mono font-bold">{totalQuestions}</span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">أسئلة شاملة</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-indigo-600 dark:text-indigo-400 text-base font-mono font-bold">{formatTimer(miniTest.timeLimitMinutes * 60)}</span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">دقيقة مؤقت</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-emerald-600 dark:text-emerald-400 text-base font-mono font-bold">+15%</span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">وزن التقدم</span>
            </div>
          </div>

          <button
            onClick={() => setHasStarted(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>ابدأ الاختبار الآن</span>
          </button>
        </div>
      ) : (
        /* Active Test or Completed Results */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-6 shadow-sm">
          {/* Question Palette */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {miniTest.questions.map((q, idx) => {
              const graded = gradedByQuestionId[q.id];
              const isAnswered = !!selectedOptions[q.id];
              const isCorrect = submitted && !!graded?.isCorrect;
              const isWrong = submitted && !!selectedOptions[q.id] && graded && !graded.isCorrect;
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

          {/* Current Question View */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                السؤال {currentQ.questionNumber} من {totalQuestions} • {currentQ.conceptName}
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
                const isSelected = selectedOptions[currentQ.id] === opt.id;
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
                    onClick={() => handleSelect(currentQ.id, opt.id)}
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
                        <CheckCircle2 className="w-4 h-4" /> الصحيح
                      </span>
                    )}

                    {submitted && isSelected && !isCorrectOption && (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300">
                        <XCircle className="w-4 h-4" /> خاطئ
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation when submitted */}
            {submitted && currentGraded?.explanation && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 space-y-1 text-xs md:text-sm text-slate-900 dark:text-slate-100">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block">التعليل الرياضي:</span>
                <p>{currentGraded.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              onClick={() => setCurrentIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
              disabled={currentIdx === totalQuestions - 1}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs md:text-sm disabled:opacity-40 flex items-center gap-2 cursor-pointer"
            >
              <span>التالي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Detailed Diagnostics Breakdown (when submitted) */}
          {submitted && latestResult && (
            <div className="mt-8 pt-6 border-t-2 border-indigo-100 dark:border-indigo-900/50 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/60">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
                      نتيجة الاختبار: {latestResult.score} من {latestResult.totalQuestions} ({Math.round((latestResult.score / latestResult.totalQuestions) * 100)}%)
                    </h4>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      استغرقت: {Math.floor(latestResult.timeSpentSeconds / 60)} دقيقة و {latestResult.timeSpentSeconds % 60} ثانية
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleRetake}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة المحاولة لتحسين العلامة</span>
                </button>
              </div>

              {/* Concept Diagnostic Breakdown Bars */}
              {latestResult.conceptBreakdown && latestResult.conceptBreakdown.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    تشخيص تمكنك حسب المفاهيم الفرعية (Diagnostic des Compétences):
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {latestResult.conceptBreakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
                      >
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-900 dark:text-slate-100">{item.conceptName}</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-mono">{item.percentage}% ({item.correctCount}/{item.totalCount})</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.percentage >= 80 ? 'bg-emerald-600' : item.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
