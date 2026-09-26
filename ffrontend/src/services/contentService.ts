import {
  Subject,
  Chapter,
  Concept,
  Lesson,
  Exercise,
  BACExercise,
  QuizQuestion,
  QuizAnswerInput,
  QuizSubmission,
  MiniTest,
  TestAnswerInput,
  TestResult,
  StudentExerciseAttempt,
  StudentBACAttempt,
  ConceptProgress,
  ChapterProgress,
  UserStudyStats,
} from '../types';
import { localStorageService } from './localStorageService';
import { progressService } from './progressService';
import { quizService } from './quizService';
import { exerciseService } from './exerciseService';
import { testService } from './testService';
import { apiClient, tokenStorage } from './apiClient';

interface ActivityPayload {
  activity_type: 'exercise' | 'bac';
  external_id: string;
  is_correct?: boolean;
  completed: boolean;
  time_spent_seconds?: number;
}

interface DashboardResponse {
  current_streak: number;
  last_study_date: string | null;
  total_study_time_minutes: number;
  solved_exercises_count: number;
  solved_bac_count: number;
  average_accuracy: number;
}

export class ContentService {
  // Best-effort: the local progress is the source of truth for the UI, so a backend failure must not block it.
  private logActivity(payload: ActivityPayload): void {
    if (!tokenStorage.getAccess()) return;
    apiClient.post('/dashboard/activity', payload).catch(() => {});
  }

  // Subjects
  public getSubjects(): Promise<Subject[]> {
    return Promise.resolve(localStorageService.getSubjects());
  }

  // Chapters
  public getChapters(): Promise<Chapter[]> {
    return Promise.resolve(localStorageService.getChapters());
  }

  public getChapter(chapterId: string): Promise<Chapter | undefined> {
    return Promise.resolve(localStorageService.getChapterById(chapterId));
  }

  // Concepts
  public getConcepts(chapterId?: string): Promise<Concept[]> {
    return Promise.resolve(localStorageService.getConcepts(chapterId));
  }

  public getConcept(conceptId: string): Promise<Concept | undefined> {
    return Promise.resolve(localStorageService.getConceptById(conceptId));
  }

  // Lessons
  public getLesson(conceptId: string): Promise<Lesson | undefined> {
    return Promise.resolve(localStorageService.getLesson(conceptId));
  }

  public markLessonComplete(conceptId: string, chapterId: string): Promise<ConceptProgress> {
    const res = progressService.markLessonCompleted(conceptId, chapterId);
    return Promise.resolve(res);
  }

  // Quizzes — questions and grading come from the backend; only the derived
  // progress bar stays in local storage, same as the rest of this file.
  public getQuizQuestions(conceptId: string): Promise<QuizQuestion[]> {
    return quizService.getQuestions(conceptId);
  }

  public async submitQuiz(
    conceptId: string,
    chapterId: string,
    answers: QuizAnswerInput[],
    timeSpentSeconds: number
  ): Promise<{ submission: QuizSubmission; progress: ConceptProgress }> {
    const submission = await quizService.submitQuiz(conceptId, answers, timeSpentSeconds);
    localStorageService.saveQuizResult(submission);
    const progress = progressService.calculateConceptProgress(conceptId, chapterId);
    return { submission, progress };
  }

  public async getQuizResult(conceptId: string): Promise<QuizSubmission | undefined> {
    if (!tokenStorage.getAccess()) return localStorageService.getQuizResult(conceptId);
    try {
      const submission = await quizService.getLatestSubmission(conceptId);
      if (submission) localStorageService.saveQuizResult(submission);
      return submission;
    } catch {
      return localStorageService.getQuizResult(conceptId);
    }
  }

  // Exercises
  public getExercises(conceptId?: string, chapterId?: string): Promise<Exercise[]> {
    return exerciseService.getExercises(conceptId, chapterId);
  }

