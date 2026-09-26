import { useState, useEffect, useCallback } from 'react';
import { Exercise, StudentExerciseAttempt, Chapter, Concept } from '../types';
import { contentService } from '../services/contentService';
import { localStorageService } from '../services/localStorageService';

export function useExercises(chapterId?: string, conceptId?: string) {
  const [exercisesList, setExercisesList] = useState<Exercise[]>([]);
  const [attempts, setAttempts] = useState<StudentExerciseAttempt[]>([]);
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);
  const [conceptsList, setConceptsList] = useState<Concept[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [exs, atts, chaps, concs] = await Promise.all([
        contentService.getExercises(conceptId, chapterId),
        contentService.getExerciseAttempts(),
        contentService.getChapters(),
        contentService.getConcepts(chapterId),
      ]);
      setExercisesList(exs);
      setAttempts(atts);
      setChaptersList(chaps);
      setConceptsList(concs);
    } finally {
      setLoading(false);
    }
  }, [chapterId, conceptId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const submitExercise = async (attempt: StudentExerciseAttempt, chapId: string) => {
    await contentService.submitExerciseAttempt(attempt, chapId);
    setAttempts(prev => {
      const filtered = prev.filter(a => a.exerciseId !== attempt.exerciseId);
      return [...filtered, attempt];
    });
  };

  return {
    exercises: exercisesList,
    attempts,
    chapters: chaptersList,
    concepts: conceptsList,
    loading,
    refresh: loadData,
    submitExercise,
  };
}
