import React from "react";

interface LineChatProps {
  name: string;
  messages: { sender: "other" | "self"; text: string }[];
  isGroup?: boolean;
  groupName?: string;
}

const LineChat: React.FC<LineChatProps> = ({ name, messages, isGroup, groupName }) => {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-border shadow-sm max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[hsl(145,60%,42%)] text-white px-4 py-3 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full border-2 border-white/60" />
        <span className="font-bold text-base">{isGroup ? groupName : name}</span>
      </div>
      {/* Chat area */}
      <div className="bg-[hsl(200,25%,90%)] p-4 space-y-3 min-h-[120px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-2 ${msg.sender === "self" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "other" && (
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[hsl(174,30%,70%)] flex items-center justify-center text-xs font-bold text-white">
                  {name[0]}
                </div>
                {!isGroup && <span className="text-[10px] text-muted-foreground">{name}</span>}
                {isGroup && <span className="text-[10px] text-muted-foreground">{name}</span>}
              </div>
            )}
            <div
              className={`rounded-2xl px-4 py-2 max-w-[75%] text-base leading-relaxed ${
                msg.sender === "self"
                  ? "bg-[hsl(145,60%,42%)] text-white rounded-br-sm"
                  : "bg-white text-foreground border border-border/50 rounded-bl-sm"
              }`}
            >
              <span className="break-all whitespace-pre-wrap">{msg.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChat;
