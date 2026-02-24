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
      <table className="border-collapse font-mono text-base sm:text-lg">
        <tbody>
          <tr>
            {parts.map((part, i) => (
              <td key={i} className="p-0 align-bottom">
                <span
                  className={`inline-block px-1 py-0.5 rounded ${
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
          <tr>
            {parts.map((part, i) => (
              <td key={i} className="p-0 pt-1.5 align-top">
                {part.label && (
                  <span className="text-xs sm:text-sm text-muted-foreground font-sans leading-tight px-1 whitespace-nowrap">
                    {part.label}
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
