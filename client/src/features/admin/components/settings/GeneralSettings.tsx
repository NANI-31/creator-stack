import React from "react";
import { SectionHeader, InputGroup, SelectGroup } from "./FormControls";

interface GeneralSettingsProps {
  onInputChange: () => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ onInputChange }) => {
  return (
    <div className="space-y-8 max-w-3xl">
      <SectionHeader
        title="Platform Identity"
        description="Basic information about your community platform."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup
          label="Platform Name"
          defaultValue="CreatorStack"
          onChange={onInputChange}
        />
        <InputGroup
          label="Tagline"
          defaultValue="Curated tools for creators"
          onChange={onInputChange}
        />
        <div className="col-span-2">
          <InputGroup
            label="Description"
            type="textarea"
            defaultValue="The best place to discover tools..."
            onChange={onInputChange}
          />
        </div>
      </div>

      <div className="w-full h-px bg-gray-100" />

      <SectionHeader
        title="Localization"
        description="Time and language settings."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectGroup
          label="Default Language"
          options={["English", "Spanish", "French"]}
          onChange={onInputChange}
        />
        <SelectGroup
          label="Time Zone"
          options={["UTC", "PST", "EST", "IST"]}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
