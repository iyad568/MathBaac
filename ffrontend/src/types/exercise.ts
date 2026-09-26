import { Difficulty } from './concept';

export interface Exercise {
  id: string;
  conceptId: string;
  chapterId: string;
  number: number;
  title: string;
  question: string;
  questionMath?: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  // Only present for auto-graded exercises (imported curriculum content). A plain
  // exercise added through the admin's quick-add form has just question + solution text.
  answerType?: 'numeric' | 'expression' | 'multiple_choice';
  options?: string[];
  correctAnswer?: string;
  acceptedAnswers?: string[];
  solutionSteps?: { step: number; title: string; math?: string; explanation: string }[];
  explanation?: string;
  hint?: string;
}

export interface StudentExerciseAttempt {
  exerciseId: string;
  conceptId: string;
  studentAnswer: string;
  isCorrect: boolean;
  timestamp?: number;
  completedAt?: number;
  timeSpentSeconds: number;
  attemptNumber?: number;
  attemptsCount?: number;
  // Prepared structure for future AI analysis
  errorAnalysis?: ErrorAnalysis;
}

export interface ErrorAnalysis {
  exerciseId: string;
  errorType: 'algebraic_slip' | 'derivative_rule_misapplied' | 'sign_error' | 'domain_oversight' | 'conceptual';
  explanation: string;
  relatedConcept: string;
  recommendation: string;
}

export interface BACExercise {
  id: string;
  conceptId: string;
  chapterId: string;
  year: number;
  session: 'Normal' | 'Rattrapage';
  stream: string;
  title: string;
  question: string;
  questionMath?: string;
  // Only present for imported BAC problems with a full ministry mark scheme. A BAC
  // problem added through the admin's quick-add form has just question + plain solution text.
  subQuestions?: {
    id: string;
    label: string;
    text: string;
    math?: string;
    points: number;
  }[];
  difficulty: Difficulty;
  estimatedMinutes: number;
  points: number;
  officialSolution?: {
    steps: { label: string; text: string; math?: string; points: number }[];
    finalAnswerMath: string;
    gradingNotes: string[];
  };
  solutionText?: string;
}

export interface StudentBACAttempt {
  bacExerciseId: string;
  conceptId: string;
  studentSolutionText?: string;
  score?: number;
  selfAssessedScore?: number;
  maxScore: number;
  completed: boolean;
  timestamp?: number;
  completedAt?: number;
  timeSpentSeconds: number;
}
