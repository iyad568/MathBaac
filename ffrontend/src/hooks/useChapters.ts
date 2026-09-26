import { useState, useEffect, useCallback } from 'react';
import { Chapter, Concept, ChapterProgress } from '../types';
import { contentService } from '../services/contentService';

export function useChapters() {
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);
  const [chapterProgressMap, setChapterProgressMap] = useState<Record<string, ChapterProgress>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const chaps = await contentService.getChapters();
      setChaptersList(chaps);

      const progPromises = chaps.map(c => contentService.getChapterProgress(c.id));
      const progs = await Promise.all(progPromises);
      const map: Record<string, ChapterProgress> = {};
      chaps.forEach((c, idx) => {
        map[c.id] = progs[idx];
      });
      setChapterProgressMap(map);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    chapters: chaptersList,
    progressMap: chapterProgressMap,
    loading,
    refresh: loadData,
  };
}
