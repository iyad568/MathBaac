/**
 * API Service Layer for Backend Integration
 * Replaces localStorage with cloud-synced backend database
 * Supports offline mode with localStorage fallback
 */

import {
  ConceptProgress,
  StudentExerciseAttempt,
  StudentBACAttempt,
  QuizSubmission,
  TestResult,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
}

class APIService {
  private authToken: string | null = null;

  constructor() {
    // Load token from localStorage on init
    this.authToken = localStorage.getItem('access_token');
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.authToken) {
        headers['Authorization'] = `Bearer ${this.authToken}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          ok: false,
          error: errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // ==================== CONCEPT PROGRESS ====================

  async saveConceptProgress(conceptId: string, progress: ConceptProgress): Promise<ApiResponse> {
    return this.request('/progress/concept', {
      method: 'POST',
      body: JSON.stringify({
        conceptId,
        chapterId: progress.chapterId,
        overallPercentage: progress.overallPercentage,
        lessonPercentage: progress.lessonPercentage || 0,
        quizPercentage: progress.quizPercentage || 0,
        exercisesPercentage: progress.exercisesPercentage || 0,
        bacPercentage: progress.bacPercentage || 0,
        testPercentage: progress.testPercentage || 0,
      }),
    });
  }

  async getAllConceptProgress(): Promise<ApiResponse<ConceptProgress[]>> {
    return this.request('/progress/concepts');
  }

  // ==================== EXERCISE ATTEMPTS ====================

  async saveExerciseAttempt(attempt: StudentExerciseAttempt): Promise<ApiResponse> {
    return this.request('/progress/exercise', {
      method: 'POST',
      body: JSON.stringify({
        exerciseId: attempt.exerciseId,
        conceptId: attempt.conceptId,
        chapterId: attempt.chapterId,
        studentAnswer: attempt.studentAnswer,
        isCorrect: attempt.isCorrect,
        score: attempt.score,
        timeSpentSeconds: attempt.timeSpentSeconds,
      }),
    });
  }

  async getAllExerciseAttempts(): Promise<ApiResponse<StudentExerciseAttempt[]>> {
    return this.request('/progress/exercises');
  }

  // ==================== BAC EXERCISE ATTEMPTS ====================

  async saveBACAttempt(attempt: StudentBACAttempt): Promise<ApiResponse> {
    return this.request('/progress/bac', {
      method: 'POST',
      body: JSON.stringify({
        bacExerciseId: attempt.bacExerciseId,
        conceptId: attempt.conceptId,
        chapterId: attempt.chapterId,
        year: attempt.year,
        stream: attempt.stream,
        session: attempt.session,
        studentAnswer: attempt.studentAnswer,
        isCorrect: attempt.isCorrect,
        score: attempt.score,
        timeSpentSeconds: attempt.timeSpentSeconds,
      }),
    });
  }

  async getAllBACAttempts(): Promise<ApiResponse<StudentBACAttempt[]>> {
    return this.request('/progress/bac');
  }

  // ==================== QUIZ RESULTS ====================

  async saveQuizResult(submission: QuizSubmission): Promise<ApiResponse> {
    return this.request('/progress/quiz', {
      method: 'POST',
      body: JSON.stringify({
        conceptId: submission.conceptId,
        chapterId: submission.chapterId,
        score: submission.score,
        total: submission.total,
        answers: submission.answers,
        timeSpentSeconds: submission.timeSpentSeconds,
      }),
    });
  }

  async getAllQuizResults(): Promise<ApiResponse<QuizSubmission[]>> {
    return this.request('/progress/quizzes');
  }

  // ==================== TEST RESULTS ====================

  async saveTestResult(result: TestResult): Promise<ApiResponse> {
    return this.request('/progress/test', {
      method: 'POST',
      body: JSON.stringify({
        testId: result.testId,
        conceptId: result.conceptId,
        chapterId: result.chapterId,
        score: result.score,
        total: result.total,
        problemScores: result.problemScores,
        timeSpentSeconds: result.timeSpentSeconds,
      }),
    });
  }

  async getAllTestResults(conceptId?: string): Promise<ApiResponse<TestResult[]>> {
    const url = conceptId ? `/progress/tests?concept_id=${conceptId}` : '/progress/tests';
    return this.request(url);
  }

  // ==================== USER PREFERENCES ====================

  async getUserPreferences(): Promise<ApiResponse<any>> {
    return this.request('/progress/preferences');
  }

  async updateUserPreferences(preferences: {
    theme?: string;
    activeStream?: string;
    targetBacScore?: number;
    progressWeights?: Record<string, number>;
    notificationsEnabled?: boolean;
  }): Promise<ApiResponse> {
    return this.request('/progress/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  // ==================== BULK SYNC ====================

  async loadAllProgress(): Promise<ApiResponse<{
    concepts: ConceptProgress[];
    exercises: StudentExerciseAttempt[];
    bacExercises: StudentBACAttempt[];
    quizzes: QuizSubmission[];
    tests: TestResult[];
    preferences: any;
  }>> {
    return this.request('/progress/all');
  }

  async bulkSyncProgress(data: {
    concepts?: any[];
    exercises?: any[];
    bacExercises?: any[];
    quizzes?: any[];
    tests?: any[];
    preferences?: any;
  }): Promise<ApiResponse<{
    syncedConcepts: number;
    syncedExercises: number;
    syncedBac: number;
    syncedQuizzes: number;
    syncedTests: number;
    syncedPreferences: boolean;
    message: string;
  }>> {
    return this.request('/progress/sync', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ==================== HEALTH CHECK ====================

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  // ==================== ONLINE STATUS ====================

  isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Check if user is authenticated and online
   * Used to determine if we should sync to backend
   */
  canSyncToBackend(): boolean {
    return this.isOnline() && !!this.authToken;
  }
}

export const apiService = new APIService();
