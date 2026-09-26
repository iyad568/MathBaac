import React, { useState } from 'react';
import { FileText, Clock, CheckCircle2, XCircle, ChevronDown, ChevronUp, HelpCircle, Sparkles, Send } from 'lucide-react';
import { Exercise, StudentExerciseAttempt } from '../../types';
import { MathRenderer } from '../common/MathRenderer';

interface ExerciseSectionProps {
  exercises: Exercise[];
  attempts: StudentExerciseAttempt[];
  onSubmitExercise: (attempt: StudentExerciseAttempt) => void;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  exercises,
  attempts,
  onSubmitExercise,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [showSolutionMap, setShowSolutionMap] = useState<Record<string, boolean>>({});
  const [feedbackMap, setFeedbackMap] = useState<Record<string, { isCorrect: boolean; message: string }>>({});

  const attemptsMap = React.useMemo(() => {
    const map: Record<string, StudentExerciseAttempt> = {};
    attempts.forEach(a => {
      map[a.exerciseId] = a;
    });
    return map;
  }, [attempts]);

  const filteredExercises = exercises.filter(e => {
    if (selectedDifficulty === 'all') return true;
    return e.difficulty === selectedDifficulty;
  });

  const handleInputChange = (exerciseId: string, val: string) => {
    setInputs(prev => ({
      ...prev,
      [exerciseId]: val,
    }));
  };

  const handleCheckAnswer = (exercise: Exercise) => {
    if (!exercise.correctAnswer) return;
    const userVal = (inputs[exercise.id] || '').trim();
    if (!userVal) return;

    const normalizedUser = userVal.replace(/\s+/g, '').toLowerCase();
    const isCorrect =
      normalizedUser === exercise.correctAnswer.replace(/\s+/g, '').toLowerCase() ||
      (exercise.acceptedAnswers &&
        exercise.acceptedAnswers.some(
          ans => ans.replace(/\s+/g, '').toLowerCase() === normalizedUser
        ));

    const message = isCorrect
      ? 'إجابة صحيحة وممتازة! تم تثبيت النتيجة واحتساب النقاط.'
      : 'إجابة غير دقيقة. تحقق من الخطوات بالأسفل وأعد المحاولة.';

    setFeedbackMap(prev => ({
      ...prev,
      [exercise.id]: { isCorrect: !!isCorrect, message },
    }));

    if (isCorrect) {
      setShowSolutionMap(prev => ({ ...prev, [exercise.id]: true }));
    }

    const attempt: StudentExerciseAttempt = {
      exerciseId: exercise.id,
      conceptId: exercise.conceptId,
      studentAnswer: userVal,
      isCorrect: !!isCorrect,
      attemptNumber: (attemptsMap[exercise.id]?.attemptNumber || 0) + 1,
      timeSpentSeconds: 120,
      completedAt: Date.now(),
    };

    onSubmitExercise(attempt);
  };

  // A simple exercise added via the admin quick-add form has only question + solution
  // text — no answer key to check against, so it's marked done by reading it instead.
  const handleMarkAsRead = (exercise: Exercise) => {
    setShowSolutionMap(prev => ({ ...prev, [exercise.id]: true }));
    onSubmitExercise({
      exerciseId: exercise.id,
      conceptId: exercise.conceptId,
      studentAnswer: '',
      isCorrect: true,
      attemptNumber: (attemptsMap[exercise.id]?.attemptNumber || 0) + 1,
      timeSpentSeconds: 120,
      completedAt: Date.now(),
    });
  };

  const solvedCount = attempts.filter(a => a.isCorrect).length;
  const totalCount = exercises.length;

