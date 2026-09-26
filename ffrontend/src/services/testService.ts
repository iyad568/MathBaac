import { MiniTest, TestQuestion, TestAnswerInput, TestResult, TestGradedAnswer } from '../types/test';
import { apiClient, ApiError } from './apiClient';

// ── Wire shapes returned by the backend (camelCase) ─────────────────────────

interface ApiTestQuestionPublic {
  id: string;
  conceptId: string;
  chapterId: string;
  conceptName: string | null;
  questionNumber: number;
  questionText: string;
  questionMath: string | null;
  options: { id: string; text: string; mathTex?: string }[];
}

interface ApiMiniTest {
  id: string;
  conceptId: string;
  title: string;
  timeLimitMinutes: number;
  totalQuestions: number;
}

interface ApiMiniTestWithQuestions extends ApiMiniTest {
  questions: ApiTestQuestionPublic[];
}

interface ApiTestResult {
  id: number;
  userId: number;
  testId: string;
  conceptId: string;
  answers: TestGradedAnswer[] | null;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number | null;
  conceptBreakdown: TestResult['conceptBreakdown'] | null;
  completedAt: string;
}

function toQuestion(api: ApiTestQuestionPublic): TestQuestion {
  return {
    id: api.id,
    conceptId: api.conceptId,
    chapterId: api.chapterId,
    conceptName: api.conceptName ?? 'قواعد عامة',
    questionNumber: api.questionNumber,
    questionText: api.questionText,
    questionMath: api.questionMath ?? undefined,
    options: api.options,
  };
}

function toMiniTest(api: ApiMiniTestWithQuestions): MiniTest {
  return {
    id: api.id,
    conceptId: api.conceptId,
    title: api.title,
    timeLimitMinutes: api.timeLimitMinutes,
    totalQuestions: api.totalQuestions,
    questions: api.questions.map(toQuestion),
  };
}

function toResult(api: ApiTestResult): TestResult {
  return {
    testId: api.testId,
    conceptId: api.conceptId,
    answers: api.answers ?? [],
    score: api.score,
    totalQuestions: api.totalQuestions,
    timeSpentSeconds: api.timeSpentSeconds ?? 0,
    completedAt: new Date(api.completedAt.endsWith('Z') ? api.completedAt : `${api.completedAt}Z`).getTime(),
    conceptBreakdown: api.conceptBreakdown ?? undefined,
  };
}

class TestService {
  public async listTests(): Promise<ApiMiniTest[]> {
    return apiClient.get<ApiMiniTest[]>('/tests/');
  }

  public async getTestByConcept(conceptId: string): Promise<MiniTest | undefined> {
    try {
      const data = await apiClient.get<ApiMiniTestWithQuestions>(
        `/tests/by-concept/${encodeURIComponent(conceptId)}`
      );
      return toMiniTest(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return undefined;
      throw err;
    }
  }

  public async submitResult(
    testId: string,
    conceptId: string,
    answers: TestAnswerInput[],
    timeSpentSeconds: number
  ): Promise<TestResult> {
    const data = await apiClient.post<ApiTestResult>('/tests/results', {
      testId,
      conceptId,
      answers,
      timeSpentSeconds,
    });
    return toResult(data);
  }

  public async getResults(conceptId?: string): Promise<TestResult[]> {
    const query = conceptId ? `?concept_id=${encodeURIComponent(conceptId)}` : '';
    const data = await apiClient.get<ApiTestResult[]>(`/tests/results${query}`);
    return data.map(toResult);
  }
}

export const testService = new TestService();
