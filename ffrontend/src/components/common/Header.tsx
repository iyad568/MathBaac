import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, Menu, PlayCircle, Flame, ChevronLeft, ChevronRight, Moon, Sun, TrendingUp, Award, Target } from 'lucide-react';
import { localStorageService } from '../../services/localStorageService';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  streakDays?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, streakDays = 4 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const userStats = localStorageService.getUserStats();
  const allProgress = localStorageService.getAllConceptProgress();
  const currentProgress = userStats?.overallCourseProgress ?? 35;
  
  // Animation for progress bar
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(currentProgress);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentProgress]);

  // Calculate streak status
  const getStreakStatus = () => {
    if (streakDays >= 30) return { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-700', label: '🔥 نار!' };
    if (streakDays >= 14) return { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30', border: 'border-orange-200 dark:border-orange-700', label: '⚡ قوي' };
    if (streakDays >= 7) return { color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-700', label: '💪 ممتاز' };
    return { color: 'text-amber-800 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-700/50', label: '' };
  };

  const streakStatus = getStreakStatus();

  return (
    <header className="h-16 md:h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-3 md:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-sm dark:shadow-slate-950/50 transition-colors duration-300 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 w-full">
      {/* Mobile Menu Button & Theme Toggle (Pinned to start in mobile) */}
      <div className="flex items-center gap-2 md:hidden shrink-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          aria-label="القائمة"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Theme Toggle Button - Mobile */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          aria-label={theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Desktop: Logo/Brand Area (Left side) */}
      <div className="hidden md:flex items-center gap-3 shrink-0">
        <NavLink to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-lg font-mono">Σ</span>
          </div>
          <h1 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">MathBAC</h1>
        </NavLink>
      </div>

      {/* Centered Controls Container: Progress, Streak, Continue Lesson, Profile */}
      <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 flex-wrap px-2 md:px-4">
        {/* Total Progress Widget - Enhanced */}
        <div className="group relative flex items-center gap-2.5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 border border-slate-200/80 dark:border-slate-700 px-3 md:px-4 py-2 md:py-2.5 rounded-2xl transition-all hover:shadow-md hover:scale-105 cursor-pointer"
          onClick={() => navigate('/dashboard')}
          title="انقر لعرض الإحصائيات الكاملة"
        >
          <div className="flex items-center gap-2">
            <div className="hidden md:flex w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 items-center justify-center">
              <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-right">
              <p className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider leading-tight">
                التقدم الكلي
              </p>
              <p className="text-sm md:text-base font-extrabold font-mono text-slate-900 dark:text-slate-100 leading-tight">
                {currentProgress}%
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-20 sm:w-28 md:w-36 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
            {currentProgress >= 50 && (
              <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold text-center animate-pulse">
                نصف الطريق! 🎯
              </span>
            )}
          </div>
        </div>

        {/* Streak Days - Enhanced with Status */}
        <div className={`group relative flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-2xl ${streakStatus.bg} border ${streakStatus.border} ${streakStatus.color} text-xs md:text-sm font-bold transition-all hover:shadow-md hover:scale-105 cursor-pointer`}
          onClick={() => navigate('/dashboard')}
          title="سجل الأيام المتتالية"
        >
          <Flame className={`w-5 h-5 ${streakStatus.color} fill-current shrink-0 animate-pulse`} />
          <div className="flex flex-col items-center">
            <span className="font-mono text-lg md:text-xl font-extrabold leading-none">{streakDays}</span>
            <span className="text-[9px] md:text-[10px] leading-none">يوم متتالي</span>
          </div>
          {streakStatus.label && (
            <span className="hidden md:inline text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/50 dark:bg-slate-900/30">
              {streakStatus.label}
            </span>
          )}
        </div>

        {/* Continue Lesson Button - Enhanced */}
        <button
          type="button"
          onClick={() => navigate('/concept/chain-rule')}
          className="hidden sm:flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 dark:from-indigo-500 dark:to-indigo-600 dark:hover:from-indigo-600 dark:hover:to-indigo-700 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-2xl text-xs md:text-sm font-bold shadow-lg shadow-indigo-600/30 dark:shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-xl cursor-pointer group"
        >
          <PlayCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
          <span>متابعة الدرس</span>
          <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Theme Toggle Button - Desktop - Enhanced */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-all hover:scale-110 shadow-sm"
          aria-label={theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
          title={theme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 transition-transform hover:rotate-12" />
          ) : (
            <Sun className="w-5 h-5 transition-transform hover:rotate-90" />
          )}
        </button>

        {/* User Profile - Enhanced */}
        <NavLink
          to={authUser?.isLoggedIn ? '/profile' : '/auth'}
          className="group relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/30 dark:hover:to-indigo-800/30 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:scale-110 shrink-0"
          title={authUser?.isLoggedIn ? authUser.fullName : 'تسجيل الدخول'}
        >
          {authUser?.isLoggedIn && authUser.fullName ? (
            <>
              <span className="font-bold text-sm md:text-base font-mono text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                {authUser.fullName.substring(0, 2).toUpperCase()}
              </span>
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
            </>
          ) : (
            <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          )}
        </NavLink>
      </div>

      {/* Desktop: Right Side Actions */}
      <div className="hidden md:flex items-center gap-3 shrink-0">
        {/* Notifications Button (Optional) */}
        <button
          className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
          title="الإشعارات"
        >
          <Bell className="w-5 h-5" />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};
