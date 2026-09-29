import {
  Subject,
  Chapter,
  Concept,
  Lesson,
  Exercise,
  BACExercise,
  QuizQuestion,
  QuizSubmission,
  MiniTest,
  TestResult,
  ConceptProgress,
  ChapterProgress,
  UserStudyStats,
  StudentExerciseAttempt,
  StudentBACAttempt,
  DEFAULT_PROGRESS_WEIGHTS,
  AuthUser,
} from '../types';

import { mathSubject } from '../data/mathematics';
import { chapters } from '../data/chapters';
import { concepts } from '../data/concepts';
import { lessons } from '../data/lessons';
import { exercises } from '../data/exercises';
import { bacExercises } from '../data/bacExercises';
import { miniTests } from '../data/tests';
import { quizQuestions } from '../data/quizzes';

const STORAGE_KEYS = {
  SUBJECTS: 'dzbac_subjects_v2',
  CHAPTERS: 'dzbac_chapters_v2',
  CONCEPTS: 'dzbac_concepts_v2',
  LESSONS: 'dzbac_lessons_v2',
  EXERCISES: 'dzbac_exercises_v2',
  BAC_EXERCISES: 'dzbac_bac_exercises_v2',
  QUIZZES: 'dzbac_quizzes_v2',
  TESTS: 'dzbac_tests_v2',
  CONCEPT_PROGRESS: 'dzbac_concept_progress_v2',
  EXERCISE_ATTEMPTS: 'dzbac_exercise_attempts_v2',
  BAC_ATTEMPTS: 'dzbac_bac_attempts_v2',
  QUIZ_RESULTS: 'dzbac_quiz_results_v2',
  TEST_RESULTS: 'dzbac_test_results_v2',
  USER_STATS: 'dzbac_user_stats_v2',
  WEIGHTS_CONFIG: 'dzbac_weights_config_v2',
  ACTIVE_STREAM: 'dzbac_active_stream_v2',
  AUTH_USER: 'dzbac_auth_session_v1'
};

// Neutral zeroed stats for a student with no recorded activity yet — never
// fabricated demo numbers, since this is what shows before the real backend
// stats have loaded (or if they can't be reached).
const EMPTY_USER_STATS = (): UserStudyStats => ({
  totalStudyTimeMinutes: 0,
  streakDays: 0,
  lastStudyDate: '',
  completedLessonsCount: 0,
  solvedExercisesCount: 0,
  solvedBacCount: 0,
  averageAccuracy: 0,
  overallCourseProgress: 0,
  stream: 'شعبة العلوم التجريبية',
});

class LocalStorageService {
  constructor() {
    this.initDefaultData();
  }

