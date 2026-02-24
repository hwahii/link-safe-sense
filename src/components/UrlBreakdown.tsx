import React from "react";

interface UrlPart {
  text: string;
  type: "safe" | "danger" | "neutral";
  label?: string;
}

interface UrlBreakdownProps {
  parts: UrlPart[];
}

// Merge unlabeled parts into the next labeled group so they share a cell
function groupParts(parts: UrlPart[]): { segments: UrlPart[]; label?: string }[] {
  const groups: { segments: UrlPart[]; label?: string }[] = [];
  let buffer: UrlPart[] = [];

  for (const part of parts) {
    if (part.label) {
      groups.push({ segments: [...buffer, part], label: part.label });
      buffer = [];
    } else {
      buffer.push(part);
    }
  }
  if (buffer.length) {
    // trailing unlabeled → merge into last group if exists, else new group
    if (groups.length) {
      groups[groups.length - 1].segments.push(...buffer);
    } else {
      groups.push({ segments: buffer });
    }
  }
  return groups;
}

const UrlBreakdown: React.FC<UrlBreakdownProps> = ({ parts }) => {
  const groups = groupParts(parts);

  return (
    <div className="my-6 rounded-xl border border-border bg-muted/50 p-4 overflow-x-auto">
      <div className="inline-flex items-start gap-0">
        {groups.map((group, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* URL segments */}
            <span className="font-mono text-base sm:text-lg whitespace-nowrap">
              {group.segments.map((seg, j) => (
                <span
                  key={j}
                  className={`inline px-0.5 py-0.5 rounded ${
                    seg.type === "safe"
                      ? "bg-safe/15 text-safe"
                      : seg.type === "danger"
                      ? "bg-danger/15 text-danger font-bold"
                      : "text-neutral"
                  }`}
                >
                  {seg.text}
                </span>
              ))}
            </span>
            {/* Label */}
            {group.label && (
              <span className="text-xs sm:text-sm text-muted-foreground font-sans mt-1.5 whitespace-nowrap">
                {group.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlBreakdown;
