import { Subject, Chapter, Concept, Lesson } from '../types';
import { chapters as staticChapters } from '../data/chapters';
import { apiClient, ApiError } from './apiClient';

// Backend curriculum schemas use CamelModel, so the wire shape already matches
// these frontend types field-for-field (see backend/app/modules/curriculum/schemas.py).
// A few display-only counters (conceptsCount, exercisesCount...) aren't stored on the
// backend Chapter row — they're cosmetic badges, so we still take them from the
// static catalog rather than adding columns/extra queries for them.

function toChapter(api: Chapter): Chapter {
  const staticMatch = staticChapters.find((c) => c.id === api.id);
  return {
    ...api,
    conceptCount: staticMatch?.conceptCount,
    conceptsCount: staticMatch?.conceptsCount,
    exerciseCount: staticMatch?.exerciseCount,
    exercisesCount: staticMatch?.exercisesCount,
    bacProblemCount: staticMatch?.bacProblemCount,
    bacExercisesCount: staticMatch?.bacExercisesCount,
  };
}

class CurriculumService {
  public async getSubjects(): Promise<Subject[]> {
    return apiClient.get<Subject[]>('/curriculum/subjects');
  }

  public async getChapters(subjectId?: string): Promise<Chapter[]> {
    const query = subjectId ? `?subject_id=${encodeURIComponent(subjectId)}` : '';
    const data = await apiClient.get<Chapter[]>(`/curriculum/chapters${query}`);
    return data.map(toChapter);
  }

  public async getChapter(chapterId: string): Promise<Chapter | undefined> {
    try {
      const data = await apiClient.get<Chapter>(`/curriculum/chapters/${encodeURIComponent(chapterId)}`);
      return toChapter(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return undefined;
      throw err;
    }
  }

  public async getConcepts(chapterId?: string): Promise<Concept[]> {
    const query = chapterId ? `?chapter_id=${encodeURIComponent(chapterId)}` : '';
    return apiClient.get<Concept[]>(`/curriculum/concepts${query}`);
  }

  public async getConcept(conceptId: string): Promise<Concept | undefined> {
    try {
      return await apiClient.get<Concept>(`/curriculum/concepts/${encodeURIComponent(conceptId)}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return undefined;
      throw err;
    }
  }

  public async getLesson(conceptId: string): Promise<Lesson | undefined> {
    try {
      return await apiClient.get<Lesson>(`/curriculum/lessons/by-concept/${encodeURIComponent(conceptId)}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return undefined;
      throw err;
    }
  }
}

export const curriculumService = new CurriculumService();
