import React from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import { localStorageService } from '../services/localStorageService';

export const SettingsPage: React.FC = () => {
  const handleResetData = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط كافة بيانات التقدم والتمارين المحلولة؟')) {
      localStorageService.resetAllData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span>الإعدادات</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          إدارة البيانات المخزنة
        </p>
      </div>

      {/* Danger Zone / Reset */}
      <div className="bg-rose-50/50 dark:bg-rose-900/20 rounded-3xl border border-rose-200 dark:border-rose-800/60 p-6 space-y-4">
        <h2 className="text-base font-bold text-rose-800 dark:text-rose-300">
          إعادة ضبط وتصفير البيانات المحلية
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          تفريغ الذاكرة المحلية وإعادة تهيئة التمارين والكويزات من البداية للاختبار والتجريب.
        </p>
        <button
          onClick={handleResetData}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة ضبط كافة البيانات</span>
        </button>
      </div>
    </div>
  );
};
