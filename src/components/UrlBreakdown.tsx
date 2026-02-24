import React, { useRef, useEffect, useState } from "react";

interface UrlPart {
  text: string;
  type: "safe" | "danger" | "neutral";
  label?: string;
}

interface UrlBreakdownProps {
  parts: UrlPart[];
}

const UrlBreakdown: React.FC<UrlBreakdownProps> = ({ parts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [positions, setPositions] = useState<{ left: number; width: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = spanRefs.current.map((el) => {
      if (!el) return { left: 0, width: 0 };
      const rect = el.getBoundingClientRect();
      return { left: rect.left - containerRect.left, width: rect.width };
    });
    setPositions(pos);
  }, [parts]);

  const labeledParts = parts
    .map((p, i) => ({ ...p, index: i }))
    .filter((p) => p.label);

  return (
    <div ref={containerRef} className="my-6 rounded-xl border border-border bg-muted/50 p-4 overflow-x-auto">
      {/* URL line */}
      <div className="font-mono text-base sm:text-lg whitespace-nowrap">
        {parts.map((part, i) => (
          <span
            key={i}
            ref={(el) => { spanRefs.current[i] = el; }}
            className={`inline px-0.5 py-0.5 rounded ${
              part.type === "safe"
                ? "bg-safe/15 text-safe"
                : part.type === "danger"
                ? "bg-danger/15 text-danger font-bold"
                : "text-neutral"
            }`}
          >
            {part.text}
          </span>
        ))}
      </div>

      {/* Labels row */}
      {positions.length > 0 && labeledParts.length > 0 && (
        <div className="relative mt-2" style={{ height: "1.5rem" }}>
          {labeledParts.map((part) => {
            const pos = positions[part.index];
            if (!pos) return null;
            const center = pos.left + pos.width / 2;
            return (
              <span
                key={part.index}
                className="absolute text-xs sm:text-sm text-muted-foreground font-sans whitespace-nowrap"
                style={{ left: center, transform: "translateX(-50%)" }}
              >
                {part.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UrlBreakdown;
