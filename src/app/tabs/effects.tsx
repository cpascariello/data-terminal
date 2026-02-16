"use client";

import {
  DotGrid,
  FadeIn,
  GlowLine,
  HudLabel,
  ScrollProgressBar,
  TypewriterText,
} from "@/atoms";
import { Section, SectionHeading } from "@/molecules";
import { useParallax } from "@/hooks/use-parallax";
import { StickySectionDemo } from "@/app/sticky-section-demo";

function ParallaxDemo() {
  const slow = useParallax<HTMLDivElement>({ speed: 0.8 });
  const medium = useParallax<HTMLDivElement>({ speed: 0.5 });
  const fast = useParallax<HTMLDivElement>({ speed: 0.2 });

  return (
    <div className="relative h-64 overflow-hidden border border-border">
      <DotGrid />
      <div className="relative flex h-full items-center justify-center gap-8">
        <div
          ref={slow.ref}
          style={slow.style}
          className="flex h-16 w-16 items-center justify-center border border-border bg-foreground/[0.04]"
        >
          <div className="text-center">
            <HudLabel>0.8x</HudLabel>
            <span className="block font-display text-[10px] text-foreground/40">SLOW</span>
          </div>
        </div>
        <div
          ref={medium.ref}
          style={medium.style}
          className="flex h-20 w-20 items-center justify-center border border-accent/30 bg-accent/5"
        >
          <div className="text-center">
            <HudLabel>0.5x</HudLabel>
            <span className="block font-display text-[10px] text-foreground/40">MEDIUM</span>
          </div>
        </div>
        <div
          ref={fast.ref}
          style={fast.style}
          className="flex h-24 w-24 items-center justify-center border border-primary/30 bg-primary/5"
        >
          <div className="text-center">
            <HudLabel>0.2x</HudLabel>
            <span className="block font-display text-[10px] text-foreground/40">FAST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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

      {/* Parallax */}
      <Section spacing="lg">
        <SectionHeading subtitle="Scroll-driven displacement at varying speeds.">
          Parallax
        </SectionHeading>

        <div className="mt-12 max-w-xl">
          <ParallaxDemo />
        </div>
      </Section>

      <GlowLine />

      {/* Scroll Effects Demo */}
      <StickySectionDemo />
    </>
  );
}