  private initDefaultData(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
      this.saveSubject(mathSubject);
    }
    const rawChapters = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
    if (!rawChapters) {
      localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chapters));
    } else {
      try {
        const storedChapters: Chapter[] = JSON.parse(rawChapters);
        const map = new Map<string, Chapter>();
        storedChapters.forEach(c => map.set(c.id, c));
        chapters.forEach(c => {
          map.set(c.id, c);
        });
        localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(Array.from(map.values())));
      } catch {
        localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chapters));
      }
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONCEPTS)) {
      localStorage.setItem(STORAGE_KEYS.CONCEPTS, JSON.stringify(concepts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LESSONS)) {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
    }
    // Merge or update static datasets to ensure all 2014-2026 BAC and new exercises are always present
    const rawExs = localStorage.getItem(STORAGE_KEYS.EXERCISES);
    if (!rawExs) {
      localStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(exercises));
    } else {
      try {
        const stored: Exercise[] = JSON.parse(rawExs);
        const map = new Map<string, Exercise>();
        stored.forEach(e => map.set(e.id, e));
        exercises.forEach(e => map.set(e.id, { ...(map.get(e.id) || {}), ...e }));
        localStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(Array.from(map.values())));
      } catch {
        localStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(exercises));
      }
    }

    const rawBac = localStorage.getItem(STORAGE_KEYS.BAC_EXERCISES);
    if (!rawBac) {
      localStorage.setItem(STORAGE_KEYS.BAC_EXERCISES, JSON.stringify(bacExercises));
    } else {
      try {
        const stored: BACExercise[] = JSON.parse(rawBac);
        const validIds = new Set(bacExercises.map(b => b.id));
        const map = new Map<string, BACExercise>();
        stored.filter(b => validIds.has(b.id) && b.chapterId !== 'diagnostic').forEach(b => map.set(b.id, b));
        bacExercises.filter(b => b.chapterId !== 'diagnostic').forEach(b => map.set(b.id, { ...(map.get(b.id) || {}), ...b }));
        localStorage.setItem(STORAGE_KEYS.BAC_EXERCISES, JSON.stringify(Array.from(map.values())));
      } catch {
        localStorage.setItem(STORAGE_KEYS.BAC_EXERCISES, JSON.stringify(bacExercises));
      }
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizQuestions));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TESTS)) {
      localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(miniTests));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WEIGHTS_CONFIG)) {
      localStorage.setItem(STORAGE_KEYS.WEIGHTS_CONFIG, JSON.stringify(DEFAULT_PROGRESS_WEIGHTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_STATS)) {
      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(EMPTY_USER_STATS()));
    }
  }

  // --- SUBJECTS ---
  public getSubjects(): Subject[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (!raw) return [mathSubject];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [mathSubject];
    }
  }

  public saveSubject(subject: Subject): void {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify([subject]));
  }

  // --- CHAPTERS ---
  public getChapters(): Chapter[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
    if (!raw) return chapters;
    try {
      return JSON.parse(raw);
    } catch {
      return chapters;
    }
  }

  public getChapterById(chapterId: string): Chapter | undefined {
    return this.getChapters().find(c => c.id === chapterId);
  }

  public saveChapters(chapterList: Chapter[]): void {
    localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chapterList));
  }

  // --- CONCEPTS ---
  public getConcepts(chapterId?: string): Concept[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CONCEPTS);
    let allConcepts: Concept[] = concepts;
    if (raw) {
      try {
        allConcepts = JSON.parse(raw);
      } catch {
        allConcepts = concepts;
      }
    }
    if (chapterId) {
      return allConcepts.filter(c => c.chapterId === chapterId);
    }
    return allConcepts;
  }

  public getConceptById(conceptId: string): Concept | undefined {
    return this.getConcepts().find(c => c.id === conceptId);
  }

  public saveConcepts(conceptList: Concept[]): void {
    localStorage.setItem(STORAGE_KEYS.CONCEPTS, JSON.stringify(conceptList));
  }

  // --- LESSONS ---
  public getLesson(conceptId: string): Lesson | undefined {
    const raw = localStorage.getItem(STORAGE_KEYS.LESSONS);
    if (raw) {
      try {
        const dict = JSON.parse(raw);
        if (dict[conceptId]) return dict[conceptId];
      } catch {
        // fallback
      }
    }
    return lessons[conceptId];
  }

  public saveLesson(lesson: Lesson): void {
    const raw = localStorage.getItem(STORAGE_KEYS.LESSONS);
    let dict: Record<string, Lesson> = lessons;
    if (raw) {
      try {
        dict = JSON.parse(raw);
      } catch {
        dict = lessons;
      }
    }
    dict[lesson.conceptId] = lesson;
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(dict));
  }

  // --- EXERCISES ---
  public getExercises(conceptId?: string, chapterId?: string): Exercise[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EXERCISES);
    let all: Exercise[] = exercises;
    if (raw) {
      try {
        const stored: Exercise[] = JSON.parse(raw);
        const map = new Map<string, Exercise>();
        exercises.forEach(e => map.set(e.id, e));
        stored.forEach(e => map.set(e.id, e));
        all = Array.from(map.values());
      } catch {
        all = exercises;
      }
    }
    all.sort((a, b) => a.number - b.number);
    if (conceptId) {
      return all.filter(e => e.conceptId === conceptId);
    }
    if (chapterId) {
      return all.filter(e => e.chapterId === chapterId);
    }
    return all;
  }

  public getExerciseById(id: string): Exercise | undefined {
    return this.getExercises().find(e => e.id === id);
  }

  public saveExerciseAttempt(attempt: StudentExerciseAttempt): void {
    const raw = localStorage.getItem(STORAGE_KEYS.EXERCISE_ATTEMPTS);
    let list: StudentExerciseAttempt[] = [];
    if (raw) {
      try {
        list = JSON.parse(raw);
      } catch {
        list = [];
      }
    }
    // Remove previous attempt for same exercise or update
    const idx = list.findIndex(a => a.exerciseId === attempt.exerciseId);
    if (idx >= 0) {
      list[idx] = attempt;
    } else {
      list.push(attempt);
    }
    localStorage.setItem(STORAGE_KEYS.EXERCISE_ATTEMPTS, JSON.stringify(list));
  }

  public getExerciseAttempts(): StudentExerciseAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EXERCISE_ATTEMPTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public getExerciseAttempt(exerciseId: string): StudentExerciseAttempt | undefined {
    return this.getExerciseAttempts().find(a => a.exerciseId === exerciseId);
  }

  // --- BAC EXERCISES ---
  public getBACExercises(conceptId?: string, chapterId?: string): BACExercise[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BAC_EXERCISES);
    let all: BACExercise[] = bacExercises;
    if (raw) {
      try {
        const stored: BACExercise[] = JSON.parse(raw);
        const map = new Map<string, BACExercise>();
        bacExercises.forEach(b => map.set(b.id, b));
        stored.filter(b => b.chapterId !== 'diagnostic').forEach(b => map.set(b.id, b));
        all = Array.from(map.values()).filter(b => b.chapterId !== 'diagnostic');
      } catch {
        all = bacExercises.filter(b => b.chapterId !== 'diagnostic');
      }
    } else {
      all = bacExercises.filter(b => b.chapterId !== 'diagnostic');
    }
    // Sort chronologically descending (from 2026 down to 2014)
    all.sort((a, b) => b.year - a.year);

    if (conceptId) {
      return all.filter(b => b.conceptId === conceptId);
    }
    if (chapterId) {
      return all.filter(b => b.chapterId === chapterId);
    }
    return all;
  }

  public getBACExerciseById(id: string): BACExercise | undefined {
    return this.getBACExercises().find(b => b.id === id);
  }

  public saveBACAttempt(attempt: StudentBACAttempt): void {
    const raw = localStorage.getItem(STORAGE_KEYS.BAC_ATTEMPTS);
    let list: StudentBACAttempt[] = [];
    if (raw) {
      try {
        list = JSON.parse(raw);
      } catch {
        list = [];
      }
    }
    const idx = list.findIndex(a => a.bacExerciseId === attempt.bacExerciseId);
    if (idx >= 0) {
      list[idx] = attempt;
    } else {
      list.push(attempt);
    }
    localStorage.setItem(STORAGE_KEYS.BAC_ATTEMPTS, JSON.stringify(list));
  }

  public getBACAttempts(): StudentBACAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BAC_ATTEMPTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  // --- QUIZZES ---
  public getQuizQuestions(conceptId: string): QuizQuestion[] {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    if (raw) {
      try {
        const dict = JSON.parse(raw);
        if (dict[conceptId]) return dict[conceptId];
      } catch {
        // fallback
      }
    }
    return quizQuestions[conceptId] || [];
  }

  public saveQuizResult(submission: QuizSubmission): void {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    let dict: Record<string, QuizSubmission> = {};
    if (raw) {
      try {
        dict = JSON.parse(raw);
      } catch {
        dict = {};
      }
    }
    dict[submission.conceptId] = submission;
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(dict));
  }

  public getQuizResult(conceptId: string): QuizSubmission | undefined {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    if (!raw) return undefined;
    try {
      const dict = JSON.parse(raw);
      return dict[conceptId];
    } catch {
      return undefined;
    }
  }

  // --- TESTS ---
  public getMiniTest(conceptId: string): MiniTest | undefined {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTS);
    if (raw) {
      try {
        const dict = JSON.parse(raw);
        if (dict[conceptId]) return dict[conceptId];
      } catch {
        // fallback
      }
    }
    return miniTests[conceptId];
  }

  public saveTestResult(result: TestResult): void {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
    let list: TestResult[] = [];
    if (raw) {
      try {
        list = JSON.parse(raw);
      } catch {
        list = [];
      }
    }
    const idx = list.findIndex(r => r.testId === result.testId);
    if (idx >= 0) {
      list[idx] = result;
    } else {
      list.push(result);
    }
    localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(list));
  }

  public getTestResults(conceptId?: string): TestResult[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
    if (!raw) return [];
    try {
      const list: TestResult[] = JSON.parse(raw);
      if (conceptId) {
        return list.filter(r => r.conceptId === conceptId);
      }
      return list;
    } catch {
      return [];
    }
  }

  // --- CONCEPT PROGRESS ---
  public getConceptProgress(conceptId: string): ConceptProgress | undefined {
    const all = this.getAllConceptProgress();
    return all[conceptId];
  }

  public getAllConceptProgress(): Record<string, ConceptProgress> {
    const raw = localStorage.getItem(STORAGE_KEYS.CONCEPT_PROGRESS);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  public saveConceptProgress(progress: ConceptProgress): void {
    const all = this.getAllConceptProgress();
    all[progress.conceptId] = progress;
    localStorage.setItem(STORAGE_KEYS.CONCEPT_PROGRESS, JSON.stringify(all));
  }

  // --- USER STATS ---
  public getUserStats(): UserStudyStats {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    if (!raw) {
      return EMPTY_USER_STATS();
    }
    try {
      return JSON.parse(raw);
    } catch {
      return EMPTY_USER_STATS();
    }
  }

  public saveUserStats(stats: UserStudyStats): void {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  }

  // --- AUTHENTICATION ---
  public getAuthUser(): AuthUser {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }
    const defaultUser: AuthUser = {
      id: '',
      email: '',
      fullName: '',
      stream: 'شعبة العلوم التجريبية',
      isLoggedIn: false,
      createdAt: '',
    };
    return defaultUser;
  }

  public setAuthUser(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  }

  public logout(): void {
    const loggedOutUser: AuthUser = {
      id: '',
      email: '',
      fullName: '',
      stream: '',
      isLoggedIn: false,
      createdAt: '',
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(loggedOutUser));
  }

  // Clear or reset data for testing
  public resetAllData(): void {
    localStorage.clear();
    this.initDefaultData();
  }
}

export const localStorageService = new LocalStorageService();
