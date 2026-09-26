import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, PlayCircle, LogOut, Mail } from 'lucide-react';
import { localStorageService } from '../services/localStorageService';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const userStats = localStorageService.getUserStats();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-full bg-indigo-600 border-2 border-indigo-700 text-white font-mono font-bold text-2xl flex items-center justify-center shadow-md">
            {authUser?.fullName ? authUser.fullName.substring(0, 2).toUpperCase() : 'AK'}
          </div>
          <div className="space-y-1 text-center sm:text-right">
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {authUser?.fullName || 'طالب بكالوريا 2025'}
            </h1>
            <p className="text-xs md:text-sm text-indigo-600 dark:text-indigo-400 font-bold">مادة الرياضيات — بكالوريا 2025</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{authUser?.email || 'student@dzbac.edu'}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">الأيام المتتالية</span>
            <span className="text-lg font-bold font-mono text-amber-700 dark:text-amber-300">{userStats.streakDays} أيام</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">التمارين</span>
            <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">{userStats.solvedExercisesCount} تمرين</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">الدقة</span>
            <span className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">{userStats.averageAccuracy}%</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/concept/chain-rule')}
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <PlayCircle className="w-4 h-4" />
              <span>مواصلة الدرس الحالي</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>تسجيل الخروج</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>تعديل الإعدادات</span>
          </button>
        </div>
      </div>
    </div>
  );
};
