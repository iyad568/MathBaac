import React from 'react';
import katex from 'katex';

interface MathContentRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
  compact?: boolean;
  maxParagraphs?: number;
}

export const MathContentRenderer: React.FC<MathContentRendererProps> = ({
  content,
  className = '',
  inline = false,
  compact = false,
  maxParagraphs
}) => {
  if (!content) return null;

  // Inline mode: no paragraph wrappers (<p>), suitable for titles, links, and buttons
  if (inline) {
    // Treat double dollars ($$...$$) as inline math as well so titles don't break layout
    const inlineNormalized = content.replace(/\$\$([\s\S]*?)\$\$/g, '$$$1$$');
    const parts = inlineNormalized.split(/(\$[^\$\n]+?\$)/g);

    return (
      <span className={`math-content-inline ${className}`}>
        {parts.map((part, idx) => {
          if (part.startsWith('$') && part.endsWith('$')) {
            const rawMath = part.slice(1, -1).trim();
            try {
              const html = katex.renderToString(rawMath, {
                displayMode: false,
                throwOnError: false,
                output: 'htmlAndMathml'
              });
              return (
                <span
                  key={idx}
                  dir="ltr"
                  className="inline-block px-1 font-mono text-indigo-900 dark:text-indigo-200 align-baseline"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            } catch {
              return (
                <code key={idx} className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-800 dark:text-indigo-300">
                  {rawMath}
                </code>
              );
            }
          }

          // Handle markdown bold (**text**)
          const boldParts = part.split(/(\*\*[^\*]+?\*\*)/g);
          return (
            <span key={idx}>
              {boldParts.map((bp, bIdx) => {
                if (bp.startsWith('**') && bp.endsWith('**')) {
                  return <strong key={bIdx} className="font-bold">{bp.slice(2, -2)}</strong>;
                }
                return bp;
              })}
            </span>
          );
        })}
      </span>
    );
  }

  // Block & multiline mode
  let paragraphs = content.split('\n\n');
  if (maxParagraphs && paragraphs.length > maxParagraphs) {
    paragraphs = paragraphs.slice(0, maxParagraphs);
  }

  const renderFormattedContent = () => {
    return paragraphs.map((para, pIdx) => {
      // Check for block math $$...$$
      const blockParts = para.split(/(\$\$[\s\S]*?\$\$)/g);

      return (
        <p key={pIdx} className={`${compact ? 'mb-1.5' : 'mb-3'} leading-relaxed last:mb-0`}>
          {blockParts.map((blockPart, bIdx) => {
            if (blockPart.startsWith('$$') && blockPart.endsWith('$$')) {
              const rawMath = blockPart.slice(2, -2).trim();
              try {
                const html = katex.renderToString(rawMath, {
                  displayMode: true,
                  throwOnError: false,
                  output: 'htmlAndMathml'
                });
                return (
                  <span
                    key={bIdx}
                    dir="ltr"
                    className={`block ${
                      compact
                        ? 'my-1.5 py-1 px-2.5 text-xs sm:text-sm'
                        : 'my-3 py-2 px-3 text-sm sm:text-base'
                    } text-center overflow-x-auto bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 font-mono text-indigo-950 dark:text-slate-100`}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              } catch {
                return (
                  <code key={bIdx} className="block my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono">
                    {rawMath}
                  </code>
                );
              }
            }

            // Inline math $...$
            const inlineParts = blockPart.split(/(\$[^\$\n]+?\$)/g);
            return (
              <span key={bIdx}>
                {inlineParts.map((inlinePart, iIdx) => {
                  if (inlinePart.startsWith('$') && inlinePart.endsWith('$')) {
                    const rawMath = inlinePart.slice(1, -1).trim();
                    try {
                      const html = katex.renderToString(rawMath, {
                        displayMode: false,
                        throwOnError: false,
                        output: 'htmlAndMathml'
                      });
                      return (
                        <span
                          key={iIdx}
                          dir="ltr"
                          className="inline-block px-1 font-mono text-indigo-900 dark:text-indigo-200 align-baseline"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    } catch {
                      return (
                        <code key={iIdx} className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-800 dark:text-indigo-300">
                          {rawMath}
                        </code>
                      );
                    }
                  }

                  // Handle basic markdown-like bold (**text**)
                  const boldParts = inlinePart.split(/(\*\*[^\*]+?\*\*)/g);
                  return (
                    <span key={iIdx}>
                      {boldParts.map((bp, bpIdx) => {
                        if (bp.startsWith('**') && bp.endsWith('**')) {
                          return <strong key={bpIdx} className="font-bold text-slate-900 dark:text-slate-100">{bp.slice(2, -2)}</strong>;
                        }
                        return bp;
                      })}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </p>
      );
    });
  };

  return <div className={`math-content select-text ${className}`}>{renderFormattedContent()}</div>;
};
