import { useState, useEffect, useCallback, useRef } from 'react';
import { contentService } from '../services/contentService';
import { Concept } from '../types';

export interface NextConceptInfo {
  concept: Concept;
  chapterTitle: string;
}

/**
 * Finds the first not-yet-100%-complete concept in curriculum order, so
 * "continue studying" always points at real unfinished work instead of a
 * hardcoded lesson. A chapter is skipped once its average mastery reaches
 * 100% — the same rule that unlocks the next chapter/concept — so the result
 * never points at content that's still locked.
 */
export function useNextConcept() {
  const [nextConcept, setNextConcept] = useState<NextConceptInfo | null | undefined>(undefined);
  const requestIdRef = useRef(0);

  const refresh = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    const chapters = await contentService.getChapters();
    if (chapters.length === 0) return;

    const chapterProgressList = await Promise.all(
      chapters.map((c) => contentService.getChapterProgress(c.id))
    );

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const mastery = chapterProgressList[i]?.averageMasteryPercentage ?? 0;
      if (mastery >= 100) continue;

      const [concepts, progressList] = await Promise.all([
        contentService.getConcepts(chapter.id),
        contentService.getConceptsProgressForChapter(chapter.id),
      ]);
      const percentByConcept: Record<string, number> = {};
      progressList.forEach((p) => {
        percentByConcept[p.conceptId] = p.overallPercentage ?? 0;
      });
      const concept = concepts.find((c) => (percentByConcept[c.id] ?? 0) < 100);
      if (concept) {
        if (requestIdRef.current === requestId) {
          setNextConcept({ concept, chapterTitle: chapter.title });
        }
        return;
      }
    }
    if (requestIdRef.current === requestId) {
      setNextConcept(null); // everything is at 100%
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { nextConcept, refresh };
}
