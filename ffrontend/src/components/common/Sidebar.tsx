import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Library,
  GraduationCap,
  FileText,
  Settings,
  Sparkles,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  LogOut,
  MessageSquare,
  ShieldCheck,
  X
} from 'lucide-react';
import { localStorageService } from '../../services/localStorageService';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const [libraryOpen, setLibraryOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const userStats = localStorageService.getUserStats();

  const isLibraryActive = location.pathname.startsWith('/exercises') || location.pathname.startsWith('/bac');

  const mainNavItems = [
    {
      label: 'لوحة التحكم والإحصائيات',
      to: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'الرياضيات والمحاور',
      to: '/mathematics',
      icon: BookOpen,
    },
  ];

  const additionalNavItems = [
    {
      label: 'الاختبارات القصيرة',
      to: '/tests',
      icon: FileText,
    },
  ];

  const adminNavItems = authUser?.isAdmin
    ? [{ label: 'لوحة الإدارة', to: '/admin', icon: ShieldCheck }]
    : [];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        aria-label="Sidebar"
        className={`w-[280px] bg-[#1E293B] dark:bg-slate-950 border-l border-slate-800 dark:border-slate-800 fixed top-0 right-0 h-screen flex flex-col z-50 transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Logo & Close for Mobile */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <NavLink
            to="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl font-mono">Σ</span>
            </div>
            <h1 className="text-white font-bold text-xl tracking-tight">MathBAC</h1>
          </NavLink>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            التنقل الأكاديمي (Navigation)
          </div>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    isActive
                      ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-600/25 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {/* Library Accordion */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => setLibraryOpen(!libraryOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm font-medium cursor-pointer ${
                isLibraryActive
                  ? 'bg-slate-800 text-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Library className="w-5 h-5 shrink-0" />
                <span>بنك ومكتبة التمارين</span>
              </div>
              {libraryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {libraryOpen && (
              <div className="pr-6 pl-2 space-y-1 pt-1">
                <NavLink
                  to="/bac"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-indigo-600/80 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>مكتبة البكالوريا (BAC)</span>
                </NavLink>
                <NavLink
                  to="/exercises"
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-indigo-600/80 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>بنك التمارين التدريبية</span>
                </NavLink>
              </div>
            )}
          </div>

          {additionalNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    isActive
                      ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-600/25 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {/* Community Forum Link */}
          <NavLink
            to="/community"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-600/25 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 shrink-0 text-indigo-400" />
              <span>المجتمع والأسئلة (Q&A)</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              منتدى
            </span>
          </NavLink>

          {/* Admin Section */}
          {adminNavItems.length > 0 && (
            <>
              <div className="pt-4 px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                الإدارة (Admin)
              </div>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        isActive
                          ? 'text-white bg-rose-600 shadow-lg shadow-rose-600/25 font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </>
          )}

          {/* Guide Me AI Support Card */}
          <div className="pt-4">
            <div className="p-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              المرافقة الذكية (Support)
            </div>
            <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-slate-300 font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>GUIDE ME AI</span>
                </p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  قريباً
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                مساعد الذكاء الاصطناعي لتشخيص الأخطاء الحسابية وتوجيهك خطوة بخطوة.
              </p>
            </div>
          </div>
        </nav>

        {/* User Profile & Auth Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              navigate(authUser?.isLoggedIn ? '/profile' : '/auth');
            }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {authUser?.isLoggedIn ? authUser.fullName.substring(0, 2).toUpperCase() : 'Σ'}
            </div>
            <div className="flex-1 overflow-hidden min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {authUser?.isLoggedIn ? authUser.fullName : 'تسجيل الدخول'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {authUser?.isLoggedIn ? authUser.email : 'اضغط للدخول بالبريد'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              type="button"
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors py-1 px-2 rounded-md hover:bg-rose-950/30 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>الخروج</span>
            </button>

            <NavLink
              to="/settings"
              onClick={onCloseMobile}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-slate-800"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>الإعدادات</span>
            </NavLink>

            <button
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                navigate('/concept/chain-rule');
              }}
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium py-1 px-2 rounded-md hover:bg-indigo-950/40 cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>الدرس</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
