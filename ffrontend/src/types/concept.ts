export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Concept {
  id: string;
  chapterId: string;
  title: string;
  titleFr: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  difficulty: Difficulty;
  summary: string;
  tags: string[];
  weekNumber?: number;
  weekDate?: string;
  month?: string;
  officialHours?: number;
  axisName?: string;
}

