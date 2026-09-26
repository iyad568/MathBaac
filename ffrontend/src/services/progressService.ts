import {
  DEFAULT_PROGRESS_WEIGHTS,
  ConceptProgress,
  ChapterProgress,
  UserStudyStats,
} from '../types';
import { localStorageService } from './localStorageService';

export class ProgressService {
  /**
   * Recalculates the exact mathematical progress for a concept based on student activity:
   * Lesson (20%) + Quiz (15%) + Exercises (30%) + BAC (20%) + Mini Test (15%)
   */
  public calculateConceptProgress(conceptId: string, chapterId: string): ConceptProgress {
    const weights = DEFAULT_PROGRESS_WEIGHTS;

    const lesson = localStorageService.getLesson(conceptId);
    const quizQuestions = localStorageService.getQuizQuestions(conceptId);
    const quizSubmission = localStorageService.getQuizResult(conceptId);
    const allExercises = localStorageService.getExercises(conceptId);
    const allBac = localStorageService.getBACExercises(conceptId);
    const testResults = localStorageService.getTestResults(conceptId);
    const exerciseAttempts = localStorageService.getExerciseAttempts().filter(a => a.conceptId === conceptId);
    const bacAttempts = localStorageService.getBACAttempts().filter(a => a.conceptId === conceptId);
    const existingProgress = localStorageService.getConceptProgress(conceptId);

    // 1. Lesson Completion (20%)
    const lessonCompleted = existingProgress?.lessonCompleted ?? false;
    const lessonScorePortion = lessonCompleted ? weights.lessonCompletedWeight * 100 : 0;

    // 2. Quiz Completion & Performance (15%)
    let quizCompleted = false;
    let quizScore = 0;
    const quizTotal = quizQuestions.length;
    let quizScorePortion = 0;
    if (quizSubmission && quizTotal > 0) {
      quizCompleted = true;
      quizScore = quizSubmission.score;
      // Proportional score
      const quizRatio = Math.min(1, quizScore / quizTotal);
      quizScorePortion = quizRatio * weights.quizCompletedWeight * 100;
    }

    // 3. Exercises Completion & Accuracy (30%)
    const exercisesTotalCount = allExercises.length;
    const solvedExercises = exerciseAttempts.filter(a => a.isCorrect);
    const exercisesSolvedCount = solvedExercises.length;
    let exercisesAccuracy = 0;
    let exercisesScorePortion = 0;
    if (exercisesTotalCount > 0) {
      const completionRatio = Math.min(1, exercisesSolvedCount / exercisesTotalCount);
      exercisesAccuracy = exerciseAttempts.length > 0
        ? Math.round((solvedExercises.length / exerciseAttempts.length) * 100)
        : 0;
      exercisesScorePortion = completionRatio * weights.exercisesCompletedWeight * 100;
    }

    // 4. BAC Exercises Solved (20%)
    const bacExercisesTotalCount = allBac.length;
    const solvedBac = bacAttempts.filter(a => a.completed);
    const bacExercisesSolvedCount = solvedBac.length;
    let bacScorePortion = 0;
    if (bacExercisesTotalCount > 0) {
      const bacRatio = Math.min(1, bacExercisesSolvedCount / bacExercisesTotalCount);
      bacScorePortion = bacRatio * weights.bacCompletedWeight * 100;
    }

    // 5. Mini Test Completed (15%)
    let miniTestCompleted = false;
    let miniTestScore = 0;
    let miniTestTotal = 10;
    let miniTestScorePortion = 0;
    if (testResults.length > 0) {
      const bestResult = testResults.sort((a, b) => b.score - a.score)[0];
      miniTestCompleted = true;
      miniTestScore = bestResult.score;
      miniTestTotal = bestResult.totalQuestions;
      const testRatio = Math.min(1, miniTestScore / miniTestTotal);
      miniTestScorePortion = testRatio * weights.miniTestCompletedWeight * 100;
    }

    // Sum overall weighted percentage (0 - 100)
    const overallPercentage = Math.min(
      100,
      Math.round(lessonScorePortion + quizScorePortion + exercisesScorePortion + bacScorePortion + miniTestScorePortion)
    );

    // Calculate time spent
    const totalTimeSpentSeconds = (existingProgress?.totalTimeSpentSeconds ?? 0) + 
      exerciseAttempts.reduce((acc, a) => acc + (a.timeSpentSeconds || 0), 0) +
      bacAttempts.reduce((acc, b) => acc + (b.timeSpentSeconds || 0), 0) +
      (quizSubmission?.timeSpentSeconds || 0);

    const progress: ConceptProgress = {
      conceptId,
      chapterId,
      lessonCompleted,
      videoWatchedSeconds: existingProgress?.videoWatchedSeconds ?? 0,
      quizScore,
      quizTotal,
      quizCompleted,
      exercisesSolvedCount,
      exercisesTotalCount,
      exercisesAccuracy,
      bacExercisesSolvedCount,
      bacExercisesTotalCount,
      miniTestScore,
      miniTestTotal,
      miniTestCompleted,
      totalTimeSpentSeconds,
      overallPercentage,
      lastAccessedAt: Date.now()
    };

    localStorageService.saveConceptProgress(progress);
    this.updateGlobalUserStats();
    return progress;
  }

