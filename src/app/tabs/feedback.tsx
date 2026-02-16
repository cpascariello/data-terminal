"use client";

import { DataStream, FadeIn, GlowLine, HudLabel, ProgressBar } from "@/atoms";
import { Alert, Section, SectionHeading } from "@/molecules";

export function FeedbackTab() {
  return (
    <>
      {/* Alerts */}
      <Section spacing="lg">
        <SectionHeading subtitle="System messages and feedback indicators.">
          Alerts
        </SectionHeading>

        <div className="mt-12 space-y-4">
          <Alert variant="info">
            System update available. Run &apos;update --latest&apos; to
            install.
          </Alert>
          <Alert variant="success">
            Deployment complete. All 256 nodes reporting healthy.
          </Alert>
          <Alert variant="warning">
            Memory usage at 87%. Consider scaling compute resources.
          </Alert>
          <Alert variant="error" dismissible>
            Connection to node_042 lost. Automatic failover initiated.
          </Alert>
        </div>
      </Section>

      <GlowLine />

      {/* Progress */}
      <Section spacing="lg">
        <SectionHeading subtitle="Determinate and indeterminate progress indicators.">
          Progress
        </SectionHeading>

        <div className="mt-12 max-w-xl space-y-8">
          <FadeIn>
            <div className="space-y-3">
              <HudLabel>DETERMINATE</HudLabel>
              <ProgressBar value={72} />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3">
              <HudLabel>INDETERMINATE</HudLabel>
              <ProgressBar indeterminate />
            </div>
          </FadeIn>
        </div>
      </Section>

      <GlowLine />

      {/* Data Stream */}
      <Section spacing="lg">
        <SectionHeading subtitle="Scrolling hex data visualization.">
          Data Stream
        </SectionHeading>

        <div className="mt-12">
          <div className="relative h-48 overflow-hidden border border-border">
            <DataStream columns={6} speed="fast" className="h-full" />
          </div>
        </div>
      </Section>
    </>
  );
}
