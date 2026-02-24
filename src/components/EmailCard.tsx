import React from "react";

interface EmailCardProps {
  sender: string;
  displayName?: string;
  subject: string;
  content: string;
}

const EmailCard: React.FC<EmailCardProps> = ({ sender, displayName, subject, content }) => {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-border shadow-sm max-w-sm mx-auto bg-white">
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground shrink-0">
            ✉
          </div>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">寄件者</p>
            {displayName && <p className="font-bold text-sm text-foreground">{displayName}</p>}
            <p className="font-mono text-sm break-all text-foreground">{sender}</p>
          </div>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-sm text-muted-foreground">主旨</p>
          <p className="font-bold text-base text-foreground">{subject}</p>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-base leading-relaxed text-foreground break-all whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
