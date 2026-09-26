export interface ProgressWeightsConfig {
  lessonCompletedWeight: number;    // e.g. 0.20 (20%)
  quizCompletedWeight: number;      // e.g. 0.15 (15%)
  exercisesCompletedWeight: number; // e.g. 0.30 (30%)
  bacCompletedWeight: number;       // e.g. 0.20 (20%)
  miniTestCompletedWeight: number;  // e.g. 0.15 (15%)
}

export const DEFAULT_PROGRESS_WEIGHTS: ProgressWeightsConfig = {
  lessonCompletedWeight: 0.20,
  quizCompletedWeight: 0.15,
  exercisesCompletedWeight: 0.30,
  bacCompletedWeight: 0.20,
  miniTestCompletedWeight: 0.15,
};

export interface ConceptProgress {
  conceptId: string;
  chapterId: string;
  lessonCompleted: boolean;
  videoWatchedSeconds: number;
  quizScore?: number;
  quizTotal?: number;
  quizCompleted: boolean;
  exercisesSolvedCount: number;
  exercisesTotalCount: number;
  exercisesAccuracy: number; // percentage
  bacExercisesSolvedCount: number;
  bacExercisesTotalCount: number;
  miniTestScore?: number;
  miniTestTotal?: number;
  miniTestCompleted: boolean;
  totalTimeSpentSeconds: number; // actual time spent
  overallPercentage: number; // calculated 0 - 100 based on weights
  lastAccessedAt: number;
}

export interface ChapterProgress {
  chapterId: string;
  completedConceptsCount: number;
  totalConceptsCount: number;
  averageMasteryPercentage: number;
  totalExercisesSolved: number;
  totalBacSolved: number;
  totalTimeSpentMinutes: number;
}

export interface UserStudyStats {
  totalStudyTimeMinutes: number;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  completedLessonsCount: number;
  solvedExercisesCount: number;
  solvedBacCount: number;
  averageAccuracy: number;
  overallCourseProgress: number; // 0 - 100
  stream: string;
}
