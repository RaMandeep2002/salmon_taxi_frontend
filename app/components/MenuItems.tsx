import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isCollapsed?: boolean;
}

export function MenuItem({ icon: Icon, label, onClick, isCollapsed }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-yellow-500 hover:text-white transition-colors",
        isCollapsed && "justify-center"
      )}
    >
      <Icon size={20} />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </button>
  );
}
