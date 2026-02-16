"use client";

import { GlowLine } from "@/atoms";
import {
  Checkbox,
  CommandInput,
  MultiSelect,
  RadioGroup,
  SearchInput,
  Section,
  SectionHeading,
  Select,
  Textarea,
  Toggle,
} from "@/molecules";

export function FormsTab() {
  return (
    <>
      {/* Command Input */}
      <Section spacing="lg">
        <SectionHeading subtitle="Interactive terminal command input.">
          Command Input
        </SectionHeading>

        <div className="mt-12 max-w-xl">
          <CommandInput placeholder="enter command..." />
        </div>
      </Section>

      <GlowLine />

      {/* Form Elements */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Terminal-styled form controls with built-in state management.">
          Form Elements
        </SectionHeading>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Checkbox */}
          <div className="space-y-3 border border-border p-6">
            <Checkbox label="CHECKBOX" defaultChecked>
              Enable notifications
            </Checkbox>
            <Checkbox>Auto-deploy on merge</Checkbox>
            <Checkbox disabled>Maintenance mode</Checkbox>
          </div>

          {/* RadioGroup */}
          <div className="space-y-3 border border-border p-6">
            <RadioGroup
              label="RADIO_GROUP"
              defaultValue="production"
              options={[
                { value: "production", label: "Production" },
                { value: "staging", label: "Staging" },
                { value: "development", label: "Development" },
              ]}
            />
          </div>

          {/* Toggle */}
          <div className="space-y-3 border border-border p-6">
            <Toggle label="TOGGLE" defaultChecked>
              Dark mode
            </Toggle>
            <Toggle>Verbose logging</Toggle>
            <Toggle disabled>Read-only mode</Toggle>
          </div>

          {/* Select */}
          <div className="space-y-3 border border-border p-6">
            <Select
              label="SELECT"
              placeholder="choose region..."
              options={[
                { value: "us-east-1", label: "US East (N. Virginia)" },
                { value: "us-west-2", label: "US West (Oregon)" },
                { value: "eu-west-1", label: "EU (Ireland)" },
                { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
              ]}
            />
          </div>

          {/* MultiSelect */}
          <div className="space-y-3 border border-border p-6">
            <MultiSelect
              label="MULTI_SELECT"
              placeholder="select services..."
              options={[
                { value: "compute", label: "Compute" },
                { value: "storage", label: "Storage" },
                { value: "network", label: "Network" },
                { value: "security", label: "Security" },
              ]}
            />
          </div>

          {/* SearchInput */}
          <div className="space-y-3 border border-border p-6">
            <SearchInput label="SEARCH_INPUT" placeholder="search nodes..." />
          </div>
        </div>

        {/* Textarea - full width */}
        <div className="mt-8 max-w-xl">
          <Textarea
            label="TEXTAREA"
            placeholder="enter command output..."
            rows={3}
            autoResize
          />
        </div>
      </Section>
    </>
  );
}
