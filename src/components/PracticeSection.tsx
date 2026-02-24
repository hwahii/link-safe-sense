import { ReactNode } from "react";
import { Pencil } from "lucide-react";

interface PracticeSectionProps {
  children: ReactNode;
}

const PracticeSection = ({ children }: PracticeSectionProps) => (
  <div className="mt-8 border-t border-border pt-6">
    <p className="font-bold text-lg mb-2 flex items-center gap-2">
      <Pencil className="w-5 h-5" />
      馬上來練習
    </p>
    {children}
  </div>
);

export default PracticeSection;
