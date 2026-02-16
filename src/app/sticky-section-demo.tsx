"use client";

import {
  GlowLine,
  ProgressBar,
  StatusDot,
} from "@/atoms";
import {
  SectionHeading,
  StickySection,
  TerminalCard,
} from "@/molecules";

export function StickySectionDemo() {
  return (
    <>
      <GlowLine />

      <StickySection steps={3}>
        {({ activeStep, progress }) => (
          <div className="flex h-full flex-col items-center justify-center pb-[300px] px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Scroll-driven effects that respond to viewport position.">
              Scroll Effects
            </SectionHeading>
            <div className="mt-12 w-full max-w-2xl">
              <TerminalCard
                tag="SVC:SCROLL"
                label={`step_${activeStep + 1}`}
              >
                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-3">
                    <StatusDot
                      color={
                        activeStep === 0
                          ? "bg-accent"
                          : activeStep === 1
                            ? "bg-warning"
                            : "bg-success"
                      }
                    />
                    <span className="font-display text-lg font-bold text-foreground">
                      {activeStep === 0
                        ? "Fade In"
                        : activeStep === 1
                          ? "Parallax Layers"
                          : "Sticky Sections"}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/50">
                    {activeStep === 0
                      ? "Elements fade in as they enter the viewport. CSS scroll-driven animations where supported, with IntersectionObserver fallback."
                      : activeStep === 1
                        ? "Background layers move at different speeds during scroll, creating depth. Uses rAF-throttled scroll listeners with configurable speed."
                        : "Sections pin in place while content scrolls through them. Combines sticky positioning with scroll progress tracking."}
                  </p>
                  <ProgressBar value={Math.round(progress * 100)} />
                </div>
              </TerminalCard>
            </div>
          </div>
        )}
      </StickySection>

      <GlowLine />
    </>
  );
}