  public submitExerciseAttempt(attempt: StudentExerciseAttempt, chapterId: string): Promise<ConceptProgress> {
    localStorageService.saveExerciseAttempt(attempt);
    this.logActivity({
      activity_type: 'exercise',
      external_id: attempt.exerciseId,
      is_correct: attempt.isCorrect,
      completed: true,
      time_spent_seconds: attempt.timeSpentSeconds,
    });
    const progress = progressService.calculateConceptProgress(attempt.conceptId, chapterId);
    return Promise.resolve(progress);
  }

  public getExerciseAttempts(): Promise<StudentExerciseAttempt[]> {
    return Promise.resolve(localStorageService.getExerciseAttempts());
  }

  // BAC Exercises
  public getBACExercises(conceptId?: string, chapterId?: string): Promise<BACExercise[]> {
    return exerciseService.getBACExercises(conceptId, chapterId);
  }

  public submitBACAttempt(attempt: StudentBACAttempt, chapterId: string): Promise<ConceptProgress> {
    localStorageService.saveBACAttempt(attempt);
    this.logActivity({
      activity_type: 'bac',
      external_id: attempt.bacExerciseId,
      completed: attempt.completed,
      time_spent_seconds: attempt.timeSpentSeconds,
    });
    const progress = progressService.calculateConceptProgress(attempt.conceptId, chapterId);
    return Promise.resolve(progress);
  }

  public getBACAttempts(): Promise<StudentBACAttempt[]> {
    return Promise.resolve(localStorageService.getBACAttempts());
  }

  // Tests — questions and grading come from the backend; only the derived
  // progress bar and a local result cache stay in local storage.
  public getMiniTest(conceptId: string): Promise<MiniTest | undefined> {
    return testService.getTestByConcept(conceptId);
  }

  public async submitTestResult(
    testId: string,
    conceptId: string,
    chapterId: string,
    answers: TestAnswerInput[],
    timeSpentSeconds: number
  ): Promise<{ result: TestResult; progress: ConceptProgress }> {
    const result = await testService.submitResult(testId, conceptId, answers, timeSpentSeconds);
    localStorageService.saveTestResult(result);
    const progress = progressService.calculateConceptProgress(conceptId, chapterId);
    return { result, progress };
  }

  public async getTestResults(conceptId?: string): Promise<TestResult[]> {
    if (!tokenStorage.getAccess()) return localStorageService.getTestResults(conceptId);
    try {
      const results = await testService.getResults(conceptId);
      results.forEach(r => localStorageService.saveTestResult(r));
      return results;
    } catch {
      return localStorageService.getTestResults(conceptId);
    }
  }

  // Progress
  public getConceptProgress(conceptId: string, chapterId: string): Promise<ConceptProgress> {
    let cp = localStorageService.getConceptProgress(conceptId);
    if (!cp) {
      cp = progressService.calculateConceptProgress(conceptId, chapterId);
    }
    return Promise.resolve(cp);
  }

  public getChapterProgress(chapterId: string): Promise<ChapterProgress> {
    return Promise.resolve(progressService.getChapterProgress(chapterId));
  }

  // Streak, study time and solved counts come from the backend; course progress and lessons stay local
  // because the curriculum is static frontend data.
  public async getUserStats(): Promise<UserStudyStats> {
    const local = localStorageService.getUserStats();
    if (!tokenStorage.getAccess()) return local;
    try {
      const server = await apiClient.get<DashboardResponse>('/dashboard/');
      const merged: UserStudyStats = {
        ...local,
        totalStudyTimeMinutes: server.total_study_time_minutes,
        streakDays: server.current_streak,
        lastStudyDate: server.last_study_date ?? local.lastStudyDate,
        solvedExercisesCount: server.solved_exercises_count,
        solvedBacCount: server.solved_bac_count,
        averageAccuracy: Math.round(server.average_accuracy),
      };
      localStorageService.saveUserStats(merged);
      return merged;
    } catch {
      return local;
    }
  }
}

export const contentService = new ContentService();
