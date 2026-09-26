import { Exercise, BACExercise } from '../types/exercise';
import { Difficulty } from '../types/concept';
import { apiClient } from './apiClient';

// The exercises API predates the app's camelCase convention and still speaks
// snake_case (see backend/app/modules/exercises/schemas.py), same as adminService.ts.
interface ApiExercise {
  id: number;
  external_id: string | null;
  chapter_id: string;
  concept_id: string | null;
  exercise_type: 'exercise' | 'bac';
  title: string | null;
  number: number | null;
  content: string;
  question_math: string | null;
  solution: string | null;
  answer_type: string | null;
  options: string[] | null;
  correct_answer: string | null;
  accepted_answers: string[] | null;
  solution_steps: { step: number; title: string; math?: string; explanation: string }[] | null;
  explanation: string | null;
  hint: string | null;
  sub_questions: { id: string; label: string; text: string; math?: string; points: number }[] | null;
  official_solution: { steps: { label: string; text: string; math?: string; points: number }[]; finalAnswerMath: string; gradingNotes: string[] } | null;
  difficulty: Difficulty | null;
  estimated_minutes: number | null;
  points: number | null;
  bac_year: number | null;
  bac_session: 'Normal' | 'Rattrapage' | null;
  bac_stream: string | null;
}

function toExercise(api: ApiExercise): Exercise {
  return {
    id: api.external_id ?? String(api.id),
    conceptId: api.concept_id ?? '',
    chapterId: api.chapter_id,
    number: api.number ?? api.id,
    title: api.title ?? `تمرين رقم ${api.number ?? api.id}`,
    question: api.content,
    questionMath: api.question_math ?? undefined,
    difficulty: api.difficulty ?? 'medium',
    estimatedMinutes: api.estimated_minutes ?? 10,
    answerType: (api.answer_type as Exercise['answerType']) ?? undefined,
    options: api.options ?? undefined,
    correctAnswer: api.correct_answer ?? undefined,
    acceptedAnswers: api.accepted_answers ?? undefined,
    solutionSteps: api.solution_steps ?? undefined,
    explanation: api.explanation ?? api.solution ?? undefined,
    hint: api.hint ?? undefined,
  };
}

function toBACExercise(api: ApiExercise): BACExercise {
  return {
    id: api.external_id ?? String(api.id),
    conceptId: api.concept_id ?? '',
    chapterId: api.chapter_id,
    year: api.bac_year ?? new Date().getFullYear(),
    session: api.bac_session ?? 'Normal',
    stream: api.bac_stream ?? 'عام',
    title: api.title ?? `موضوع بكالوريا ${api.bac_year ?? ''}`.trim(),
    question: api.content,
    questionMath: api.question_math ?? undefined,
    subQuestions: api.sub_questions ?? undefined,
    difficulty: api.difficulty ?? 'medium',
    estimatedMinutes: api.estimated_minutes ?? 45,
    points: api.points ?? 20,
    officialSolution: api.official_solution ?? undefined,
    solutionText: api.official_solution ? undefined : api.solution ?? undefined,
  };
}

async function fetchExercises(params: {
  conceptId?: string;
  chapterId?: string;
  exerciseType: 'exercise' | 'bac';
}): Promise<ApiExercise[]> {
  const qs = new URLSearchParams();
  if (params.conceptId) qs.set('concept_id', params.conceptId);
  if (params.chapterId) qs.set('chapter_id', params.chapterId);
  qs.set('exercise_type', params.exerciseType);
  return apiClient.get<ApiExercise[]>(`/exercises/?${qs.toString()}`);
}

class ExerciseService {
  public async getExercises(conceptId?: string, chapterId?: string): Promise<Exercise[]> {
    const data = await fetchExercises({ conceptId, chapterId, exerciseType: 'exercise' });
    return data.map(toExercise);
  }

  public async getBACExercises(conceptId?: string, chapterId?: string): Promise<BACExercise[]> {
    const data = await fetchExercises({ conceptId, chapterId, exerciseType: 'bac' });
    return data.map(toBACExercise);
  }
}

export const exerciseService = new ExerciseService();
