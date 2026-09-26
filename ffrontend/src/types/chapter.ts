export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  titleFr: string;
  description: string;
  order: number;
  estimatedMinutes?: number;
  estimatedHours?: number;
  stream?: string;
  iconName: string;
  bacWeight: string; // e.g. "5 to 7 pts in BAC"
  semester?: number;
  month?: string;
  weeks?: string;
  officialAxis?: string;
  totalWeeklyHours?: number;
  conceptCount?: number;
  conceptsCount?: number;
  exerciseCount?: number;
  exercisesCount?: number;
  bacProblemCount?: number;
  bacExercisesCount?: number;
}

