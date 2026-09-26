import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useConcept } from '../hooks/useConcept';
import { ConceptHeader } from '../components/learning/ConceptHeader';
import { ObjectivesSection } from '../components/learning/ObjectivesSection';
import { TheorySection } from '../components/learning/TheorySection';
import { WorkedExamplesSection } from '../components/learning/WorkedExamplesSection';
import { QuizSection } from '../components/learning/QuizSection';
import { ExerciseSection } from '../components/learning/ExerciseSection';
import { BACSection } from '../components/learning/BACSection';
import { MiniTestSection } from '../components/learning/MiniTestSection';
import { CompletionSection } from '../components/learning/CompletionSection';
import { chapters } from '../data/chapters';
import { Loader2, ArrowRight, GraduationCap, BookOpen, Layers, HelpCircle, FileText, Timer } from 'lucide-react';

export const ConceptPage: React.FC = () => {
  const { conceptId = 'chain-rule' } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const requestedBacId = searchParams.get('bacId') || undefined;
  const sectionParam = searchParams.get('section');

  const {
    concept,
    lesson,
    quizQuestions,
    quizResult,
    exercises,
    exerciseAttempts,
    bacExercises,
    bacAttempts,
    miniTest,
    testResults,
    progress,
    loading,
    markLessonComplete,
    submitQuiz,
    submitExercise,
    submitBAC,
    submitTest,
  } = useConcept(conceptId);

  // Auto-scroll to requested section (e.g. BAC exercises) on navigation
  useEffect(() => {
    if (loading) return;

    const isBac =
      sectionParam === 'bac' ||
      !!requestedBacId ||
      location.hash === '#bac-section' ||
      location.hash === '#bac';

    const isExercises =
      sectionParam === 'exercises' ||
      !!searchParams.get('exerciseId') ||
      location.hash === '#exercises-section' ||
      location.hash === '#exercises';

    const isMiniTest =
      sectionParam === 'test' ||
      location.hash === '#mini-test-section' ||
      location.hash === '#test';

    const isQuiz =
      sectionParam === 'quiz' ||
      location.hash === '#quiz-section' ||
      location.hash === '#quiz';

    const targetId = isBac
      ? 'bac-section'
      : isExercises
      ? 'exercises-section'
      : isMiniTest
      ? 'mini-test-section'
      : isQuiz
      ? 'quiz-section'
      : location.hash
      ? location.hash.replace('#', '')
      : null;

    if (targetId) {
      // Delay to let React render subcomponents, KaTeX equations, and layout dimensions
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);

      return () => clearTimeout(timer);
    }
  }, [loading, location.hash, sectionParam, requestedBacId, searchParams]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-indigo-600 dark:text-indigo-400">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">جاري تحميل الدرس والمحتوى التعليمي...</span>
      </div>
    );
  }

  if (!concept || !lesson) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">لم يتم العثور على هذا المفهوم</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">يرجى العودة إلى قائمة المحاور لاختيار مفهوم متاح.</p>
        <button
          onClick={() => navigate('/mathematics')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
        >
          العودة لقائمة المحاور
        </button>
      </div>
    );
  }

  const currentChapter = chapters.find(c => c.id === concept.chapterId);
  const latestTestResult = testResults[testResults.length - 1];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-fadeIn">
      {/* Back button & quick title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/mathematics/${concept.chapterId}`)}
          className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى محور: {currentChapter?.title || 'الاشتقاقية وتطبيقاتها'}</span>
        </button>

        <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">
          MathBAC • تجربة التعلم الشاملة
        </span>
      </div>

      {/* 1. Header with Metadata and Real Progress */}
      <ConceptHeader
        concept={concept}
        progress={progress}
        chapterTitle={currentChapter?.title}
      />

      {/* Quick Jump Bar for Seamless In-Course Navigation */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-2.5 md:p-3 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 pl-1 shrink-0">
          انتقال سريع:
        </span>

        <button
          type="button"
          onClick={() => scrollToSection('theory-section')}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>النظرية والقوانين</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('examples-section')}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>أمثلة محلولة</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('quiz-section')}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>كويز الفهم</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('exercises-section')}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>تمارين تدريبية</span>
        </button>

        {/* Highlighted BAC Exercises jump button - only when available */}
        {bacExercises.length > 0 && (
          <button
            type="button"
            onClick={() => scrollToSection('bac-section')}
            className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span>مسائل البكالوريا (BAC)</span>
          </button>
        )}

        {miniTest && (
          <button
            type="button"
            onClick={() => scrollToSection('mini-test-section')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Timer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>الاختبار المصغر</span>
          </button>
        )}
      </div>

      {/* 2. Learning Objectives */}
      <ObjectivesSection objectives={lesson.objectives} />

      {/* 3. Theory, Formulas & BAC Tips */}
      <TheorySection
        theory={lesson.theory}
        isCompleted={progress?.lessonCompleted}
        onMarkComplete={markLessonComplete}
      />

      {/* 4. Step-by-Step Worked Examples */}
      <WorkedExamplesSection examples={lesson.workedExamples} />

      {/* 5. Interactive Quick Quiz */}
      <QuizSection
        questions={quizQuestions}
        existingResult={quizResult}
        onSubmitQuiz={submitQuiz}
      />

      {/* 6. Practice Exercises */}
      <ExerciseSection
        exercises={exercises}
        attempts={exerciseAttempts}
        onSubmitExercise={submitExercise}
      />

      {/* 7. Official BAC Practice Exercises */}
      {bacExercises.length > 0 ? (
        <BACSection
          bacExercises={bacExercises}
          bacAttempts={bacAttempts}
          onSubmitBAC={submitBAC}
          initialActiveBACId={requestedBacId}
        />
      ) : concept.chapterId === 'diagnostic' ? (
        <div id="bac-section" className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 rounded-3xl p-6 md:p-8 text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
              محور مخصص للتقويم التشخيصي والمكتسبات القبلية
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              هذا المحور مخصص لتشخيص وتثبيت مكتسبات السنة الثانية ثانوي (كثيرات الحدود، قابلية الاشتقاق الأولية، والمماس) بدون إدراج مسائل بكالوريا، لأن مسائل البكالوريا الرسمية تتطلب دراسة الدالتين الأسية واللوغاريتمية والنهايات المركبة. مسائل البكالوريا متاحة في المحاور اللاحقة.
            </p>
          </div>
        </div>
      ) : null}

      {/* 8. Mini Test with Diagnostic Breakdown */}
      {miniTest && (
        <MiniTestSection
          miniTest={miniTest}
          existingResult={latestTestResult}
          onSubmitTest={submitTest}
        />
      )}

      {/* 9. Results & Course Flow Action Banner */}
      <CompletionSection concept={concept} progress={progress} />
    </div>
  );
};
