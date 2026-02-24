import React from "react";

interface UrlPart {
  text: string;
  type: "safe" | "danger" | "neutral";
  label?: string;
}

interface UrlBreakdownProps {
  parts: UrlPart[];
}

const UrlBreakdown: React.FC<UrlBreakdownProps> = ({ parts }) => {
  return (
    <div className="my-6 rounded-xl border border-border bg-muted/50 p-4 overflow-x-auto">
      <div className="inline-flex items-end gap-0 font-mono text-base sm:text-lg whitespace-nowrap">
        {parts.map((part, i) => (
          <span key={i} className="inline-flex flex-col items-center">
            <span
              className={`px-1 py-0.5 rounded ${
                part.type === "safe"
                  ? "bg-safe/15 text-safe"
                  : part.type === "danger"
                  ? "bg-danger/15 text-danger font-bold"
                  : "text-neutral"
              }`}
            >
              {part.text}
            </span>
            {part.label && (
              <span className="text-[10px] text-muted-foreground mt-1.5 font-sans leading-tight px-1 whitespace-nowrap">
                {part.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UrlBreakdown;
