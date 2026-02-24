import { ReactNode } from "react";

interface KeyTakeawayProps {
  children: ReactNode;
  action?: ReactNode;
}

const KeyTakeaway = ({ children, action }: KeyTakeawayProps) => (
  <div className="mt-6 bg-primary/10 border-2 border-primary/30 rounded-xl p-5">
    <p className="text-xs font-bold tracking-widest text-primary/60 mb-2">📌 記住這個</p>
    <p className="font-bold text-primary text-lg">{children}</p>
    {action && (
      <p className="text-sm text-muted-foreground mt-2">{action}</p>
    )}
  </div>
);

export default KeyTakeaway;
