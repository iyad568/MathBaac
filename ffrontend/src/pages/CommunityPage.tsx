import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Flame,
  Clock,
  HelpCircle,
  Bookmark,
  Filter,
  Sparkles,
  GraduationCap,
  Users,
  X,
  AlertCircle
} from 'lucide-react';
import {
  CommunityPost,
  CommunityCategoryKey,
  CommunityTab
} from '../types/community';
import { COMMUNITY_CATEGORIES } from '../data/communityData';
import { communityService } from '../services/communityService';
import { PostCard } from '../components/community/PostCard';
import { CategoryBadge } from '../components/community/CategoryBadge';
import { CreatePostModal } from '../components/community/CreatePostModal';
import { StudentProfileModal } from '../components/community/StudentProfileModal';
import { useAuth } from '../context/AuthContext';

export const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CommunityTab>('latest');
  const [selectedCategory, setSelectedCategory] = useState<CommunityCategoryKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      setPosts(await communityService.getPosts());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تحميل المناقشات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const categoryCounts = useMemo(() => communityService.getCategoryCounts(posts), [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let list = [...posts];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.name.toLowerCase().includes(q)
      );
    }

    // Tab filter/sort
    switch (activeTab) {
      case 'popular':
        // Sort by votes + answers
        return list.sort((a, b) => b.votes * 2 + b.answersCount * 3 - (a.votes * 2 + a.answersCount * 3));
      case 'unanswered':
        return list.filter((p) => p.answersCount === 0);
      case 'my-discussions':
        return list.filter((p) => p.isFollowed || (authUser && p.author.id === authUser.id));
      case 'latest':
      default:
        // Already latest first
        return list;
    }
  }, [posts, selectedCategory, searchQuery, activeTab, authUser]);

  const totalQuestions = posts.length;
  const totalAnswers = posts.reduce((acc, p) => acc + p.answersCount, 0);
  const solvedCount = posts.filter((p) => p.hasBestAnswer).length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-950">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <Users className="w-3.5 h-3.5" />
              <span>مجتمع بكالوريا الرياضيات الجزائرية</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              المجتمع والأسئلة (Q&A Forum)
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              اطرح أسئلتك وتمارينك في مادة الرياضيات، ناقش الحلول النموذجية مع زملائك والأساتذة،
              واحصل على شارات التميز الأكاديمي.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 text-sm sm:text-base shrink-0 cursor-pointer active:scale-98"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>طرح سؤال جديد</span>
          </button>
        </div>

        {/* Mini stats strip */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-6 text-center sm:text-right">
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono text-indigo-400">
              {totalQuestions}
            </span>
            <p className="text-xs text-slate-400">سؤال ومناقشة</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
              {totalAnswers}
            </span>
            <p className="text-xs text-slate-400">إجابة وشرح</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-400">
              {solvedCount}
            </span>
            <p className="text-xs text-slate-400">إجابة نموذجية معتمدة</p>
          </div>
        </div>
      </div>

      {/* Search & Tabs Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث في الأسئلة، التمارين، الدالة، التكامل، أو باسم التلميذ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-11 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs transition-all font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Create Button (Mobile/Secondary) */}
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="sm:hidden px-4 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>طرح سؤال</span>
          </button>
        </div>

        {/* Category Filters Pills Carousel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold px-1">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>تصفية حسب المحور الرياضي:</span>
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                إظهار كافة المحاور
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {/* "All" button */}
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all border shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              كافة الأسئلة ({posts.length})
            </button>

            {/* 9 Specified Categories */}
            {COMMUNITY_CATEGORIES.map((cat) => (
              <CategoryBadge
                key={cat.key}
                categoryKey={cat.key}
                size="sm"
                onClick={() => setSelectedCategory(cat.key)}
                isActive={selectedCategory === cat.key}
                showCount={categoryCounts[cat.key] || 0}
              />
            ))}
          </div>
        </div>

        {/* Tab Navigation: Latest, Popular, Unanswered, My Discussions */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 gap-1 sm:gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('latest')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'latest'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>الأحدث (Latest)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('popular')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'popular'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>الأكثر تفاعلاً (Popular)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('unanswered')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'unanswered'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>بدون إجابة (Unanswered)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('my-discussions')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'my-discussions'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>مناقشاتي ومحفوظاتي</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Posts Feed */}
      <div className="space-y-3.5">
        {error && (
          <div className="p-4 rounded-2xl text-sm flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-10 text-center text-sm text-slate-500 dark:text-slate-400">
            جاري تحميل المناقشات...
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpenAuthorProfile={(userId) => setViewingUserId(userId)}
              onCategoryClick={(catKey) => setSelectedCategory(catKey as CommunityCategoryKey)}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">لم يتم العثور على مناقشات مطابقة</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {searchQuery
                  ? `لا توجد نتائج توافق بحثك "${searchQuery}". جرب كلمات أخرى أو تصفح المحاور.`
                  : activeTab === 'unanswered'
                  ? 'رائع! كل الأسئلة في هذا المحور تمت الإجابة عليها.'
                  : activeTab === 'my-discussions'
                  ? 'لم تقم بحفظ أي مناقشات أو طرح أسئلة بعد.'
                  : 'كن أول من يطرح تساؤلاً أو تمريناً في هذا المحور!'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              طرح سؤال جديد الآن
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        defaultCategory={selectedCategory === 'all' ? 'functions' : selectedCategory}
        onPostCreated={(newPostId) => {
          navigate(`/community/post/${newPostId}`);
        }}
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        userId={viewingUserId}
        onClose={() => setViewingUserId(null)}
      />
    </div>
  );
};
