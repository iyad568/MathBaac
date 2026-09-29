import { useState, useEffect, useCallback } from 'react';
import { contentService } from '../services/contentService';

/**
 * Same sequential lock rule as ChapterDetailPage/MathematicsPage (a chapter/concept
 * unlocks once the previous one reaches 100%), computed globally across all chapters
 * so pages like the exercise/BAC library can tell which concepts are actually reachable.
 */
export function useUnlockedConcepts() {
  const [unlockedConceptIds, setUnlockedConceptIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const chapters = await contentService.getChapters();
      const unlocked = new Set<string>();
      let previousChapterMastery = 100; // the first chapter is always unlocked

      for (const chapter of chapters) {
        if (previousChapterMastery < 100) break;

        const [concepts, progressList] = await Promise.all([
          contentService.getConcepts(chapter.id),
          contentService.getConceptsProgressForChapter(chapter.id),
        ]);
        const percentByConcept: Record<string, number> = {};
        progressList.forEach((p) => {
          percentByConcept[p.conceptId] = p.overallPercentage ?? 0;
        });

        let previousConceptDone = true;
        for (const concept of concepts) {
          if (previousConceptDone) unlocked.add(concept.id);
          previousConceptDone = (percentByConcept[concept.id] ?? 0) >= 100;
        }

        previousChapterMastery =
          concepts.length > 0
            ? Math.round(
                concepts.reduce((sum, c) => sum + (percentByConcept[c.id] ?? 0), 0) / concepts.length
              )
            : 0;
      }

      setUnlockedConceptIds(unlocked);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { unlockedConceptIds, loading, refresh: loadData };
}
