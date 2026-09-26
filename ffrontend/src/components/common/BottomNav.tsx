import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, MessageSquare, User, FileText } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 w-full flex justify-around items-center px-1 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 shadow-lg md:hidden z-40"
    >
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-medium py-1 px-2 rounded-xl transition-all ${
            isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/70 dark:bg-indigo-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span>الرئيسية</span>
      </NavLink>

      <NavLink
        to="/mathematics"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-medium py-1 px-2 rounded-xl transition-all ${
            isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/70 dark:bg-indigo-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`
        }
      >
        <BookOpen className="w-5 h-5 mb-0.5" />
        <span>الدروس</span>
      </NavLink>

      <NavLink
        to="/bac"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-medium py-1 px-2 rounded-xl transition-all ${
            isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/70 dark:bg-indigo-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`
        }
      >
        <GraduationCap className="w-5 h-5 mb-0.5" />
        <span>بكالوريا</span>
      </NavLink>

      <NavLink
        to="/tests"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-medium py-1 px-2 rounded-xl transition-all ${
            isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/70 dark:bg-indigo-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`
        }
      >
        <FileText className="w-5 h-5 mb-0.5" />
        <span>اختبارات</span>
      </NavLink>

      <NavLink
        to="/community"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-medium py-1 px-2 rounded-xl transition-all ${
            isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/70 dark:bg-indigo-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`
        }
      >
        <MessageSquare className="w-5 h-5 mb-0.5" />
        <span>المنتدى</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-medium py-1 px-2 rounded-xl transition-all ${
            isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/70 dark:bg-indigo-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`
        }
      >
        <User className="w-5 h-5 mb-0.5" />
        <span>الحساب</span>
      </NavLink>
    </nav>
  );
};
