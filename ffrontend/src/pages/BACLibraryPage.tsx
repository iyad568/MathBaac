import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Clock, PlayCircle, ArrowLeft, Search, Filter, CheckCircle2, Lock } from 'lucide-react';
import { contentService } from '../services/contentService';
import { useUnlockedConcepts } from '../hooks/useUnlockedConcepts';
import { useNextConcept } from '../hooks/useNextConcept';
import { MathRenderer } from '../components/common/MathRenderer';
import { BACExercise, StudentBACAttempt, Chapter, Concept } from '../types';

export const BACLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { unlockedConceptIds } = useUnlockedConcepts();
  const { nextConcept } = useNextConcept();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const [bacExercisesList, setBacExercisesList] = useState<BACExercise[]>([]);
  const [bacAttempts, setBacAttempts] = useState<StudentBACAttempt[]>([]);
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);
  const [conceptsList, setConceptsList] = useState<Concept[]>([]);

  useEffect(() => {
    contentService.getBACExercises().then(setBacExercisesList);
    contentService.getBACAttempts().then(setBacAttempts);
    contentService.getChapters().then(setChaptersList);
    contentService.getConcepts().then(setConceptsList);
  }, []);

  const chapterOrder = useMemo(() => {
    const map: Record<string, number> = {};
    chaptersList.forEach((c, idx) => { map[c.id] = idx; });
    return map;
  }, [chaptersList]);

  const conceptOrder = useMemo(() => {
    const map: Record<string, number> = {};
    conceptsList.forEach(c => { map[c.id] = c.order; });
    return map;
  }, [conceptsList]);

  const attemptsMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    bacAttempts.forEach(a => {
      if (a.completed) map[a.bacExerciseId] = true;
    });
    return map;
  }, [bacAttempts]);

  const uniqueYears = useMemo(() => {
    const years: number[] = Array.from(new Set(bacExercisesList.map(b => b.year)));
    return years.sort((a: number, b: number) => b - a);
  }, [bacExercisesList]);

  const chapterNameMap: Record<string, string> = {
    'derivatives': 'الاشتقاقية والاستمرارية',
    'exponential-logarithmic': 'الدالتان الأسية واللوغاريتمية',
    'limits': 'النهايات والسلوك التقاربي',
  };

  const chaptersFilterList = useMemo(() => [
    { id: 'all', label: 'جميع المحاور', count: bacExercisesList.length },
    { id: 'derivatives', label: 'الاشتقاقية والاستمرارية', count: bacExercisesList.filter(b => b.chapterId === 'derivatives').length },
    { id: 'exponential-logarithmic', label: 'الدالتان الأسية واللوغاريتمية', count: bacExercisesList.filter(b => b.chapterId === 'exponential-logarithmic').length },
    { id: 'limits', label: 'النهايات والسلوك التقاربي', count: bacExercisesList.filter(b => b.chapterId === 'limits').length },
  ], [bacExercisesList]);

  const streams = [
    { id: 'all', label: 'جميع الشُعب' },
    { id: 'شعبة العلوم التجريبية', label: 'العلوم التجريبية' },
    { id: 'شعبة الرياضيات', label: 'الرياضيات' },
    { id: 'شعبة تقني رياضي', label: 'تقني رياضي' },
  ];

  const filtered = useMemo(() => {
    return bacExercisesList
      .filter((bac: BACExercise) => {
        if (selectedChapter !== 'all' && bac.chapterId !== selectedChapter) return false;
        if (selectedYear !== 'all' && bac.year.toString() !== selectedYear) return false;
        if (selectedStream !== 'all' && !bac.stream.includes(selectedStream.replace('شعبة ', ''))) return false;
        if (statusFilter === 'completed' && !attemptsMap[bac.id]) return false;
        if (statusFilter === 'pending' && attemptsMap[bac.id]) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = bac.title.toLowerCase().includes(q);
          const matchesQuestion = bac.question.toLowerCase().includes(q);
          const matchesYear = bac.year.toString().includes(q);
          const matchesStream = bac.stream.toLowerCase().includes(q);
          const matchesChapter = (chapterNameMap[bac.chapterId] || '').toLowerCase().includes(q);
          return matchesTitle || matchesQuestion || matchesYear || matchesStream || matchesChapter;
        }
        return true;
      })
      .sort((a, b) => {
        // Unlocked problems come first, then grouped by chapter/concept in curriculum order.
        const unlockedDiff = (unlockedConceptIds.has(b.conceptId) ? 1 : 0) - (unlockedConceptIds.has(a.conceptId) ? 1 : 0);
        if (unlockedDiff !== 0) return unlockedDiff;
        const chapterDiff = (chapterOrder[a.chapterId] ?? 0) - (chapterOrder[b.chapterId] ?? 0);
        if (chapterDiff !== 0) return chapterDiff;
        const conceptDiff = (conceptOrder[a.conceptId] ?? 0) - (conceptOrder[b.conceptId] ?? 0);
        if (conceptDiff !== 0) return conceptDiff;
        return b.year - a.year;
      });
  }, [bacExercisesList, selectedChapter, selectedYear, selectedStream, statusFilter, searchQuery, attemptsMap, unlockedConceptIds, chapterOrder, conceptOrder]);

  const completedCount = Object.keys(attemptsMap).length;
  const totalPoints = bacExercisesList.reduce((acc, b) => acc + (b.points || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
              الأرشيف الوزاري الكامل (2014 - 2026)
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              {bacExercisesList.length} دورات رسمية ومقترحة
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span>أرشيف ومكتبة مواضيع البكالوريا الرسمية</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            مواضيع شهادة البكالوريا الجزائرية مصنفة من دورة 2014 إلى دورة 2026 مع سلم التنقيط الوزاري النموذجي
          </p>
        </div>

        <button
          onClick={() => navigate(nextConcept ? `/concept/${nextConcept.concept.id}?section=bac#bac-section` : '/mathematics')}
          disabled={nextConcept === undefined}
          className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer self-start md:self-auto"
        >
          <PlayCircle className="w-4 h-4" />
          <span>تطبيق بكالوريا المفهوم الحالي</span>
        </button>
      </div>

      {/* Stats Quick Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400">سنوات الأرشيف</div>
          <div className="text-lg md:text-xl font-extrabold text-indigo-700 dark:text-indigo-300 font-mono mt-0.5">2014 - 2026</div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400">إجمالي المواضيع</div>
          <div className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-0.5">{bacExercisesList.length} موضوعاً</div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400">المواضيع المنجزة</div>
          <div className="text-lg md:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">{completedCount} من {bacExercisesList.length}</div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400">مجموع النقاط الوزارية</div>
          <div className="text-lg md:text-xl font-extrabold text-amber-700 dark:text-amber-300 font-mono mt-0.5">{totalPoints.toFixed(1)} نقطة</div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في مواضيع البكالوريا، السنوات (مثلاً: 2026، 2020، 2014)، أو الكلمات المفتاحية..."
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl pr-10 pl-4 py-2.5 text-xs md:text-sm outline-none transition-all"
          />
        </div>

        {/* Chapter Filter Pills */}
        <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-700">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>تصفية حسب المحور الوزاري:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {chaptersFilterList.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  selectedChapter === ch.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{ch.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedChapter === ch.id ? 'bg-white/20 dark:bg-slate-900/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {ch.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Year Pills Bar */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>تصفية حسب السنة (من 2014 إلى 2026):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedYear === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              جميع السنوات ({bacExercisesList.length})
            </button>
            {uniqueYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr.toString())}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                  selectedYear === yr.toString()
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Stream & Status Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">الشعبة:</span>
            {streams.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStream(s.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedStream === s.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">الحالة:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              المنجزة
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              المتبقية
            </button>
          </div>
        </div>
      </div>

      {/* BAC Items Grid */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-3">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">لم يتم العثور على مواضيع مطابقة</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              جرب تغيير معايير البحث أو اختيار سنة أخرى من أرشيف البكالوريا
            </p>
            <button
              onClick={() => {
                setSelectedChapter('all');
                setSelectedYear('all');
                setSelectedStream('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
            >
              إعادة تعيين جميع الفلاتر
            </button>
          </div>
        ) : (
          filtered.map((bac: BACExercise) => {
            const isDone = attemptsMap[bac.id];
            const isUnlocked = unlockedConceptIds.has(bac.conceptId);

            if (!isUnlocked) {
              return (
                <div
                  key={bac.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 space-y-4 opacity-60 cursor-not-allowed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <Lock className="w-5 h-5" />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-md font-mono">
                            {bac.year}
                          </span>
                          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                            {chapterNameMap[bac.chapterId] || bac.chapterId}
                          </span>
                        </div>
                        <h2 className="font-bold text-base md:text-lg text-slate-500 dark:text-slate-400 mt-1.5">
                          {bac.title}
                        </h2>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                      <Lock className="w-3.5 h-3.5" />
                      <span>مقفل حتى تفتح درس هذا المفهوم أولاً</span>
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={bac.id}
                onClick={() => navigate(`/concept/${bac.conceptId}?section=bac&bacId=${bac.id}#bac-section`)}
                className={`bg-white dark:bg-slate-900 hover:bg-slate-50/80 border rounded-3xl p-6 md:p-8 space-y-5 transition-all cursor-pointer group shadow-xs ${
                  isDone ? 'border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-300 dark:hover:border-emerald-700' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-12 h-12 rounded-2xl font-bold text-sm flex items-center justify-center font-mono border ${
                      isDone
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50'
                    }`}>
                      BAC
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold bg-indigo-600 text-white px-2.5 py-0.5 rounded-md font-mono">
                          {bac.year}
                        </span>
                        <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/60">
                          {bac.stream}
                        </span>
                        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                          {chapterNameMap[bac.chapterId] || bac.chapterId}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-700">
                          الدورة: {bac.session === 'Normal' ? 'العادية' : 'الاستدراكية'}
                        </span>
                      </div>
                      <h2 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors mt-1.5">
                        {bac.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-3 py-1 rounded-xl">
                      {bac.points} نقاط
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{bac.estimatedMinutes} دقيقة</span>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs md:text-sm text-slate-800 dark:text-slate-100 line-clamp-3 whitespace-pre-line leading-relaxed">
                  {bac.question}
                </div>

                {bac.questionMath && (
                  <div className="bg-slate-100/70 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono">
                    <MathRenderer math={bac.questionMath} />
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    يتضمن {bac.subQuestions?.length ?? 0} أسئلة فرعية مع سلم التنقيط الوزاري
                  </span>

                  <div className="flex items-center gap-3">
                    {isDone && (
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>مكتمل ومراجع</span>
                      </span>
                    )}

                    <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 group-hover:underline">
                      <span>{isDone ? 'مراجعة الحل وسلّم التنقيط' : 'فتح المسألة والتصحيح النموذجي'}</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
