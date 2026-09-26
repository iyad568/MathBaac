import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import { chapters } from '../data/chapters';
import { concepts } from '../data/concepts';
import { localStorageService } from '../services/localStorageService';

export const ChapterDetailPage: React.FC = () => {
  const { chapterId = 'derivatives' } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();

  const chapter = chapters.find(c => c.id === chapterId) || chapters[0];
  const chapterConcepts = concepts.filter(c => c.chapterId === chapter.id);
  const allProgress = localStorageService.getAllConceptProgress();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/mathematics')}
        className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة إلى جميع المحاور</span>
      </button>

      {/* Chapter Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {chapter.semester && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                  السداسي {chapter.semester}
                </span>
              )}
              {chapter.month && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  شهر {chapter.month}
                </span>
              )}
              {chapter.weeks && (
                <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-medium">
                  {chapter.weeks}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {chapter.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {chapter.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center min-w-[110px]">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">الدروس / المفاهيم</span>
              <span className="text-xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">{chapterConcepts.length}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center min-w-[110px]">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">الحجم الساعي</span>
              <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-slate-100">{chapter.totalWeeklyHours || chapter.estimatedHours} س</span>
            </div>
          </div>
        </div>
      </div>


      {/* Concepts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>المفاهيم التعليمية المتسلسلة في هذا المحور:</span>
          </h2>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            اتبع الترتيب المقترح للتعلم المنهجي
          </span>
        </div>

        <div className="space-y-4">
          {chapterConcepts.map((concept) => {
            const prog = allProgress[concept.id];
            const percent = prog?.overallPercentage || (concept.id === 'chain-rule' ? 24 : 0);
            const isCompleted = percent >= 80;

            return (
              <div
                key={concept.id}
                onClick={() => navigate(`/concept/${concept.id}`)}
                className="bg-white dark:bg-slate-900 hover:bg-slate-50/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-2xl p-5 md:p-6 space-y-4 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-base flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/50">
                      0{concept.order}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                          {concept.title}
                        </h3>
                        {concept.weekDate && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            الأسبوع {concept.weekNumber}: {concept.weekDate}
                          </span>
                        )}
                        {concept.officialHours && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                            {concept.officialHours} ساعات رسمية
                          </span>
                        )}
                        {concept.id === 'chain-rule' && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                            درس نشط
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{concept.estimatedMinutes} دقيقة</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/concept/${concept.id}`);
                      }}
                      className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{isCompleted ? 'مراجعة الدرس' : 'بدء التعلم'}</span>
                    </button>
                  </div>
                </div>

                {/* Progress bar inside concept */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{percent}%</span>
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    {isCompleted ? (
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> تم الإنجاز
                      </span>
                    ) : (
                      <span>
                        {chapter.bacExercisesCount > 0
                          ? 'درس + كويز + تمارين + بكالوريا'
                          : 'درس + كويز + تمارين تدريبية'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
