import React, { useEffect, useState } from 'react';
import { ShieldCheck, Users, ClipboardList, LayoutDashboard, UserPlus, Activity, MessageSquare, GraduationCap } from 'lucide-react';
import { adminService, AdminStats } from '../services/adminService';
import { UsersTab } from '../components/admin/UsersTab';
import { ExercisesTab } from '../components/admin/ExercisesTab';

type Tab = 'overview' | 'users' | 'exercises';

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
  { key: 'users', label: 'المستخدمون', icon: Users },
  { key: 'exercises', label: 'التمارين', icon: ClipboardList },
];

const Overview: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminService.getStats().then(setStats).catch((err) => setError(err instanceof Error ? err.message : 'تعذر تحميل الإحصائيات'));
  }, []);

  if (error) return <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>;
  if (!stats) return <p className="text-sm text-slate-500 dark:text-slate-400">جاري التحميل...</p>;

  const cards = [
    { label: 'إجمالي المستخدمين', value: stats.totalUsers, icon: Users },
    { label: 'المدراء', value: stats.totalAdmins, icon: ShieldCheck },
    { label: 'مسجلون آخر 7 أيام', value: stats.newUsersLast7Days, icon: UserPlus },
    { label: 'التمارين', value: stats.totalExercises, icon: ClipboardList },
    { label: 'مسائل البكالوريا', value: stats.totalBacExercises, icon: GraduationCap },
    { label: 'الأنشطة المسجلة', value: stats.totalActivities, icon: Activity },
    { label: 'منشورات المجتمع', value: stats.totalCommunityPosts, icon: MessageSquare },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>{label}</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">{value}</div>
        </div>
      ))}
    </div>
  );
};

export const AdminPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span>لوحة الإدارة</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          إدارة المستخدمين ومحتوى المنصة
        </p>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-bold flex items-center gap-2 border-b-2 -mb-px transition-colors cursor-pointer ${
              tab === key
                ? 'border-indigo-600 text-indigo-700 dark:border-indigo-400 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {tab === 'overview' && <Overview />}
      {tab === 'users' && <UsersTab />}
      {tab === 'exercises' && <ExercisesTab />}
    </div>
  );
};
