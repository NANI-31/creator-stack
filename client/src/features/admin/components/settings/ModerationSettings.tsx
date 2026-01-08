import React from "react";
import {
  SectionHeader,
  InputGroup,
  SelectGroup,
  ToggleGroup,
} from "./FormControls";

interface ModerationSettingsProps {
  onInputChange: () => void;
}

const ModerationSettings: React.FC<ModerationSettingsProps> = ({
  onInputChange,
}) => {
  return (
    <div className="space-y-8 max-w-3xl">
      <SectionHeader
        title="Moderation Thresholds"
        description="Automated safety actions."
      />
      <div className="space-y-6">
        <InputGroup
          label="Report Threshold for Auto-Hide"
          type="number"
          defaultValue="5"
          helperText="Content received this many reports will be hidden automatically."
          onChange={onInputChange}
        />
        <SelectGroup
          label="Comment Moderation Level"
          options={["None", "Filter Profanity", "Hold All for Review"]}
          onChange={onInputChange}
        />
        <ToggleGroup
          label="Require Admin Approval for New Users"
          description="New users must be vetted before posting."
          defaultChecked={false}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default ModerationSettings;
