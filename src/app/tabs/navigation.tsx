import { BlinkingCursor, HudLabel } from "@/atoms";
import { Section } from "@/molecules";

export function NavigationTab() {
  return (
    <Section spacing="xl">
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
        <HudLabel>MODULE::NAVIGATION</HudLabel>
        <p className="font-display text-lg text-foreground/30">
          COMING SOON <BlinkingCursor />
        </p>
        <p className="max-w-md text-center text-sm text-foreground/20">
          Navbar, sidebar, breadcrumbs, footer, and pagination components.
        </p>
      </div>
    </Section>
  );
}
