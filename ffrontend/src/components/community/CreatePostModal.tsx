import React, { useRef, useState } from 'react';
import {
  X,
  Send,
  Sparkles,
  Image as ImageIcon,
  AlertCircle,
  Eye,
  Edit3,
  HelpCircle,
  Upload,
  Loader2,
  Link as LinkIcon
} from 'lucide-react';
import { CommunityCategoryKey } from '../../types/community';
import { COMMUNITY_CATEGORIES } from '../../data/communityData';
import { MathContentRenderer } from './MathContentRenderer';
import { CategoryBadge } from './CategoryBadge';
import { communityService } from '../../services/communityService';
import { ApiError } from '../../services/apiClient';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (newPostId: string) => void;
  defaultCategory?: CommunityCategoryKey;
}

const MATH_SHORTCUTS = [
  { label: 'كسر', latex: '$\\frac{a}{b}$' },
  { label: 'جذر', latex: '$\\sqrt{x}$' },
  { label: 'نهاية', latex: '$\\lim_{x \\to 0} f(x)$' },
  { label: 'تكامل', latex: '$\\int_a^b f(x) dx$' },
  { label: 'مشتقة', latex: '$f\'(x)$' },
  { label: 'دالة أسية', latex: '$e^{2x+1}$' },
  { label: 'لوغاريتم', latex: '$\\ln(x)$' },
  { label: 'شعاع', latex: '$\\vec{u}$' },
  { label: 'توفيقة', latex: '$C_n^p$' }
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
  defaultCategory = 'functions'
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityCategoryKey>(defaultCategory);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'write' | 'preview'>('write');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageUrl('');
    setImagePreview('');
    setImageCaption('');
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setImageError(null);

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError('صيغة غير مدعومة، يرجى اختيار صورة JPG أو PNG أو GIF أو WEBP');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError('حجم الصورة يتجاوز 5 ميغابايت');
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);
    setIsUploadingImage(true);
    try {
      const uploadedPath = await communityService.uploadImage(file);
      setImageUrl(uploadedPath);
      if (!imageCaption) setImageCaption('صورة مرفقة للتمرين');
    } catch (err) {
      setImageError(err instanceof ApiError ? err.message : 'تعذر رفع الصورة، حاول مرة أخرى');
      URL.revokeObjectURL(localPreview);
      setImagePreview('');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const insertLatex = (latex: string) => {
    setContent((prev) => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + latex + ' ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || title.trim().length < 8) {
      setError('يرجى كتابة عنوان واضح للسؤال لا يقل عن 8 أحرف');
      return;
    }

    if (!content.trim() || content.trim().length < 15) {
      setError('يرجى شرح السؤال أو تفاصيل التمرين بما لا يقل عن 15 حرفاً');
      return;
    }

    if (isUploadingImage) {
      setError('يرجى الانتظار حتى تنتهي عملية رفع الصورة');
      return;
    }

    setIsSubmitting(true);
    try {
      const newPost = await communityService.createPost({
        title: title.trim(),
        content: content.trim(),
        category,
        imageUrl: imageUrl.trim() || undefined,
        imageCaption: imageCaption.trim() || undefined,
      });
      onPostCreated(newPost.id);
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'حدث خطأ أثناء نشر السؤال، يرجى المحاولة ثانية');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">طرح سؤال / تمرين جديد</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                شارك تساؤلك الرياضي أو تمريناً مستعصياً لتبادل الحلول مع الزملاء والأساتذة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {error && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              المحور / التصنيف <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMUNITY_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer select-none ${
                    category === cat.key
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title Field */}
          <div className="space-y-1.5">
            <label htmlFor="post-title" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              عنوان السؤال <span className="text-rose-500">*</span>
            </label>
            <input
              id="post-title"
              type="text"
              required
              placeholder="مثال: كيفية إزالة حالة عدم التعيين في نهاية الدالة اللوغاريتمية..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-medium"
            />
          </div>

          {/* Math LaTeX Shortcuts Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>إدراج سريع للرموز الرياضية (LaTeX):</span>
              </span>
              <span className="text-[11px] text-slate-400">يدعم صيغ $math$ تلقائياً</span>
            </div>
            <div className="flex flex-wrap gap-1 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-200/80 dark:border-slate-700">
              {MATH_SHORTCUTS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => insertLatex(item.latex)}
                  className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer"
                  title={item.latex}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description & Preview Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="post-content" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                تفاصيل السؤال والشرح الرياضي <span className="text-rose-500">*</span>
              </label>

              <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setPreviewTab('write')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    previewTab === 'write' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>كتابة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('preview')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    previewTab === 'preview' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>معاينة الرياضيات</span>
                </button>
              </div>
            </div>

            {previewTab === 'write' ? (
              <textarea
                id="post-content"
                required
                rows={5}
                placeholder="اكتب تفاصيل استفسارك هنا... يمكنك استعمال $صيغة$ للرياضيات في نفس السطر أو $$صيغة$$ لسطر مستقل..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-sans leading-relaxed"
              />
            ) : (
              <div className="w-full min-h-[140px] p-4 bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 overflow-y-auto max-h-60">
                {content.trim() ? (
                  <MathContentRenderer content={content} />
                ) : (
                  <p className="text-slate-400 text-xs italic">
                    المعاينة فارغة، اكتب بعض النصوص والرموز لترى تنسيقها الرياضي المباشر.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Image Attachment (Optional for Mathematical Exercises) */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>صورة للتمرين (اختياري)</span>
              </span>
              {!imageUrl && !isUploadingImage && (
                <button
                  type="button"
                  onClick={() => setImageMode((m) => (m === 'upload' ? 'url' : 'upload'))}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  {imageMode === 'upload' ? (
                    <>
                      <LinkIcon className="w-3 h-3" />
                      <span>أو ضع رابط صورة بدلاً من ذلك</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3 h-3" />
                      <span>أو ارفع صورة من جهازك</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {imageError && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">{imageError}</p>
            )}

            {(imagePreview || imageUrl) ? (
              <div className="relative p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center gap-3">
                <img
                  src={imagePreview || imageUrl}
                  alt="مرفق تمرين"
                  className="w-20 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {imageCaption || 'صورة مرفقة للتمرين'}
                  </p>
                  <p className="text-[11px] font-medium flex items-center gap-1.5">
                    {isUploadingImage ? (
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> جارِ رفع الصورة...
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400">تم إرفاق الصورة بنجاح</span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearImage}
                  disabled={isUploadingImage}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 disabled:opacity-40 cursor-pointer"
                  title="حذف الصورة"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : imageMode === 'upload' ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 flex flex-col items-center justify-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-xs font-bold">اضغط لرفع صورة (JPG, PNG, GIF, WEBP — 5MB كحد أقصى)</span>
                </button>
              </>
            ) : (
              <input
                type="url"
                placeholder="ضع رابط صورة التمرين (URL)..."
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (e.target.value && !imageCaption) {
                    setImageCaption('رسم بياني مرفق');
                  }
                }}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            )}
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isUploadingImage}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>نشر السؤال للجميع</span>
                <Send className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
