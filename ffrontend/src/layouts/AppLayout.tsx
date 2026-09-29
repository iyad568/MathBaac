import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { contentService } from '../services/contentService';
import { UserStudyStats } from '../types';

export const AppLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userStats, setUserStats] = useState<UserStudyStats | null>(null);

  // The navbar's streak must reflect the same real backend-computed value the
  // Dashboard shows, not a stale/fake local cache read synchronously at mount.
  useEffect(() => {
    contentService.getUserStats().then(setUserStats);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-300">
      {/* Sleek Dark Slate Sidebar (Right-docked for RTL) */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area: offset by 280px on the right on md+ screens */}
      <div className="flex-1 md:mr-[280px] flex flex-col min-h-screen">
        {/* Top Header - Full Width */}
        <Header
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          streakDays={userStats?.streakDays ?? 0}
          overallProgress={userStats?.overallCourseProgress ?? 0}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-16 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
