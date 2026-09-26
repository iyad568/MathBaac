export interface QuizOption {
  id: string;
  text: string;
  mathTex?: string;
}

export interface QuizQuestion {
  id: string;
  conceptId: string;
  questionNumber: number;
  questionText: string;
  questionMath?: string;
  options: QuizOption[];
  // Only populated once the backend has graded a submission — the question-list
  // endpoint students take the quiz from never sends the answer key up front.
  correctOptionId?: string;
  explanation?: string;
  explanationMath?: string;
}

export interface QuizAnswerInput {
  questionId: string;
  selectedOptionId: string | null;
}

export interface QuizGradedAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  correctOptionId: string;
  explanation?: string;
  explanationMath?: string;
}

export interface QuizSubmission {
  conceptId: string;
  answers: QuizGradedAnswer[];
  score: number;
  total: number;
  submittedAt?: number;
  timeSpentSeconds: number;
}
