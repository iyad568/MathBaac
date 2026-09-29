import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, PlayCircle, Clock, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { contentService } from '../services/contentService';
import { testService } from '../services/testService';
import { useUnlockedConcepts } from '../hooks/useUnlockedConcepts';
import { TestResult } from '../types';
import { chapters } from '../data/chapters';
import { concepts } from '../data/concepts';

function chapterTitleForConcept(conceptId: string): string {
  const concept = concepts.find(c => c.id === conceptId);
  const chapter = concept && chapters.find(c => c.id === concept.chapterId);
  return chapter?.title ?? 'محور رياضي';
}

const chapterOrderById: Record<string, number> = {};
chapters.forEach((c, idx) => { chapterOrderById[c.id] = idx; });

const conceptOrderById: Record<string, number> = {};
const conceptChapterById: Record<string, string> = {};
concepts.forEach((c) => {
  conceptOrderById[c.id] = c.order;
  conceptChapterById[c.id] = c.chapterId;
});

interface TestListItem {
  id: string;
  conceptId: string;
  title: string;
  timeLimitMinutes: number;
  totalQuestions: number;
}

export const TestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [testList, setTestList] = useState<TestListItem[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { unlockedConceptIds } = useUnlockedConcepts();

  useEffect(() => {
    Promise.all([testService.listTests(), contentService.getTestResults()])
      .then(([tests, results]) => {
        setTestList(tests);
        setTestResults(results);
      })
      .finally(() => setLoading(false));
  }, []);

  const resultsMap = React.useMemo(() => {
    const map: Record<string, { score: number; total: number }> = {};
    testResults.forEach(r => {
      map[r.testId] = { score: r.score, total: r.totalQuestions };
    });
    return map;
  }, [testResults]);

  const sortedTestList = React.useMemo(() => {
    return [...testList].sort((a, b) => {
      // Unlocked tests come first, then grouped by chapter/concept in curriculum order.
      const unlockedDiff = (unlockedConceptIds.has(b.conceptId) ? 1 : 0) - (unlockedConceptIds.has(a.conceptId) ? 1 : 0);
      if (unlockedDiff !== 0) return unlockedDiff;
      const chapterDiff =
        (chapterOrderById[conceptChapterById[a.conceptId]] ?? 0) -
        (chapterOrderById[conceptChapterById[b.conceptId]] ?? 0);
      if (chapterDiff !== 0) return chapterDiff;
      return (conceptOrderById[a.conceptId] ?? 0) - (conceptOrderById[b.conceptId] ?? 0);
    });
  }, [testList, unlockedConceptIds]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span>الاختبارات القصيرة والشاملة (Mini Tests)</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            اختبارات موقوتة لتقييم السرعة والدقة وتشخيص نقاط الضعف
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 py-12">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">جارِ تحميل الاختبارات...</span>
        </div>
      )}

      {!loading && testList.length === 0 && (
        <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400">
          لا توجد اختبارات متاحة بعد.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedTestList.map((test) => {
          const res = resultsMap[test.id];
          const isUnlocked = unlockedConceptIds.has(test.conceptId);

          if (!isUnlocked) {
            return (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 space-y-4 opacity-60 cursor-not-allowed flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                      {chapterTitleForConcept(test.conceptId)}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{test.timeLimitMinutes} دقيقة</span>
                    </div>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400">
                    {test.title}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500">
                    مقفل حتى تفتح درس هذا المفهوم أولاً
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>مقفل</span>
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={test.id}
              onClick={() => navigate(`/concept/${test.conceptId}`)}
              className="bg-white dark:bg-slate-900 hover:bg-slate-50/70 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-3xl p-6 md:p-8 space-y-5 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                    {chapterTitleForConcept(test.conceptId)}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>{test.timeLimitMinutes} دقيقة</span>
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                  {test.title}
                </h2>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                  يتكون من {test.totalQuestions} أسئلة متنوعة لتقييم تمكنك من هذا المحور.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                {res ? (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>أعلى نتيجة: {res.score} / {res.total}</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400">لم يُجرَ بعد</span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/concept/${test.conceptId}`);
                  }}
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{res ? 'إعادة الاختبار' : 'بدء الاختبار'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
