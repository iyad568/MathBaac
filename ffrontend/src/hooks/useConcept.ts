import { useState, useEffect, useCallback } from 'react';
import {
  Concept,
  Lesson,
  QuizQuestion,
  QuizAnswerInput,
  QuizSubmission,
  Exercise,
  BACExercise,
  MiniTest,
  TestAnswerInput,
  TestResult,
  ConceptProgress,
  StudentExerciseAttempt,
  StudentBACAttempt,
} from '../types';
import { contentService } from '../services/contentService';
import { localStorageService } from '../services/localStorageService';

export function useConcept(conceptId: string) {
  const [concept, setConcept] = useState<Concept | undefined>(undefined);
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<QuizSubmission | undefined>(undefined);
  const [exercisesList, setExercisesList] = useState<Exercise[]>([]);
  const [exerciseAttempts, setExerciseAttempts] = useState<StudentExerciseAttempt[]>([]);
  const [bacList, setBacList] = useState<BACExercise[]>([]);
  const [bacAttempts, setBacAttempts] = useState<StudentBACAttempt[]>([]);
  const [miniTest, setMiniTest] = useState<MiniTest | undefined>(undefined);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [progress, setProgress] = useState<ConceptProgress | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const c = await contentService.getConcept(conceptId);
      setConcept(c);

      const chapterId = c?.chapterId || 'derivatives';

      const [
        l,
        q,
        qr,
        exs,
        exAtts,
        bacs,
        bacAtts,
        mt,
        trs,
        cp,
      ] = await Promise.all([
        contentService.getLesson(conceptId),
        contentService.getQuizQuestions(conceptId),
        contentService.getQuizResult(conceptId),
        contentService.getExercises(conceptId),
        contentService.getExerciseAttempts(),
        contentService.getBACExercises(conceptId),
        contentService.getBACAttempts(),
        contentService.getMiniTest(conceptId),
        contentService.getTestResults(conceptId),
        contentService.getConceptProgress(conceptId, chapterId),
      ]);

      let finalBacs = bacs;
      if (!finalBacs || finalBacs.length === 0) {
        finalBacs = await contentService.getBACExercises(undefined, chapterId);
      }

      setLesson(l);
      setQuizQuestions(q);
      setQuizResult(qr);
      setExercisesList(exs);
      setExerciseAttempts(exAtts.filter(a => a.conceptId === conceptId));
      setBacList(finalBacs);
      setBacAttempts(bacAtts.filter(b => b.conceptId === conceptId || finalBacs.some(fb => fb.id === b.bacExerciseId)));
      setMiniTest(mt);
      setTestResults(trs);
      setProgress(cp);
    } finally {
      setLoading(false);
    }
  }, [conceptId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const markLessonComplete = async () => {
    if (!concept) return;
    const updated = await contentService.markLessonComplete(conceptId, concept.chapterId);
    setProgress(updated);
  };

  const submitQuiz = async (answers: QuizAnswerInput[], timeSpentSeconds: number): Promise<QuizSubmission | undefined> => {
    if (!concept) return undefined;
    const { submission, progress: updated } = await contentService.submitQuiz(
      conceptId,
      concept.chapterId,
      answers,
      timeSpentSeconds
    );
    setQuizResult(submission);
    setProgress(updated);
    return submission;
  };

  const submitExercise = async (attempt: StudentExerciseAttempt) => {
    if (!concept) return;
    const updated = await contentService.submitExerciseAttempt(attempt, concept.chapterId);
    setExerciseAttempts(prev => {
      const filtered = prev.filter(a => a.exerciseId !== attempt.exerciseId);
      return [...filtered, attempt];
    });
    setProgress(updated);
  };

  const submitBAC = async (attempt: StudentBACAttempt) => {
    if (!concept) return;
    const updated = await contentService.submitBACAttempt(attempt, concept.chapterId);
    setBacAttempts(prev => {
      const filtered = prev.filter(b => b.bacExerciseId !== attempt.bacExerciseId);
      return [...filtered, attempt];
    });
    setProgress(updated);
  };

  const submitTest = async (
    testId: string,
    answers: TestAnswerInput[],
    timeSpentSeconds: number
  ): Promise<TestResult | undefined> => {
    if (!concept) return undefined;
    const { result, progress: updated } = await contentService.submitTestResult(
      testId,
      conceptId,
      concept.chapterId,
      answers,
      timeSpentSeconds
    );
    setTestResults(prev => [...prev, result]);
    setProgress(updated);
    return result;
  };

  return {
    concept,
    lesson,
    quizQuestions,
    quizResult,
    exercises: exercisesList,
    exerciseAttempts,
    bacExercises: bacList,
    bacAttempts,
    miniTest,
    testResults,
    progress,
    loading,
    refresh: loadData,
    markLessonComplete,
    submitQuiz,
    submitExercise,
    submitBAC,
    submitTest,
  };
}
