import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      // Clean math string from wrapping delimiters if passed directly
      let cleaned = math.trim();
      if (cleaned.startsWith('$') && cleaned.endsWith('$')) {
        cleaned = cleaned.replace(/^\$+|\$+$/g, '');
      }
      return katex.renderToString(cleaned, {
        displayMode: block,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return math;
    }
  }, [math, block]);

  return (
    <span
      dir="ltr"
      className={`inline-block select-text font-formula-display ${block ? 'my-3 block text-center w-full overflow-x-auto py-2' : 'align-middle px-1'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
