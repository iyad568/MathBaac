import { QuizOption } from './quiz';

export interface TestQuestion {
  id: string;
  conceptId: string;
  chapterId: string;
  conceptName: string;
  questionNumber: number;
  questionText: string;
  questionMath?: string;
  options: QuizOption[];
  // Only populated once the backend has graded a result — the question-list
  // endpoint students take the test from never sends the answer key up front.
  correctOptionId?: string;
  explanation?: string;
  explanationMath?: string;
}

export interface MiniTest {
  id: string;
  conceptId: string;
  title: string;
  timeLimitMinutes: number;
  totalQuestions: number;
  questions: TestQuestion[];
}

export interface TestAnswerInput {
  questionId: string;
  selectedOptionId: string | null;
}

export interface TestGradedAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  correctOptionId: string;
  explanation?: string;
  explanationMath?: string;
}

export interface TestResult {
  testId: string;
  conceptId: string;
  answers: TestGradedAnswer[];
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  completedAt?: number;
  conceptBreakdown?: {
    conceptName: string;
    correctCount: number;
    totalCount: number;
    percentage: number;
  }[];
}
