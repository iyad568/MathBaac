/**
 * Hybrid Sync Service
 * Combines localStorage (offline cache) with backend API (cloud sync)
 * Strategy: Write to localStorage immediately, sync to backend asynchronously
 */

import { apiService } from './apiService';
import { localStorageService } from './localStorageService';
import {
  ConceptProgress,
  StudentExerciseAttempt,
  StudentBACAttempt,
  QuizSubmission,
  TestResult,
} from '../types';

interface SyncQueueItem {
  type: 'concept' | 'exercise' | 'bac' | 'quiz' | 'test' | 'preferences';
  data: any;
  timestamp: number;
  retries: number;
}

class HybridSyncService {
  private syncQueue: SyncQueueItem[] = [];
  private syncIntervalId: number | null = null;
  private isSyncing = false;
  private readonly SYNC_INTERVAL = 30000; // 30 seconds
  private readonly MAX_RETRIES = 3;
  private readonly QUEUE_KEY = 'dzbac_sync_queue_v1';

  constructor() {
    this.loadSyncQueue();
    this.startAutoSync();
  }

  // ==================== SYNC QUEUE MANAGEMENT ====================

  private loadSyncQueue() {
    try {
      const raw = localStorage.getItem(this.QUEUE_KEY);
      if (raw) {
        this.syncQueue = JSON.parse(raw);
      }
    } catch (error) {
      console.error('Failed to load sync queue:', error);
      this.syncQueue = [];
    }
  }

  private saveSyncQueue() {
    try {
      localStorage.setItem(this.QUEUE_KEY, JSON.stringify(this.syncQueue));
    } catch (error) {
      console.error('Failed to save sync queue:', error);
    }
  }

  private addToSyncQueue(type: SyncQueueItem['type'], data: any) {
    const item: SyncQueueItem = {
      type,
      data,
      timestamp: Date.now(),
      retries: 0,
    };
    this.syncQueue.push(item);
    this.saveSyncQueue();
  }

  // ==================== AUTO SYNC ====================

  private startAutoSync() {
    if (this.syncIntervalId) return;

    // Sync immediately on start
    this.syncToBackend();

    // Then sync every 30 seconds
    this.syncIntervalId = window.setInterval(() => {
      this.syncToBackend();
    }, this.SYNC_INTERVAL);

    // Also sync when coming back online
    window.addEventListener('online', () => {
      console.log('🌐 Back online - syncing to backend...');
      this.syncToBackend();
    });

    // Sync before page unload
    window.addEventListener('beforeunload', () => {
      if (this.syncQueue.length > 0 && apiService.canSyncToBackend()) {
        // Try to sync remaining items (may not complete)
        this.syncToBackend();
      }
    });
  }

