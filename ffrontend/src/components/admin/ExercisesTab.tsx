import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import {
  adminService,
  ExerciseDetail,
  ExerciseListItem,
  ExerciseType,
} from '../../services/adminService';
import { chapters } from '../../data/chapters';
import { ExerciseFormModal } from './ExerciseFormModal';

const DIFFICULTY_LABEL = { easy: 'سهل', medium: 'متوسط', hard: 'صعب' } as const;

export const ExercisesTab: React.FC = () => {
  const [items, setItems] = useState<ExerciseListItem[]>([]);
  const [filter, setFilter] = useState<ExerciseType | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ExerciseDetail | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await adminService.listExercises(filter || undefined));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تحميل التمارين');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = async (id: number) => {
    try {
      setEditing(await adminService.getExercise(id));
      setFormOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر فتح التمرين');
    }
  };

  const remove = async (item: ExerciseListItem) => {
    if (!window.confirm(`حذف التمرين #${item.id} نهائياً؟`)) return;
    try {
      await adminService.deleteExercise(item.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل الحذف');
    }
  };

  const chapterTitle = (id: string) => chapters.find((c) => c.id === id)?.title ?? id;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as ExerciseType | '')}
          className="px-3 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          <option value="">كل الأنواع</option>
          <option value="exercise">تمارين</option>
          <option value="bac">مسائل البكالوريا</option>
        </select>
        <button
          type="button"
          onClick={openCreate}
          className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة تمرين</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl text-xs flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-bold">#</th>
              <th className="px-4 py-3 font-bold">العنوان</th>
              <th className="px-4 py-3 font-bold">المحور</th>
              <th className="px-4 py-3 font-bold">النوع</th>
              <th className="px-4 py-3 font-bold">الصعوبة</th>
              <th className="px-4 py-3 font-bold">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading && items.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">جاري التحميل...</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">لا توجد تمارين بعد. أضف أول تمرين.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="text-slate-700 dark:text-slate-300">
                <td className="px-4 py-3 font-mono text-xs" dir="ltr">
                  {item.id}
                  {item.external_id && (
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">{item.external_id}</span>
                  )}
                </td>
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                  {item.title || `تمرين #${item.id}`}
                  {item.exercise_type === 'bac' && item.bac_year && (
                    <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400">
                      بكالوريا {item.bac_year} {item.bac_session === 'Rattrapage' ? '· استدراكية' : item.bac_session ? '· عادية' : ''}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">{chapterTitle(item.chapter_id)}</td>
                <td className="px-4 py-3 text-xs">{item.exercise_type === 'bac' ? 'بكالوريا' : 'تمرين'}</td>
                <td className="px-4 py-3 text-xs">{item.difficulty ? DIFFICULTY_LABEL[item.difficulty] : '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEdit(item.id)}
                      title="تعديل"
                      className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(item)}
                      title="حذف"
                      className="p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <ExerciseFormModal
          exercise={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            load();
          }}
        />
      )}
    </div>
  );
};
