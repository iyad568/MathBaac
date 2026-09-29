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
import { curriculumService } from './curriculumService';
import { progressApiService } from './progressApiService';
import { apiClient, tokenStorage } from './apiClient';

interface ActivityPayload {
  activity_type: 'exercise' | 'bac';
  external_id: string;
  is_correct?: boolean;
  completed: boolean;
  time_spent_seconds?: number;
}

export class ContentService {
  // Best-effort: the local progress is the source of truth for the UI, so a backend failure must not block it.
  private logActivity(payload: ActivityPayload): void {
    if (!tokenStorage.getAccess()) return;
    apiClient.post('/dashboard/activity', payload).catch(() => {});
  }

  // Subjects, chapters, concepts and lessons all come from the backend now —
  // the curriculum content that was imported into MySQL earlier this session.
  public getSubjects(): Promise<Subject[]> {
    return curriculumService.getSubjects();
  }

  // Chapters
  public getChapters(): Promise<Chapter[]> {
    return curriculumService.getChapters();
  }

  public getChapter(chapterId: string): Promise<Chapter | undefined> {
    return curriculumService.getChapter(chapterId);
  }

  // Concepts
  public getConcepts(chapterId?: string): Promise<Concept[]> {
    return curriculumService.getConcepts(chapterId);
  }

  public getConcept(conceptId: string): Promise<Concept | undefined> {
    return curriculumService.getConcept(conceptId);
  }

  // Lessons
  public getLesson(conceptId: string): Promise<Lesson | undefined> {
    return curriculumService.getLesson(conceptId);
  }

  public async markLessonComplete(conceptId: string, chapterId: string): Promise<ConceptProgress> {
    if (tokenStorage.getAccess()) {
      progressApiService.markLessonComplete(conceptId).catch(() => {});
    }
    return progressService.markLessonCompleted(conceptId, chapterId);
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

  // Progress — the backend computes this live from real submitted data (quiz
  // submissions, test results, lesson completions, exercise activity), so it's
  // the source of truth whenever the student is logged in.
  public async getConceptProgress(conceptId: string, chapterId: string): Promise<ConceptProgress> {
    if (tokenStorage.getAccess()) {
      try {
        const progress = await progressApiService.getConceptProgress(conceptId);
        localStorageService.saveConceptProgress(progress);
        return progress;
      } catch {
        // fall through to local
      }
    }
    let cp = localStorageService.getConceptProgress(conceptId);
    if (!cp) {
      cp = progressService.calculateConceptProgress(conceptId, chapterId);
    }
    return cp;
  }

  /** All of a chapter's concepts' progress in one call, instead of one call per concept. */
  public async getConceptsProgressForChapter(chapterId: string): Promise<ConceptProgress[]> {
    if (tokenStorage.getAccess()) {
      try {
        const progressList = await progressApiService.getConceptsProgressForChapter(chapterId);
        progressList.forEach((cp) => localStorageService.saveConceptProgress(cp));
        return progressList;
      } catch {
        // fall through to local
      }
    }
    const concepts = await curriculumService.getConcepts(chapterId);
    return concepts.map((c) => {
      let cp = localStorageService.getConceptProgress(c.id);
      if (!cp) {
        cp = progressService.calculateConceptProgress(c.id, chapterId);
      }
      return cp;
    });
  }

  public async getChapterProgress(chapterId: string): Promise<ChapterProgress> {
    if (tokenStorage.getAccess()) {
      try {
        return await progressApiService.getChapterProgress(chapterId);
      } catch {
        // fall through to local
      }
    }
    return progressService.getChapterProgress(chapterId);
  }

  public async getUserStats(): Promise<UserStudyStats> {
    const local = localStorageService.getUserStats();
    if (!tokenStorage.getAccess()) return local;
    try {
      const server = await progressApiService.getUserStats();
      const merged: UserStudyStats = { ...local, ...server };
      localStorageService.saveUserStats(merged);
      return merged;
    } catch {
      return local;
    }
  }

  /** Resets everything — backend progress when logged in, plus the local cache. Irreversible.
   * localStorageService.resetAllData() clears localStorage wholesale, which would also wipe the
   * auth tokens and silently log the student out — so those are saved and restored around it. */
  public async resetAllProgress(): Promise<void> {
    if (tokenStorage.getAccess()) {
      await progressApiService.resetAllProgress();
    }
    const access = tokenStorage.getAccess();
    const refresh = tokenStorage.getRefresh();
    localStorageService.resetAllData();
    if (access) {
      tokenStorage.set(access, refresh);
    }
  }
}

export const contentService = new ContentService();
