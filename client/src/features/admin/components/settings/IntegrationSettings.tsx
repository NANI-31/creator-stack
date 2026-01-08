import React from "react";
import { SectionHeader, InputGroup } from "./FormControls";

interface IntegrationSettingsProps {
  onInputChange: () => void;
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({
  onInputChange,
}) => {
  return (
    <div className="space-y-8 max-w-3xl">
      <SectionHeader
        title="External Services"
        description="Connect third-party tools."
      />
      <div className="space-y-6">
        <InputGroup
          label="SMTP Host"
          placeholder="smtp.example.com"
          onChange={onInputChange}
        />
        <InputGroup
          label="Google Analytics ID"
          placeholder="UA-XXXXX-Y"
          onChange={onInputChange}
        />
        <InputGroup
          label="Slack Webhook URL"
          placeholder="https://hooks.slack.com/..."
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default IntegrationSettings;
