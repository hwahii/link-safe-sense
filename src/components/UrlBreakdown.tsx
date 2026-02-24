import React from "react";

interface UrlPart {
  text: string;
  type: "safe" | "danger" | "neutral";
  label?: string;
}

interface UrlBreakdownProps {
  parts: UrlPart[];
}

// Group consecutive unlabeled parts with the next labeled part
function groupParts(parts: UrlPart[]): { segments: UrlPart[]; label?: string }[] {
  const groups: { segments: UrlPart[]; label?: string }[] = [];
  let buffer: UrlPart[] = [];

  for (const part of parts) {
    if (part.label) {
      // flush buffer + this part into one group
      groups.push({ segments: [...buffer, part], label: part.label });
      buffer = [];
    } else {
      buffer.push(part);
    }
  }
  // trailing unlabeled parts
  if (buffer.length) {
    groups.push({ segments: buffer });
  }
  return groups;
}

const UrlBreakdown: React.FC<UrlBreakdownProps> = ({ parts }) => {
  const groups = groupParts(parts);

  return (
    <div className="my-6 rounded-xl border border-border bg-muted/50 p-4 overflow-x-auto">
      <table className="border-collapse font-mono text-base sm:text-lg">
        <tbody>
          <tr>
            {groups.map((group, i) => (
              <td key={i} className="p-0 align-bottom whitespace-nowrap">
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
              </td>
            ))}
          </tr>
          <tr>
            {groups.map((group, i) => (
              <td key={i} className="p-0 pt-1.5 align-top">
                {group.label && (
                  <span className="text-xs sm:text-sm text-muted-foreground font-sans leading-tight px-0.5 whitespace-nowrap">
                    {group.label}
                  </span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UrlBreakdown;
