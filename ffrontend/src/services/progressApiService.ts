import { ConceptProgress, ChapterProgress, UserStudyStats } from '../types';
import { apiClient } from './apiClient';
import { localStorageService } from './localStorageService';

// The backend's GET /progress/concept and /progress/chapter compute progress live
// from the real submitted data (quiz submissions, test results, lesson completions,
// dashboard activity log) rather than from a stored snapshot — so there is nothing
// to "push" for those; they just need to be read instead of computed locally.
// Lesson completion is the one signal that previously lived only in localStorage,
// so that's what the one-time migration below actually pushes.

interface ApiConceptProgress extends Omit<ConceptProgress, 'lastAccessedAt'> {}
interface ApiChapterProgress extends ChapterProgress {}
interface ApiUserStudyStats extends Omit<UserStudyStats, 'lastStudyDate'> {
  lastStudyDate: string | null;
}

class ProgressApiService {
  public async getConceptProgress(conceptId: string): Promise<ConceptProgress> {
    const data = await apiClient.get<ApiConceptProgress>(`/progress/concept/${encodeURIComponent(conceptId)}`);
    return { ...data, lastAccessedAt: Date.now() };
  }

  public async getChapterProgress(chapterId: string): Promise<ChapterProgress> {
    return apiClient.get<ApiChapterProgress>(`/progress/chapter/${encodeURIComponent(chapterId)}`);
  }

  /** All of a chapter's concepts' progress in one request, instead of one request per concept. */
  public async getConceptsProgressForChapter(chapterId: string): Promise<ConceptProgress[]> {
    const data = await apiClient.get<ApiConceptProgress[]>(
      `/progress/chapter/${encodeURIComponent(chapterId)}/concepts`
    );
    return data.map((cp) => ({ ...cp, lastAccessedAt: Date.now() }));
  }

  public async getUserStats(): Promise<UserStudyStats> {
    const data = await apiClient.get<ApiUserStudyStats>('/progress/stats');
    return { ...data, lastStudyDate: data.lastStudyDate ?? '' };
  }

  public async markLessonComplete(conceptId: string, videoWatchedSeconds?: number): Promise<void> {
    await apiClient.post('/progress/lesson-complete', {
      conceptId,
      videoWatchedSeconds,
    });
  }

  /** Wipes all of the current user's progress data on the backend — irreversible. */
  public async resetAllProgress(): Promise<void> {
    await apiClient.post('/progress/reset');
  }

  /** One-time push of any lesson-completion flags recorded locally before this
   * concept was backend-tracked, so a returning student doesn't lose that signal. */
  public async migrateLocalLessonCompletions(): Promise<void> {
    const FLAG_KEY = 'mathbac_progress_migrated_v1';
    if (localStorage.getItem(FLAG_KEY)) return;

    try {
      const all = localStorageService.getAllConceptProgress();
      const completed = Object.values(all).filter((p) => p.lessonCompleted);
      for (const p of completed) {
        await this.markLessonComplete(p.conceptId, p.videoWatchedSeconds);
      }
      localStorage.setItem(FLAG_KEY, '1');
    } catch {
      // Best effort — leave the flag unset so it's retried on the next load.
    }
  }
}

export const progressApiService = new ProgressApiService();
