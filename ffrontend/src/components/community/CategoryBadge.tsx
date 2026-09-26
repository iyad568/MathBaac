import React from 'react';
import {
  TrendingUp,
  Activity,
  Variable,
  Dices,
  Compass,
  GraduationCap,
  Lightbulb,
  HelpCircle,
  Calculator
} from 'lucide-react';
import { CommunityCategoryKey } from '../../types/community';
import { COMMUNITY_CATEGORIES } from '../../data/communityData';

interface CategoryBadgeProps {
  categoryKey: CommunityCategoryKey;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isActive?: boolean;
  showCount?: number;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  categoryKey,
  size = 'md',
  onClick,
  isActive = false,
  showCount
}) => {
  const cat = COMMUNITY_CATEGORIES.find((c) => c.key === categoryKey) || COMMUNITY_CATEGORIES[0];

  const renderIcon = (className: string) => {
    switch (cat.key) {
      case 'mathematics':
        return <Calculator className={className} />;
      case 'functions':
        return <TrendingUp className={className} />;
      case 'derivatives':
        return <Activity className={className} />;
      case 'integrals':
        return <Variable className={className} />;
      case 'probability':
        return <Dices className={className} />;
      case 'geometry':
        return <Compass className={className} />;
      case 'bac-exercises':
        return <GraduationCap className={className} />;
      case 'study-tips':
        return <Lightbulb className={className} />;
      case 'general':
      default:
        return <HelpCircle className={className} />;
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs md:text-sm px-3 py-1.5 gap-2',
    lg: 'text-sm md:text-base px-4 py-2 gap-2.5'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5'
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center rounded-xl font-bold transition-all border cursor-pointer select-none ${
          sizeClasses[size]
        } ${
          isActive
            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30'
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        {renderIcon(iconSizes[size])}
        <span>{cat.label}</span>
        {showCount !== undefined && (
          <span
            className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
              isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {showCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-xl font-bold border ${cat.badgeBg} ${sizeClasses[size]}`}
    >
      {renderIcon(iconSizes[size])}
      <span>{cat.label}</span>
    </span>
  );
};
