import { useState, useEffect, useCallback } from 'react';
import { UserStudyStats, ConceptProgress, ChapterProgress, Chapter } from '../types';
import { contentService } from '../services/contentService';
import { localStorageService } from '../services/localStorageService';

export function useProgress() {
  const [userStats, setUserStats] = useState<UserStudyStats | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterProgressList, setChapterProgressList] = useState<ChapterProgress[]>([]);
  const [allConceptProgress, setAllConceptProgress] = useState<Record<string, ConceptProgress>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const stats = await contentService.getUserStats();
      const chaps = await contentService.getChapters();
      const cpMap = localStorageService.getAllConceptProgress();
      const progs = await Promise.all(chaps.map(c => contentService.getChapterProgress(c.id)));

      setUserStats(stats);
      setChapters(chaps);
      setAllConceptProgress(cpMap);
      setChapterProgressList(progs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    userStats,
    chapters,
    chapterProgressList,
    allConceptProgress,
    loading,
    refresh: loadData,
  };
}