  stopAutoSync() {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  private async syncToBackend() {
    if (this.isSyncing || !apiService.canSyncToBackend()) return;
    if (this.syncQueue.length === 0) return;

    this.isSyncing = true;
    console.log(`🔄 Syncing ${this.syncQueue.length} items to backend...`);

    const itemsToSync = [...this.syncQueue];
    const failedItems: SyncQueueItem[] = [];

    for (const item of itemsToSync) {
      let success = false;

      try {
        switch (item.type) {
          case 'concept':
            const conceptResult = await apiService.saveConceptProgress(
              item.data.conceptId,
              item.data
            );
            success = conceptResult.ok;
            break;

          case 'exercise':
            const exerciseResult = await apiService.saveExerciseAttempt(item.data);
            success = exerciseResult.ok;
            break;

          case 'bac':
            const bacResult = await apiService.saveBACAttempt(item.data);
            success = bacResult.ok;
            break;

          case 'quiz':
            const quizResult = await apiService.saveQuizResult(item.data);
            success = quizResult.ok;
            break;

          case 'test':
            const testResult = await apiService.saveTestResult(item.data);
            success = testResult.ok;
            break;

          case 'preferences':
            const prefsResult = await apiService.updateUserPreferences(item.data);
            success = prefsResult.ok;
            break;
        }
      } catch (error) {
        console.error(`Failed to sync ${item.type}:`, error);
        success = false;
      }

      if (!success) {
        item.retries += 1;
        if (item.retries < this.MAX_RETRIES) {
          failedItems.push(item);
        } else {
          console.warn(`Dropped sync item after ${this.MAX_RETRIES} retries:`, item.type);
        }
      }
    }

    this.syncQueue = failedItems;
    this.saveSyncQueue();
    this.isSyncing = false;

    if (failedItems.length === 0) {
      console.log('✅ All items synced successfully');
    } else {
      console.log(`⚠️ ${failedItems.length} items failed, will retry`);
    }
  }

  // ==================== HYBRID SAVE METHODS ====================

  /**
   * Save concept progress (localStorage + backend)
   */
  async saveConceptProgress(progress: ConceptProgress): Promise<void> {
    // 1. Save to localStorage immediately (works offline)
    localStorageService.saveConceptProgress(progress);

    // 2. Try to sync to backend
    if (apiService.canSyncToBackend()) {
      const result = await apiService.saveConceptProgress(progress.conceptId, progress);
      if (!result.ok) {
        this.addToSyncQueue('concept', progress);
      }
    } else {
      // Offline or not logged in - add to queue
      this.addToSyncQueue('concept', progress);
    }
  }

  /**
   * Save exercise attempt (localStorage + backend)
   */
  async saveExerciseAttempt(attempt: StudentExerciseAttempt): Promise<void> {
    // 1. Save to localStorage immediately
    localStorageService.saveExerciseAttempt(attempt);

    // 2. Try to sync to backend
    if (apiService.canSyncToBackend()) {
      const result = await apiService.saveExerciseAttempt(attempt);
      if (!result.ok) {
        this.addToSyncQueue('exercise', attempt);
      }
    } else {
      this.addToSyncQueue('exercise', attempt);
    }
  }

  /**
   * Save BAC attempt (localStorage + backend)
   */
  async saveBACAttempt(attempt: StudentBACAttempt): Promise<void> {
    // 1. Save to localStorage immediately
    localStorageService.saveBACAttempt(attempt);

    // 2. Try to sync to backend
    if (apiService.canSyncToBackend()) {
      const result = await apiService.saveBACAttempt(attempt);
      if (!result.ok) {
        this.addToSyncQueue('bac', attempt);
      }
    } else {
      this.addToSyncQueue('bac', attempt);
    }
  }

  /**
   * Save quiz result (localStorage + backend)
   */
  async saveQuizResult(submission: QuizSubmission): Promise<void> {
    // 1. Save to localStorage immediately
    localStorageService.saveQuizResult(submission);

    // 2. Try to sync to backend
    if (apiService.canSyncToBackend()) {
      const result = await apiService.saveQuizResult(submission);
      if (!result.ok) {
        this.addToSyncQueue('quiz', submission);
      }
    } else {
      this.addToSyncQueue('quiz', submission);
    }
  }

  /**
   * Save test result (localStorage + backend)
   */
  async saveTestResult(result: TestResult): Promise<void> {
    // 1. Save to localStorage immediately
    localStorageService.saveTestResult(result);

    // 2. Try to sync to backend
    if (apiService.canSyncToBackend()) {
      const apiResult = await apiService.saveTestResult(result);
      if (!apiResult.ok) {
        this.addToSyncQueue('test', result);
      }
    } else {
      this.addToSyncQueue('test', result);
    }
  }

  /**
   * Update theme preference (localStorage + backend)
   */
  async updateTheme(theme: 'light' | 'dark'): Promise<void> {
    // Save to localStorage immediately
    localStorage.setItem('theme', theme);

    // Try to sync to backend
    if (apiService.canSyncToBackend()) {
      const result = await apiService.updateUserPreferences({ theme });
      if (!result.ok) {
        this.addToSyncQueue('preferences', { theme });
      }
    } else {
      this.addToSyncQueue('preferences', { theme });
    }
  }

  // ==================== LOAD FROM BACKEND ====================

  /**
   * Load all progress from backend (on login or device switch)
   */
  async loadFromBackend(): Promise<boolean> {
    if (!apiService.canSyncToBackend()) {
      console.log('Cannot load from backend - offline or not authenticated');
      return false;
    }

    try {
      console.log('📥 Loading all progress from backend...');
      const result = await apiService.loadAllProgress();

      if (!result.ok || !result.data) {
        console.error('Failed to load from backend:', result.error);
        return false;
      }

      // Update localStorage with backend data
      const { concepts, exercises, bacExercises, quizzes, tests, preferences } = result.data;

      // Convert backend data to localStorage format
      const conceptProgressMap: Record<string, ConceptProgress> = {};
      concepts.forEach((c: any) => {
        conceptProgressMap[c.conceptId] = {
          conceptId: c.conceptId,
          chapterId: c.chapterId,
          overallPercentage: c.overallPercentage,
          lessonPercentage: c.lessonPercentage,
          quizPercentage: c.quizPercentage,
          exercisesPercentage: c.exercisesPercentage,
          bacPercentage: c.bacPercentage,
          testPercentage: c.testPercentage,
        };
      });

      // Save to localStorage
      localStorage.setItem('dzbac_concept_progress_v2', JSON.stringify(conceptProgressMap));
      localStorage.setItem('dzbac_exercise_attempts_v2', JSON.stringify(exercises));
      localStorage.setItem('dzbac_bac_attempts_v2', JSON.stringify(bacExercises));
      
      const quizMap: Record<string, QuizSubmission> = {};
      quizzes.forEach((q: any) => {
        quizMap[q.conceptId] = q;
      });
      localStorage.setItem('dzbac_quiz_results_v2', JSON.stringify(quizMap));
      localStorage.setItem('dzbac_test_results_v2', JSON.stringify(tests));

      if (preferences.theme) {
        localStorage.setItem('theme', preferences.theme);
      }
      if (preferences.activeStream) {
        localStorage.setItem('dzbac_active_stream_v2', preferences.activeStream);
      }
      if (preferences.progressWeights) {
        localStorage.setItem('dzbac_weights_config_v2', JSON.stringify(preferences.progressWeights));
      }

      console.log('✅ Successfully loaded all data from backend');
      return true;
    } catch (error) {
      console.error('Error loading from backend:', error);
      return false;
    }
  }

  // ==================== MIGRATION ====================

  /**
   * Migrate existing localStorage data to backend (one-time migration)
   */
  async migrateToBackend(
    onProgress?: (message: string, percent: number) => void
  ): Promise<{ success: boolean; message: string }> {
    if (!apiService.canSyncToBackend()) {
      return {
        success: false,
        message: 'Cannot migrate - offline or not authenticated',
      };
    }

    try {
      onProgress?.('جاري جمع البيانات...', 10);

      // Collect all localStorage data
      const conceptProgressMap = localStorageService.getAllConceptProgress();
      const concepts = Object.values(conceptProgressMap);

      onProgress?.('جاري نقل التقدم...', 30);

      const exercises = localStorageService.getExerciseAttempts();
      const bacAttempts = localStorageService.getBACAttempts();

      onProgress?.('جاري نقل النتائج...', 50);

      // Get all quiz results
      const quizResults: QuizSubmission[] = [];
      concepts.forEach(c => {
        const quiz = localStorageService.getQuizResult(c.conceptId);
        if (quiz) {
          quizResults.push(quiz);
        }
      });

      const testResults = localStorageService.getTestResults();

      onProgress?.('جاري نقل الإعدادات...', 70);

      const preferences = {
        theme: localStorage.getItem('theme') || 'light',
        activeStream: localStorage.getItem('dzbac_active_stream_v2') || 'شعبة العلوم التجريبية',
        targetBacScore: 15,
        progressWeights: JSON.parse(localStorage.getItem('dzbac_weights_config_v2') || '{}'),
        notificationsEnabled: true,
      };

      onProgress?.('جاري الرفع إلى السحابة...', 80);

      // Bulk sync to backend
      const result = await apiService.bulkSyncProgress({
        concepts: concepts.map(c => ({
          conceptId: c.conceptId,
          chapterId: c.chapterId,
          overallPercentage: c.overallPercentage,
          lessonPercentage: c.lessonPercentage || 0,
          quizPercentage: c.quizPercentage || 0,
          exercisesPercentage: c.exercisesPercentage || 0,
          bacPercentage: c.bacPercentage || 0,
          testPercentage: c.testPercentage || 0,
        })),
        exercises,
        bacExercises: bacAttempts,
        quizzes: quizResults,
        tests: testResults,
        preferences,
      });

      if (!result.ok) {
        return {
          success: false,
          message: result.error || 'فشل النقل. حاول مرة أخرى.',
        };
      }

      onProgress?.('اكتمل! ✓', 100);

      // Mark migration as complete
      localStorage.setItem('dzbac_migration_completed_v1', 'true');

      return {
        success: true,
        message: result.data?.message || 'تم نقل جميع بياناتك بنجاح!',
      };
    } catch (error) {
      console.error('Migration failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء النقل',
      };
    }
  }

  /**
   * Check if migration is needed
   */
  needsMigration(): boolean {
    // Already migrated?
    if (localStorage.getItem('dzbac_migration_completed_v1')) {
      return false;
    }

    // Has old localStorage data?
    const hasData = localStorage.getItem('dzbac_concept_progress_v2') ||
                    localStorage.getItem('dzbac_exercise_attempts_v2') ||
                    localStorage.getItem('dzbac_bac_attempts_v2');

    return !!hasData;
  }

  // ==================== SYNC STATUS ====================

  getSyncStatus() {
    return {
      queueLength: this.syncQueue.length,
      isSyncing: this.isSyncing,
      isOnline: apiService.isOnline(),
      canSync: apiService.canSyncToBackend(),
    };
  }

  /**
   * Force immediate sync (for manual sync button)
   */
  async forceSyncNow(): Promise<void> {
    await this.syncToBackend();
  }
}

export const syncService = new HybridSyncService();
