import React from "react";

interface UrlPart {
  text: string;
  type: "safe" | "danger" | "neutral";
  label?: string;
  sublabel?: string;
}

interface UrlBreakdownProps {
  parts: UrlPart[];
}

const UrlBreakdown: React.FC<UrlBreakdownProps> = ({ parts }) => {
  return (
    <div className="my-6 rounded-xl border border-border bg-muted/50 p-4 overflow-x-auto">
      <table className="border-collapse">
        <tbody>
          {/* URL row */}
          <tr>
            {parts.map((part, i) => (
              <td key={i} className="p-0 align-bottom">
                <span
                  className={`font-mono text-base sm:text-lg whitespace-nowrap inline-block px-0.5 py-0.5 rounded ${
                    part.label ? "border-b-2 border-muted-foreground/30 pb-1" : ""
                  } ${
                    part.type === "safe"
                      ? "bg-safe/15 text-safe"
                      : part.type === "danger"
                      ? "bg-danger/15 text-danger font-bold"
                      : "text-neutral"
                  }`}
                >
                  {part.text}
                </span>
              </td>
            ))}
          </tr>
          {/* Label row */}
          <tr>
            {parts.map((part, i) => (
              <td key={i} className="p-0 pt-1 align-top text-center">
                {part.label && (
                  <span className="flex flex-col items-center font-sans">
                    <span className="text-sm text-muted-foreground leading-snug">{part.label}</span>
                    {part.sublabel && (
                      <span className="text-sm text-muted-foreground/70 leading-snug">{part.sublabel}</span>
                    )}
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