  /**
   * Aggregates progress for a given chapter
   */
  public getChapterProgress(chapterId: string): ChapterProgress {
    const conceptsInChapter = localStorageService.getConcepts(chapterId);
    const totalConceptsCount = conceptsInChapter.length;
    if (totalConceptsCount === 0) {
      return {
        chapterId,
        completedConceptsCount: 0,
        totalConceptsCount: 0,
        averageMasteryPercentage: 0,
        totalExercisesSolved: 0,
        totalBacSolved: 0,
        totalTimeSpentMinutes: 0
      };
    }

    let completedConceptsCount = 0;
    let totalPercentageSum = 0;
    let totalExercisesSolved = 0;
    let totalBacSolved = 0;
    let totalTimeSpentSeconds = 0;

    conceptsInChapter.forEach(c => {
      let cp = localStorageService.getConceptProgress(c.id);
      if (!cp) {
        // compute initial
        cp = this.calculateConceptProgress(c.id, chapterId);
      }
      if (cp.overallPercentage >= 80) {
        completedConceptsCount += 1;
      }
      totalPercentageSum += cp.overallPercentage;
      totalExercisesSolved += cp.exercisesSolvedCount;
      totalBacSolved += cp.bacExercisesSolvedCount;
      totalTimeSpentSeconds += cp.totalTimeSpentSeconds;
    });

    const averageMasteryPercentage = Math.round(totalPercentageSum / totalConceptsCount);

    return {
      chapterId,
      completedConceptsCount,
      totalConceptsCount,
      averageMasteryPercentage,
      totalExercisesSolved,
      totalBacSolved,
      totalTimeSpentMinutes: Math.round(totalTimeSpentSeconds / 60)
    };
  }

  /**
   * Recalculates and updates global user stats
   */
  public updateGlobalUserStats(): UserStudyStats {
    const allProgress = localStorageService.getAllConceptProgress();
    const attempts = localStorageService.getExerciseAttempts();
    const bacAttempts = localStorageService.getBACAttempts();
    const currentStats = localStorageService.getUserStats();

    const solvedExercisesCount = attempts.filter(a => a.isCorrect).length;
    const solvedBacCount = bacAttempts.filter(b => b.completed).length;
    const completedLessonsCount = Object.values(allProgress).filter(p => p.lessonCompleted).length;

    const values = Object.values(allProgress);
    const overallCourseProgress = values.length > 0
      ? Math.round(values.reduce((sum, p) => sum + p.overallPercentage, 0) / Math.max(values.length, 6))
      : currentStats.overallCourseProgress;

    const averageAccuracy = attempts.length > 0
      ? Math.round((solvedExercisesCount / attempts.length) * 100)
      : currentStats.averageAccuracy;

    const updatedStats: UserStudyStats = {
      ...currentStats,
      solvedExercisesCount,
      solvedBacCount,
      completedLessonsCount,
      averageAccuracy,
      overallCourseProgress,
    };

    localStorageService.saveUserStats(updatedStats);
    return updatedStats;
  }

  /**
   * Mark lesson as completed
   */
  public markLessonCompleted(conceptId: string, chapterId: string): ConceptProgress {
    let cp = localStorageService.getConceptProgress(conceptId);
    if (!cp) {
      cp = this.calculateConceptProgress(conceptId, chapterId);
    }
    cp.lessonCompleted = true;
    localStorageService.saveConceptProgress(cp);
    return this.calculateConceptProgress(conceptId, chapterId);
  }
}

export const progressService = new ProgressService();
