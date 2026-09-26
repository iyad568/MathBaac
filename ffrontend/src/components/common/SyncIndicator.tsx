import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff, RefreshCw, Check } from 'lucide-react';
import { syncService } from '../../services/syncService';

export const SyncIndicator: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState(syncService.getSyncStatus());
  const [showTooltip, setShowTooltip] = useState(false);
  const [isManualSyncing, setIsManualSyncing] = useState(false);

  useEffect(() => {
    // Update sync status every 5 seconds
    const interval = setInterval(() => {
      setSyncStatus(syncService.getSyncStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleManualSync = async () => {
    if (!syncStatus.canSync || isManualSyncing) return;
    
    setIsManualSyncing(true);
    await syncService.forceSyncNow();
    setSyncStatus(syncService.getSyncStatus());
    setIsManualSyncing(false);
  };

  // Don't show if offline and no queue
  if (!syncStatus.isOnline && syncStatus.queueLength === 0) {
    return null;
  }

  const getStatusColor = () => {
    if (!syncStatus.isOnline) return 'text-slate-400 dark:text-slate-500';
    if (syncStatus.isSyncing || isManualSyncing) return 'text-blue-500 dark:text-blue-400';
    if (syncStatus.queueLength > 0) return 'text-amber-500 dark:text-amber-400';
    return 'text-green-500 dark:text-green-400';
  };

  const getIcon = () => {
    if (!syncStatus.isOnline) return CloudOff;
    if (syncStatus.isSyncing || isManualSyncing) return RefreshCw;
    if (syncStatus.queueLength === 0) return Check;
    return Cloud;
  };

  const getTooltipText = () => {
    if (!syncStatus.isOnline) return 'غير متصل بالإنترنت';
    if (syncStatus.isSyncing || isManualSyncing) return 'جاري المزامنة...';
    if (syncStatus.queueLength > 0) return `${syncStatus.queueLength} عناصر في انتظار المزامنة`;
    return 'تمت المزامنة ✓';
  };

  const Icon = getIcon();

  return (
    <div className="relative">
      <button
        onClick={handleManualSync}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={!syncStatus.canSync || isManualSyncing}
        className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${getStatusColor()} ${
          !syncStatus.canSync ? 'cursor-default' : 'cursor-pointer'
        }`}
        aria-label="حالة المزامنة"
      >
        <Icon
          className={`w-5 h-5 ${
            syncStatus.isSyncing || isManualSyncing ? 'animate-spin' : ''
          }`}
        />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
          {getTooltipText()}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45" />
        </div>
      )}

      {/* Badge for pending items */}
      {syncStatus.queueLength > 0 && syncStatus.queueLength < 100 && (
        <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {syncStatus.queueLength}
        </div>
      )}
    </div>
  );
};
