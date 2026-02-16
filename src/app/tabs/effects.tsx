"use client";

import {
  FadeIn,
  GlowLine,
  HudLabel,
  ScrollProgressBar,
  TypewriterText,
} from "@/atoms";
import { Section, SectionHeading } from "@/molecules";
import { ScrollEffectsDemo } from "@/app/scroll-effects-demo";

export function EffectsTab() {
  return (
    <>
      {/* Scroll Progress */}
      <Section spacing="lg">
        <SectionHeading subtitle="Horizontal progress indicator driven by scroll position.">
          Scroll Progress
        </SectionHeading>

        <div className="mt-12 max-w-xl space-y-4">
          <HudLabel>INLINE_PROGRESS</HudLabel>
          <ScrollProgressBar showLabel />
        </div>
      </Section>

      <GlowLine />

      {/* FadeIn Directions */}
      <Section spacing="lg">
        <SectionHeading subtitle="Scroll-triggered fade-in from different directions.">
          Fade In
        </SectionHeading>

        <div className="mt-12 grid grid-cols-2 gap-6 max-w-xl">
          <FadeIn direction="up">
            <div className="border border-border p-6 text-center">
              <HudLabel>FADE_UP</HudLabel>
            </div>
          </FadeIn>
          <FadeIn direction="down">
            <div className="border border-border p-6 text-center">
              <HudLabel>FADE_DOWN</HudLabel>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div className="border border-border p-6 text-center">
              <HudLabel>FADE_LEFT</HudLabel>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div className="border border-border p-6 text-center">
              <HudLabel>FADE_RIGHT</HudLabel>
            </div>
          </FadeIn>
        </div>
      </Section>

      <GlowLine />

      {/* TypewriterText */}
      <Section spacing="lg">
        <SectionHeading subtitle="Character-by-character text reveal animation.">
          Typewriter Text
        </SectionHeading>

        <div className="mt-12 max-w-xl">
          <p className="font-display text-lg">
            <TypewriterText speed={40} delay={500}>
              Initializing data terminal...
            </TypewriterText>
          </p>
        </div>
      </Section>

      <GlowLine />

      {/* Scroll Effects Demo */}
      <ScrollEffectsDemo />
    </>
  );
}
