import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Clock, CheckCircle2, ChevronDown, ChevronUp, FileSpreadsheet, Check, Eye } from 'lucide-react';
import { BACExercise, StudentBACAttempt } from '../../types';
import { MathRenderer } from '../common/MathRenderer';

interface BACSectionProps {
  bacExercises: BACExercise[];
  bacAttempts: StudentBACAttempt[];
  onSubmitBAC: (attempt: StudentBACAttempt) => void;
  initialActiveBACId?: string;
}

export const BACSection: React.FC<BACSectionProps> = ({
  bacExercises,
  bacAttempts,
  onSubmitBAC,
  initialActiveBACId,
}) => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (initialActiveBACId && bacExercises.some(b => b.id === initialActiveBACId)) {
      return initialActiveBACId;
    }
    return bacExercises[0]?.id || '';
  });
  const [showMarkSchemeMap, setShowMarkSchemeMap] = useState<Record<string, boolean>>({});
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});
  const [awardedScoreMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (initialActiveBACId && bacExercises.some(b => b.id === initialActiveBACId)) {
      setActiveTab(initialActiveBACId);
    }
  }, [initialActiveBACId, bacExercises]);

  const attemptsMap = React.useMemo(() => {
    const map: Record<string, StudentBACAttempt> = {};
    bacAttempts.forEach(a => {
      map[a.bacExerciseId] = a;
    });
    return map;
  }, [bacAttempts]);

  const currentBAC = bacExercises.find(b => b.id === activeTab) || bacExercises[0];
  if (!currentBAC) return null;

  const currentAttempt = attemptsMap[currentBAC.id];
  const isCompleted = currentAttempt?.completed;
  const isMarkSchemeVisible = showMarkSchemeMap[currentBAC.id] ?? false;

  const handleMarkBACComplete = () => {
    const score = awardedScoreMap[currentBAC.id] ?? (currentAttempt?.score || currentBAC.points);
    const attempt: StudentBACAttempt = {
      bacExerciseId: currentBAC.id,
      conceptId: currentBAC.conceptId,
      completed: true,
      score,
      maxScore: currentBAC.points,
      timeSpentSeconds: 900,
      completedAt: Date.now(),
    };
    onSubmitBAC(attempt);
    setShowMarkSchemeMap(prev => ({ ...prev, [currentBAC.id]: true }));
  };

  return (
    <section id="bac-section" className="space-y-6 scroll-mt-6 md:scroll-mt-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
              مسائل وتمارين البكالوريا الرسمية (Exercices du BAC)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              نماذج مطابقة لمواضيع شهادة البكالوريا الجزائرية مع سلم التنقيط الوزاري
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/60">
            أرشيف البكالوريا: 2014 - 2026 ({bacExercises.length} موضوعاً)
          </span>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
            تم إنجاز {bacAttempts.filter(b => b.completed).length} من {bacExercises.length} مسألة
          </span>
        </div>
      </div>

      {/* Quick Year Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-slate-100/70 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 shrink-0">اختر السنة:</span>
        {bacExercises.map((bac) => {
          const isDone = attemptsMap[bac.id]?.completed;
          const isActive = bac.id === currentBAC.id;

          return (
            <button
              key={`year-pill-${bac.id}`}
              onClick={() => setActiveTab(bac.id)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{bac.year}</span>
              {isDone && <Check className={`w-3 h-3 ${isActive ? 'text-emerald-200' : 'text-emerald-600 dark:text-emerald-400'}`} />}
            </button>
          );
        })}
      </div>

      {/* Detailed BAC Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {bacExercises.map((bac) => {
          const isDone = attemptsMap[bac.id]?.completed;
          const isActive = bac.id === currentBAC.id;

          return (
            <button
              key={bac.id}
              onClick={() => setActiveTab(bac.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>بكالوريا {bac.year} ({bac.stream.replace('شعبة ', '')})</span>
              {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main BAC Problem Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        {/* BAC Metadata Header */}
        <div className="p-5 md:p-6 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md font-mono">
                BAC {currentBAC.year}
              </span>
              <span className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/60">
                {currentBAC.stream}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">الدورة: {currentBAC.session}</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
              {currentBAC.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{currentBAC.estimatedMinutes} دقيقة</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{currentBAC.points} نقاط</span>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800/60 space-y-3">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              نص المسألة الرياضية:
            </span>
            <p className="text-sm md:text-base text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line font-medium">
              {currentBAC.question}
            </p>
            {currentBAC.questionMath && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center my-2 font-mono">
                <MathRenderer math={currentBAC.questionMath} block />
              </div>
            )}
          </div>

          {/* Sub Questions with Points */}
          {currentBAC.subQuestions && currentBAC.subQuestions.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>الأسئلة والأسئلة الفرعية:</span>
            </h4>

            <div className="space-y-3">
              {currentBAC.subQuestions.map((sq) => (
                <div
                  key={sq.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs md:text-sm text-indigo-700 dark:text-indigo-300">
                      {sq.label}
                    </span>
                    <span className="text-xs font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/60">
                      {sq.points} ن
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                    {sq.text}
                  </p>

                  {sq.math && (
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-center my-1 font-mono">
                      <MathRenderer math={sq.math} block />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Student Scratchpad / Working Notes */}
          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              مسودة المحاولة والملاحظات الشخصية (Brouillon):
            </label>
            <textarea
              rows={3}
              value={studentNotes[currentBAC.id] || ''}
              onChange={(e) => setStudentNotes(prev => ({ ...prev, [currentBAC.id]: e.target.value }))}
              placeholder="اكتب خلاصة تحليلك أو خطواتك لحل هذه المسألة قبل الاطلاع على سلم التنقيط..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:border-indigo-600 rounded-xl p-3 text-xs md:text-sm outline-none resize-y"
            />
          </div>

          {/* Self-Assessment & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={() =>
                setShowMarkSchemeMap(prev => ({
                  ...prev,
                  [currentBAC.id]: !isMarkSchemeVisible,
                }))
              }
              className="px-4 py-2.5 rounded-xl border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{isMarkSchemeVisible ? 'إخفاء سلم التنقيط' : 'عرض سلم التنقيط الرسمي الوزاري'}</span>
              {isMarkSchemeVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <button
              onClick={handleMarkBACComplete}
              className={`px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'تم إكمال وتقييم المسألة بنجاح' : 'تأكيد الحل وحساب التقدم (+20%)'}</span>
            </button>
          </div>

          {/* Official Mark Scheme Modal/Accordion */}
          {isMarkSchemeVisible && (
            <div className="p-5 md:p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-indigo-200">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>عناصر الإجابة وسلم التنقيط الرسمي (Barème Officiel):</span>
                </div>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800/60 font-mono">
                  المجموع: {currentBAC.points} / {currentBAC.points} ن
                </span>
              </div>

              {currentBAC.officialSolution ? (
                <>
                  <div className="space-y-3">
                    {currentBAC.officialSolution.steps.map((step, sidx) => (
                      <div
                        key={sidx}
                        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {step.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/50">
                            +{step.points} ن
                          </span>
                        </div>

                        <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                          {step.text}
                        </p>

                        {step.math && (
                          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center my-1 font-mono">
                            <MathRenderer math={step.math} block />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Grading notes */}
                  {currentBAC.officialSolution.gradingNotes && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 space-y-2">
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                        تنبيهات المصححين في شهادة البكالوريا:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-xs text-amber-950 dark:text-amber-100">
                        {currentBAC.officialSolution.gradingNotes.map((note, nidx) => (
                          <li key={nidx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {currentBAC.solutionText || 'لا يوجد سلم تنقيط تفصيلي متاح لهذه المسألة.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
