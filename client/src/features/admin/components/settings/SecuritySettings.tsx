import React from "react";
import { SectionHeader, ToggleGroup, InputGroup } from "./FormControls";

interface SecuritySettingsProps {
  onInputChange: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  onInputChange,
}) => {
  return (
    <div className="space-y-8 max-w-3xl">
      <SectionHeader
        title="Access Control"
        description="Manage login and session security."
      />
      <div className="space-y-6">
        <ToggleGroup
          label="Enforce Two-Factor Authentication (2FA)"
          description="Require 2FA for all admin accounts."
          defaultChecked={true}
          onChange={onInputChange}
        />
        <InputGroup
          label="Session Timeout (Available)"
          type="number"
          defaultValue="60"
          onChange={onInputChange}
        />
        <InputGroup
          label="Max Login Attempts"
          type="number"
          defaultValue="3"
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default SecuritySettings;
