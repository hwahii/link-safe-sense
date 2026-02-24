import React from "react";

interface SmsMessageProps {
  sender: string;
  content: string;
}

const SmsMessage: React.FC<SmsMessageProps> = ({ sender, content }) => {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-border shadow-sm max-w-sm mx-auto bg-white">
      {/* Header */}
      <div className="bg-muted px-4 py-3 flex items-center justify-center border-b border-border">
        <span className="text-sm text-muted-foreground font-medium">{sender}</span>
      </div>
      {/* Message */}
      <div className="p-4">
        <div className="flex justify-start">
          <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
            <p className="text-base leading-relaxed break-all whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsMessage;
