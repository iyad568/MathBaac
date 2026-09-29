import React, { useState } from 'react';
import { Settings, RotateCcw, Loader2 } from 'lucide-react';
import { contentService } from '../services/contentService';

export const SettingsPage: React.FC = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const handleResetData = async () => {
    if (!window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط كافة بيانات التقدم إلى 0؟ لا يمكن التراجع عن هذا الإجراء.')) {
      return;
    }
    setResetError(null);
    setIsResetting(true);
    try {
      await contentService.resetAllProgress();
      window.location.reload();
    } catch {
      setResetError('تعذّرت إعادة الضبط. تحقق من اتصالك بالإنترنت وحاول مجدداً.');
      setIsResetting(false);
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
          إعادة ضبط كافة نسب التقدم إلى 0%
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          حذف كل الدروس المكتملة والكويزات والتمارين ومسائل البكالوريا والاختبارات القصيرة المُنجزة، لتبدأ من الصفر. هذا الإجراء نهائي ولا يمكن التراجع عنه.
        </p>
        {resetError && (
          <p className="text-xs font-bold text-rose-700 dark:text-rose-300">{resetError}</p>
        )}
        <button
          onClick={handleResetData}
          disabled={isResetting}
          className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
        >
          {isResetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
          <span>{isResetting ? 'جارِ إعادة الضبط...' : 'إعادة ضبط كافة البيانات إلى 0'}</span>
        </button>
      </div>
    </div>
  );
};
