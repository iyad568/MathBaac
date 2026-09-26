import React, { useCallback, useEffect, useState } from 'react';
import { Search, ShieldCheck, ShieldOff, Trash2, AlertCircle } from 'lucide-react';
import { adminService, AdminUser } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

export const UsersTab: React.FC = () => {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async (query: string) => {
    setLoading(true);
    try {
      setUsers(await adminService.listUsers(query.trim() || undefined));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تحميل المستخدمين');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => load(search), 300);
    return () => clearTimeout(timer);
  }, [search, load]);

  const run = async (id: number, action: () => Promise<unknown>) => {
    setBusyId(id);
    setError(null);
    try {
      await action();
      await load(search);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشلت العملية');
    } finally {
      setBusyId(null);
    }
  };

  const toggleAdmin = (u: AdminUser) => {
    const message = u.isAdmin
      ? `سحب صلاحيات المدير من ${u.fullName}؟`
      : `منح صلاحيات المدير إلى ${u.fullName}؟`;
    if (window.confirm(message)) run(u.id, () => adminService.updateUser(u.id, { isAdmin: !u.isAdmin }));
  };

  const remove = (u: AdminUser) => {
    if (window.confirm(`حذف الحساب "${u.fullName}" وكل بياناته نهائياً؟ لا يمكن التراجع.`)) {
      run(u.id, () => adminService.deleteUser(u.id));
    }
  };

  const isMe = (u: AdminUser) => String(u.id) === me.id;

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالاسم أو البريد..."
          className="w-full pr-9 pl-3 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
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
              <th className="px-4 py-3 font-bold">المستخدم</th>
              <th className="px-4 py-3 font-bold">الشعبة</th>
              <th className="px-4 py-3 font-bold">تاريخ التسجيل</th>
              <th className="px-4 py-3 font-bold">النشاط</th>
              <th className="px-4 py-3 font-bold">الدور</th>
              <th className="px-4 py-3 font-bold">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading && users.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">جاري التحميل...</td></tr>
            )}
            {!loading && users.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">لا يوجد مستخدمون</td></tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="text-slate-700 dark:text-slate-300">
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {u.fullName} {isMe(u) && <span className="text-[10px] text-indigo-600 dark:text-indigo-400">(أنت)</span>}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" dir="ltr">{u.email}</div>
                </td>
                <td className="px-4 py-3 text-xs">{u.stream || '—'}</td>
                <td className="px-4 py-3 text-xs">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString('ar-DZ') : '—'}
                </td>
                <td className="px-4 py-3 text-xs">
                  {u.activitiesCount} نشاط · {u.studyMinutes} د
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      u.isAdmin
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {u.isAdmin ? 'مدير' : 'طالب'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={isMe(u) || busyId === u.id}
                      onClick={() => toggleAdmin(u)}
                      title={u.isAdmin ? 'سحب صلاحيات المدير' : 'منح صلاحيات المدير'}
                      className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {u.isAdmin ? <ShieldOff className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      disabled={isMe(u) || busyId === u.id}
                      onClick={() => remove(u)}
                      title="حذف الحساب"
                      className="p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
    </div>
  );
};
