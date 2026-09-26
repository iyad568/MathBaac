import React, { useState, useEffect } from 'react';
import { X, Cloud, CloudOff, RefreshCw, Check, AlertCircle, Loader } from 'lucide-react';
import { syncService } from '../../services/syncService';
import { useAuth } from '../../context/AuthContext';

interface MigrationModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export const MigrationModal: React.FC<MigrationModalProps> = ({ onClose, onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'prompt' | 'migrating' | 'success' | 'error'>('prompt');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleMigrate = async () => {
    if (!user?.isLoggedIn) {
      setErrorMessage('يجب تسجيل الدخول أولاً');
      setStep('error');
      return;
    }

    setStep('migrating');
    setProgress(0);
    setMessage('جاري التحضير...');

    const result = await syncService.migrateToBackend((msg, percent) => {
      setMessage(msg);
      setProgress(percent);
    });

    if (result.success) {
      setStep('success');
      setMessage(result.message);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setStep('error');
      setErrorMessage(result.message);
    }
  };

  const handleSkip = () => {
    // Mark as skipped so we don't show this again
    localStorage.setItem('dzbac_migration_skipped_v1', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        {step === 'prompt' && (
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Prompt Step */}
        {step === 'prompt' && (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              نقل البيانات إلى السحابة
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              احفظ تقدمك في السحابة للوصول إليه من أي جهاز. لن تفقد بياناتك أبداً!
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 text-right">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 rounded-lg p-1.5 mt-0.5">
                  <Cloud className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    المميزات
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>✓ الوصول من أي جهاز</li>
                    <li>✓ نسخ احتياطي تلقائي</li>
                    <li>✓ مزامنة فورية</li>
                    <li>✓ لن تفقد بياناتك</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors"
              >
                لاحقاً
              </button>
              <button
                onClick={handleMigrate}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                نقل الآن
              </button>
            </div>
          </div>
        )}

        {/* Migrating Step */}
        {step === 'migrating' && (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-pulse">
              <Loader className="w-8 h-8 text-white animate-spin" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              جاري النقل...
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {message}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {progress}%
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              الرجاء عدم إغلاق الصفحة...
            </p>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Check className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              تم النقل بنجاح! ✓
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {message}
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                بياناتك الآن محفوظة في السحابة ومتاحة من أي جهاز 🎉
              </p>
            </div>
          </div>
        )}

        {/* Error Step */}
        {step === 'error' && (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              فشل النقل
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {errorMessage}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleMigrate}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                إعادة المحاولة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Hook to check if migration modal should be shown
 */
export const useMigrationCheck = () => {
  const { user } = useAuth();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Only check if user is logged in
    if (!user?.isLoggedIn) {
      setShouldShow(false);
      return;
    }

    // Don't show if already migrated or skipped
    const migrationCompleted = localStorage.getItem('dzbac_migration_completed_v1');
    const migrationSkipped = localStorage.getItem('dzbac_migration_skipped_v1');
    
    if (migrationCompleted || migrationSkipped) {
      setShouldShow(false);
      return;
    }

    // Check if migration is needed
    const needsMigration = syncService.needsMigration();
    setShouldShow(needsMigration);
  }, [user?.isLoggedIn]);

  return shouldShow;
};
