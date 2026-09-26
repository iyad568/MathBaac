import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, RotateCcw, CheckCircle2, Video as VideoIcon, Clock } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  videoTitle: string;
  videoDuration: string;
  videoThumbnail: string;
  isCompleted?: boolean;
  onMarkComplete?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoTitle,
  videoDuration,
  videoThumbnail,
  isCompleted = false,
  onMarkComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(35);
  const [speed, setSpeed] = useState('1x');

  const timestamps = [
    { time: '00:00', title: 'المقدمة والدافع الهندسي لاشتقاق التركيب' },
    { time: '03:15', title: 'نص مبرهنة قاعدة السلسلة (Chain Rule)' },
    { time: '07:40', title: 'تطبيقات قوى الدوال وجذورها [u(x)]^n' },
    { time: '11:10', title: 'الأخطاء القاتلة في تصحيح البكالوريا' },
  ];

  return (
    <section id="video-section" className="space-y-4 scroll-mt-6 md:scroll-mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <VideoIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>فيديو الدرس والشرح التفاعلي</span>
        </h2>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>المدة: {videoDuration}</span>
        </div>
      </div>

      <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative">
        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full flex items-center justify-center bg-black overflow-hidden group">
          <img
            alt={videoTitle}
            src={videoThumbnail}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-40 filter blur-xs' : 'opacity-75'
            }`}
          />

          {/* Interactive Player Simulation overlay */}
          {!isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/40 backdrop-blur-2xs">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-indigo-500 transition-all cursor-pointer group-hover:ring-4 group-hover:ring-indigo-400/40"
                aria-label="تشغيل الفيديو"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-0.5" />
              </button>
              <p className="mt-4 text-white font-bold text-sm md:text-base max-w-md drop-shadow-sm">
                {videoTitle}
              </p>
              <span className="text-xs text-slate-300 mt-1 font-mono">انقر للمشاهدة مع تتبع الوقت</span>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50">
              <div className="flex justify-between items-center text-white text-xs">
                <span className="font-bold">{videoTitle}</span>
                <span className="bg-indigo-600 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold">جودة فائقة HD</span>
              </div>

              {/* Center animated visual */}
              <div className="text-center text-white space-y-2">
                <div className="inline-block p-4 rounded-2xl bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border border-white/20">
                  <div className="font-mono text-xl font-bold text-emerald-400">
                    (g ∘ f)'(x) = f'(x) · g'(f(x))
                  </div>
                  <div className="text-xs text-slate-200 mt-1">يتم الآن تشغيل الشرح المصور للخاصية...</div>
                </div>
              </div>

              {/* Player Controls Bar */}
              <div className="space-y-2 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/60">
                {/* Progress bar */}
                <div
                  className="w-full h-1.5 bg-slate-700 rounded-full cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    setProgressPercent(Math.round(pos * 100));
                  }}
                >
                  <div
                    className="h-full bg-indigo-500 rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-slate-900 rounded-full shadow"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="p-1 hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <Pause className="w-5 h-5 fill-current" />
                    </button>
                    <button
                      onClick={() => setProgressPercent(0)}
                      className="p-1 hover:text-indigo-400 transition-colors cursor-pointer"
                      title="إعادة من البداية"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[11px] text-slate-300">
                      {Math.floor((progressPercent * 14.33) / 100)}:
                      {String(Math.floor(((progressPercent * 14.33 * 60) / 100) % 60)).padStart(2, '0')} / {videoDuration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSpeed(speed === '1x' ? '1.25x' : speed === '1.25x' ? '1.5x' : '1x')}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px]"
                    >
                      {speed}
                    </button>
                    <Volume2 className="w-4 h-4 text-slate-300" />
                    <Maximize className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Key Moments / Chapters */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">محطات الفيديو:</span>
            {timestamps.map((ts, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(true);
                  setProgressPercent(idx * 25 + 5);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-400">{ts.time}</span>
                <span className="truncate max-w-[140px]">{ts.title}</span>
              </button>
            ))}
          </div>

          {/* Mark lesson completed button */}
          <button
            onClick={onMarkComplete}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'تم إكمال الدرس النظري' : 'تعليم الدرس كمكتمل (+20%)'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
