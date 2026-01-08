import React from "react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SettingsSidebarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="w-64 flex-none overflow-y-auto custom-scrollbar pr-2">
      <div className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? "bg-sextary text-white shadow-md"
                : "text-(--color-quinary)/60 hover:bg-gray-100 hover:text-(--color-sextary)"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsSidebar;
