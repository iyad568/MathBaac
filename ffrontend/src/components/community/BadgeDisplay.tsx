import React from 'react';
import { Award, CheckCircle2, Flame, HeartHandshake } from 'lucide-react';
import { CommunityBadgeType } from '../../types/community';
import { COMMUNITY_BADGES } from '../../data/communityData';

interface BadgeDisplayProps {
  badge: CommunityBadgeType;
  size?: 'xs' | 'sm' | 'md';
  showDescription?: boolean;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badge,
  size = 'xs',
  showDescription = false
}) => {
  const badgeInfo = COMMUNITY_BADGES[badge];
  if (!badgeInfo) return null;

  const renderIcon = (className: string) => {
    switch (badge) {
      case 'helpful-student':
        return <HeartHandshake className={className} />;
      case 'math-expert':
        return <Award className={className} />;
      case 'bac-helper':
        return <CheckCircle2 className={className} />;
      case 'top-contributor':
      default:
        return <Flame className={className} />;
    }
  };

  const sizeClasses = {
    xs: 'text-[11px] px-2 py-0.5 gap-1',
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4'
  };

  return (
    <div className="inline-flex items-center group relative">
      <span
        title={badgeInfo.description}
        className={`inline-flex items-center rounded-lg font-bold border transition-colors ${badgeInfo.bgClass} ${sizeClasses[size]}`}
      >
        {renderIcon(iconSizes[size])}
        <span>{badgeInfo.title}</span>
      </span>

      {showDescription && (
        <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">{badgeInfo.description}</span>
      )}
    </div>
  );
};
