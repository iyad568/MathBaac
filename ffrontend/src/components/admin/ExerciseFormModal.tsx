import React, { useRef, useState } from 'react';
import { X, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { adminService, ExerciseDetail, ExerciseInput, ExerciseType, Difficulty } from '../../services/adminService';
import { chapters } from '../../data/chapters';
import { concepts } from '../../data/concepts';
import { MathContentRenderer } from '../community/MathContentRenderer';

interface Props {
  exercise: ExerciseDetail | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  chapter_id: string;
  concept_id: string;
  exercise_type: ExerciseType;
  title: string;
  content: string;
  solution: string;
  difficulty: Difficulty | '';
  estimated_minutes: string;
  points: string;
  bac_year: string;
  bac_session: 'Normal' | 'Rattrapage' | '';
  bac_stream: string;
}

const toForm = (e: ExerciseDetail | null): FormState => ({
  chapter_id: e?.chapter_id ?? chapters[0]?.id ?? '',
  concept_id: e?.concept_id ?? '',
  exercise_type: e?.exercise_type ?? 'exercise',
  title: e?.title ?? '',
  content: e?.content ?? '',
  solution: e?.solution ?? '',
  difficulty: e?.difficulty ?? '',
  estimated_minutes: e?.estimated_minutes?.toString() ?? '',
  points: e?.points?.toString() ?? '',
  bac_year: e?.bac_year?.toString() ?? '',
  bac_session: e?.bac_session ?? '',
  bac_stream: e?.bac_stream ?? '',
});

const num = (value: string): number | null => (value.trim() === '' ? null : Number(value));

const inputClass =
  'w-full px-3 py-2 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40';
const labelClass = 'block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1';

export const ExerciseFormModal: React.FC<Props> = ({ exercise, onClose, onSaved }) => {
  const [form, setForm] = useState<FormState>(() => toForm(exercise));
  const [saving, setSaving] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractNote, setExtractNote] = useState<{ text: string; warning: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const chapterConcepts = concepts.filter((c) => c.chapterId === form.chapter_id);
  const isBac = form.exercise_type === 'bac';

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setExtracting(true);
    setError(null);
    setExtractNote(null);
    try {
      const result = await adminService.extractText(file);
      if (result.text) {
        set('content', form.content ? `${form.content}\n\n${result.text}` : result.text);
      }
      setExtractNote({
        text: result.warning ?? `تم استخراج النص من ${result.filename}${result.page_count ? ` (${result.page_count} صفحة)` : ''}. راجعه وصحّح الصيغ الرياضية.`,
        warning: Boolean(result.warning),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر استخراج النص');
    } finally {
      setExtracting(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content.trim()) {
      setError('نص التمرين مطلوب');
      return;
    }
    const payload: ExerciseInput = {
      chapter_id: form.chapter_id,
      concept_id: form.concept_id || null,
      exercise_type: form.exercise_type,
      title: form.title.trim() || null,
      content: form.content,
      solution: form.solution.trim() ? form.solution : null,
      difficulty: form.difficulty || null,
      estimated_minutes: num(form.estimated_minutes),
      points: num(form.points),
      bac_year: isBac ? num(form.bac_year) : null,
      bac_session: isBac ? form.bac_session || null : null,
      bac_stream: isBac ? form.bac_stream.trim() || null : null,
    };
    setSaving(true);
    setError(null);
    try {
      if (exercise) await adminService.updateExercise(exercise.id, payload);
      else await adminService.createExercise(payload);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل الحفظ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-start justify-center overflow-y-auto p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-3xl my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {exercise ? 'تعديل التمرين' : 'إضافة تمرين جديد'}
          </h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" aria-label="إغلاق">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl text-xs flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>النوع</label>
            <select className={inputClass} value={form.exercise_type} onChange={(e) => set('exercise_type', e.target.value as ExerciseType)}>
              <option value="exercise">تمرين</option>
              <option value="bac">مسألة بكالوريا</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>الصعوبة</label>
            <select className={inputClass} value={form.difficulty} onChange={(e) => set('difficulty', e.target.value as Difficulty | '')}>
              <option value="">— غير محددة —</option>
              <option value="easy">سهل</option>
              <option value="medium">متوسط</option>
              <option value="hard">صعب</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>المحور</label>
            <select
              className={inputClass}
              value={form.chapter_id}
              onChange={(e) => setForm((prev) => ({ ...prev, chapter_id: e.target.value, concept_id: '' }))}
            >
              {chapters.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>المفهوم (اختياري)</label>
            <select className={inputClass} value={form.concept_id} onChange={(e) => set('concept_id', e.target.value)}>
              <option value="">— بدون —</option>
              {chapterConcepts.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>العنوان (اختياري)</label>
            <input className={inputClass} value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>المدة التقديرية (دقائق)</label>
            <input type="number" min="0" className={inputClass} value={form.estimated_minutes} onChange={(e) => set('estimated_minutes', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>النقاط</label>
            <input type="number" min="0" step="0.5" className={inputClass} value={form.points} onChange={(e) => set('points', e.target.value)} />
          </div>
        </div>

        {isBac && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50">
            <div>
              <label className={labelClass}>سنة البكالوريا</label>
              <input type="number" min="1990" max="2100" className={inputClass} value={form.bac_year} onChange={(e) => set('bac_year', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>الدورة</label>
              <select className={inputClass} value={form.bac_session} onChange={(e) => set('bac_session', e.target.value as FormState['bac_session'])}>
                <option value="">—</option>
                <option value="Normal">عادية</option>
                <option value="Rattrapage">استدراكية</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>الشعبة</label>
              <input className={inputClass} value={form.bac_stream} onChange={(e) => set('bac_stream', e.target.value)} />
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className={labelClass + ' mb-0'}>نص التمرين (يدعم LaTeX داخل $...$)</label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={extracting}
              className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 cursor-pointer"
            >
              {extracting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>استخراج النص من ملف (PDF / DOCX / TXT)</span>
            </button>
            <input ref={fileRef} type="file" accept=".pdf,.docx,.txt,.md" className="hidden" onChange={handleFile} />
          </div>
          {extractNote && (
            <p className={`text-xs mb-2 ${extractNote.warning ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
              {extractNote.text}
            </p>
          )}
          <textarea
            dir="auto"
            rows={8}
            className={inputClass + ' font-mono'}
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
          />
          {form.content.trim() && (
            <div dir="auto" className="mt-2 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-800 dark:text-slate-200">
              <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">معاينة</span>
              <MathContentRenderer content={form.content} />
            </div>
          )}
        </div>

        <div>
          <label className={labelClass}>الحل / التصحيح (اختياري)</label>
          <textarea dir="auto" rows={5} className={inputClass + ' font-mono'} value={form.solution} onChange={(e) => set('solution', e.target.value)} />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
            إلغاء
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white flex items-center gap-2 cursor-pointer"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{exercise ? 'حفظ التعديلات' : 'إضافة التمرين'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