  const difficultyMeta: Record<string, { label: string; bg: string; text: string }> = {
    easy: { label: 'سهل', bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/60', text: 'text-emerald-700 dark:text-emerald-300' },
    medium: { label: 'متوسط', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/60', text: 'text-amber-700 dark:text-amber-300' },
    hard: { label: 'صعب', bg: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/60', text: 'text-rose-700 dark:text-rose-300' },
  };

  return (
    <section id="exercises-section" className="space-y-6 scroll-mt-6 md:scroll-mt-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
              تمارين تدريبية تطبيقية (Exercices d'entraînement)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              تدرج من السهل إلى مسائل البكالوريا مع تصحيح فوري
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3.5 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            تم حل {solvedCount} من {totalCount} تمارين
          </span>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'جميع التمارين' },
          { id: 'easy', label: 'تمارين أساسية (سهل)' },
          { id: 'medium', label: 'تمارين تطبيقية (متوسط)' },
          { id: 'hard', label: 'تمارين تعمقية (صعب)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedDifficulty(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              selectedDifficulty === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exercises Cards List */}
      <div className="space-y-6">
        {filteredExercises.map((exercise) => {
          const attempt = attemptsMap[exercise.id];
          const isSolved = attempt?.isCorrect;
          const isSolutionOpen = showSolutionMap[exercise.id] ?? false;
          const diff = difficultyMeta[exercise.difficulty] || difficultyMeta.easy;
          const feedback = feedbackMap[exercise.id];
          const isAutoGraded = !!exercise.correctAnswer;

          return (
            <div
              key={exercise.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden shadow-xs ${
                isSolved
                  ? 'border-emerald-300 dark:border-emerald-700 ring-1 ring-emerald-200'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              {/* Exercise Header */}
              <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-center font-mono border border-indigo-100 dark:border-indigo-900/50">
                    #{exercise.number}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {exercise.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${diff.bg} ${diff.text}`}>
                        {diff.label}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exercise.estimatedMinutes} دقائق</span>
                      </span>
                    </div>
                  </div>
                </div>

                {isSolved && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-full self-start sm:self-auto">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>محلول بنجاح</span>
                  </div>
                )}
              </div>

              {/* Exercise Content */}
              <div className="p-5 md:p-6 space-y-4">
                <div className="text-sm md:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                  {exercise.question}
                </div>

                {exercise.questionMath && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center my-3 font-mono">
                    <MathRenderer math={exercise.questionMath} block />
                  </div>
                )}

                {/* Input & Check Solution Area */}
                {isAutoGraded ? (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  {exercise.options && exercise.options.length > 0 && (
                    <div className="space-y-1.5 pb-1">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400">اختر الإجابة الصحيحة:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {exercise.options.map((opt, oIdx) => {
                          const currentVal = inputs[exercise.id] ?? attempt?.studentAnswer ?? '';
                          const isSelected = currentVal === opt;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleInputChange(exercise.id, opt)}
                              className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        dir="ltr"
                        value={inputs[exercise.id] ?? attempt?.studentAnswer ?? ''}
                        onChange={(e) => handleInputChange(exercise.id, e.target.value)}
                        placeholder="اكتب إجابتك هنا (مثال: 192 أو 1/3)"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 outline-none transition-all"
                      />
                    </div>

                    <button
                      onClick={() => handleCheckAnswer(exercise)}
                      disabled={!(inputs[exercise.id] ?? attempt?.studentAnswer)?.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>تحقق من الحل</span>
                    </button>
                  </div>

                  {/* Feedback Message */}
                  {feedback && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                        feedback.isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                          : 'bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60'
                      }`}
                    >
                      {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                      <span>{feedback.message}</span>
                    </div>
                  )}

                  {/* Hint Toggle */}
                  {exercise.hint && !isSolved && (
                    <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 pt-1">
                      <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span><strong>تلميح:</strong> {exercise.hint}</span>
                    </div>
                  )}
                </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      هذا تمرين مقالي بدون تصحيح آلي — اطّلع على الحل ثم علّمه كمقروء.
                    </span>
                    <button
                      onClick={() => handleMarkAsRead(exercise)}
                      disabled={isSolved}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isSolved ? 'تم التعليم كمقروء' : 'تحديد كمقروء'}</span>
                    </button>
                  </div>
                )}

                {/* Solution Toggle Button */}
                <div className="pt-2">
                  <button
                    onClick={() =>
                      setShowSolutionMap(prev => ({
                        ...prev,
                        [exercise.id]: !isSolutionOpen,
                      }))
                    }
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isSolutionOpen ? 'إخفاء خطوات الحل التفصيلية' : 'عرض خطوات الحل النموذجية'}</span>
                    {isSolutionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Detailed Solution Steps */}
                  {isSolutionOpen && (
                    <div className="mt-4 p-5 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        <Sparkles className="w-4 h-4" />
                        <span>الحل المفصل والمنهجي:</span>
                      </div>

                      {exercise.solutionSteps && exercise.solutionSteps.length > 0 ? (
                        <>
                          <div className="space-y-3">
                            {exercise.solutionSteps.map((step) => (
                              <div
                                key={step.step}
                                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2"
                              >
                                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                  الخطوة {step.step}: {step.title}
                                </div>
                                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                                  {step.explanation}
                                </p>
                                {step.math && (
                                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center my-1 font-mono">
                                    <MathRenderer math={step.math} block />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-between">
                            {exercise.correctAnswer && <span>الإجابة النهائية: {exercise.correctAnswer}</span>}
                            {exercise.explanation && <span>{exercise.explanation}</span>}
                          </div>
                        </>
                      ) : (
                        <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
                          {exercise.explanation || 'لا يوجد حل تفصيلي متاح لهذا التمرين.'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
