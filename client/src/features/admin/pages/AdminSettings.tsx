import React, { useState } from "react";
import {
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineBell,
  HiOutlineLockClosed,
  HiOutlinePuzzle,
  HiOutlineDatabase,
} from "react-icons/hi";

// Modular Components
import SettingsSidebar from "../components/settings/SettingsSidebar";
import GeneralSettings from "../components/settings/GeneralSettings";
import SubmissionSettings from "../components/settings/SubmissionSettings";
import ModerationSettings from "../components/settings/ModerationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import IntegrationSettings from "../components/settings/IntegrationSettings";
import UnsavedChangesFooter from "../components/settings/UnsavedChangesFooter";

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  const tabs = [
    { id: "general", label: "General", icon: <HiOutlineCog /> },
    {
      id: "submissions",
      label: "Submission Rules",
      icon: <HiOutlineDocumentText />,
    },
    { id: "moderation", label: "Moderation", icon: <HiOutlineShieldCheck /> },
    { id: "users", label: "Users & Roles", icon: <HiOutlineUserGroup /> },
    { id: "notifications", label: "Notifications", icon: <HiOutlineBell /> },
    { id: "security", label: "Security", icon: <HiOutlineLockClosed /> },
    { id: "integrations", label: "Integrations", icon: <HiOutlinePuzzle /> },
    { id: "advanced", label: "Advanced", icon: <HiOutlineDatabase /> },
  ];

  const handleDiscard = () => {
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-in fade-in duration-500 overflow-hidden">
      {/* Header */}
      <div className="flex-none mb-6">
        <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight">
          Platform Settings
        </h1>
        <p className="text-(--color-quinary)/60 font-medium">
          Configure global platform behavior and rules.
        </p>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        <SettingsSidebar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-32">
            {activeTab === "general" && (
              <GeneralSettings onInputChange={handleInputChange} />
            )}
            {activeTab === "submissions" && (
              <SubmissionSettings onInputChange={handleInputChange} />
            )}
            {activeTab === "moderation" && (
              <ModerationSettings onInputChange={handleInputChange} />
            )}
            {activeTab === "security" && (
              <SecuritySettings onInputChange={handleInputChange} />
            )}
            {activeTab === "integrations" && (
              <IntegrationSettings onInputChange={handleInputChange} />
            )}

            {/* Fallback for other tabs */}
            {["users", "notifications", "advanced"].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center p-12 text-center text-gray-400">
                <HiOutlinePuzzle size={48} className="mb-4 opacity-50" />
                <p className="font-bold">
                  This section is currently under development.
                </p>
              </div>
            )}
          </div>

          {/* Sticky Footer */}
          {hasUnsavedChanges && (
            <UnsavedChangesFooter
              onDiscard={handleDiscard}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
