import React from "react";
import {
  SectionHeader,
  ToggleGroup,
  InputGroup,
  SelectGroup,
} from "./FormControls";

interface SubmissionSettingsProps {
  onInputChange: () => void;
}

const SubmissionSettings: React.FC<SubmissionSettingsProps> = ({
  onInputChange,
}) => {
  return (
    <div className="space-y-8 max-w-3xl">
      <SectionHeader
        title="Submission Rules"
        description="Control how users submit content."
      />
      <div className="space-y-6">
        <ToggleGroup
          label="Auto-Approve Submissions"
          description="Automatically publish submissions without review."
          defaultChecked={false}
          onChange={onInputChange}
        />
        <ToggleGroup
          label="Duplicate URL Detection"
          description="Prevent users from submitting existing links."
          defaultChecked={true}
          onChange={onInputChange}
        />
        <div className="grid grid-cols-2 gap-6">
          <InputGroup
            label="Max Submissions per User/Day"
            type="number"
            defaultValue="5"
            onChange={onInputChange}
          />
          <SelectGroup
            label="Allowed Website Types"
            options={["All", "HTTPS Only"]}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmissionSettings;
