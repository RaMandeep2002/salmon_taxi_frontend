import { FC } from "react";
import { IconType } from "react-icons"; // or appropriate icon library type

type MenuItemProps = {
  icon: IconType;
  label: string;
  onClick: () => void;
};

export const MenuItem: FC<MenuItemProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-zinc-800 dark:hover:bg-gray-800 text-gray-800 hover:text-white rounded-md"
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </div>
      </button>
    </div>
  );
};
