import { QuizQuestion, QuizAnswerInput, QuizSubmission, QuizGradedAnswer } from '../types/quiz';
import { apiClient, ApiError } from './apiClient';

// ── Wire shapes returned by the backend (camelCase) ─────────────────────────

interface ApiQuizQuestionPublic {
  id: string;
  conceptId: string;
  questionNumber: number;
  questionText: string;
  questionMath: string | null;
  options: { id: string; text: string; mathTex?: string }[];
}

interface ApiQuizSubmission {
  id: number;
  userId: number;
  conceptId: string;
  answers: QuizGradedAnswer[] | null;
  score: number;
  total: number;
  timeSpentSeconds: number | null;
  submittedAt: string;
}

function toQuestion(api: ApiQuizQuestionPublic): QuizQuestion {
  return {
    id: api.id,
    conceptId: api.conceptId,
    questionNumber: api.questionNumber,
    questionText: api.questionText,
    questionMath: api.questionMath ?? undefined,
    options: api.options,
  };
}

function toSubmission(api: ApiQuizSubmission): QuizSubmission {
  return {
    conceptId: api.conceptId,
    answers: api.answers ?? [],
    score: api.score,
    total: api.total,
    submittedAt: new Date(api.submittedAt.endsWith('Z') ? api.submittedAt : `${api.submittedAt}Z`).getTime(),
    timeSpentSeconds: api.timeSpentSeconds ?? 0,
  };
}

class QuizService {
  public async getQuestions(conceptId: string): Promise<QuizQuestion[]> {
    const data = await apiClient.get<ApiQuizQuestionPublic[]>(
      `/quizzes/questions?concept_id=${encodeURIComponent(conceptId)}`
    );
    return data.map(toQuestion);
  }

  public async submitQuiz(
    conceptId: string,
    answers: QuizAnswerInput[],
    timeSpentSeconds: number
  ): Promise<QuizSubmission> {
    const data = await apiClient.post<ApiQuizSubmission>('/quizzes/submissions', {
      conceptId,
      answers,
      timeSpentSeconds,
    });
    return toSubmission(data);
  }

  public async getLatestSubmission(conceptId: string): Promise<QuizSubmission | undefined> {
    try {
      const data = await apiClient.get<ApiQuizSubmission>(
        `/quizzes/submissions/latest?concept_id=${encodeURIComponent(conceptId)}`
      );
      return toSubmission(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return undefined;
      throw err;
    }
  }
}

export const quizService = new QuizService();
