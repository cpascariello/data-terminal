# Mega Dropdown Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a full-viewport-width mega dropdown variant to the Navbar component with structured slots (heading, links/description, optional featured items).

**Architecture:** Extend `NavItem` type with an optional `mega` field. When present, `NavbarItem` renders a `NavbarMegaDropdown` panel instead of the compact dropdown. The mega panel uses a two-column layout (left: navigation links or description, right: optional featured cards). All new components are internal to the Navbar module.

**Tech Stack:** React, TypeScript, Tailwind CSS 4, Next.js 16 (App Router), lucide-react icons.

---

### Task 1: Extend the NavItem type

**Files:**
- Modify: `src/types/nav.ts`

**Step 1: Add mega dropdown types to nav.ts**

Add these types before the existing `NavItem` interface, then add the `mega` field to `NavItem`:

```typescript
export interface MegaDropdownFeatured {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href?: string;
}

export interface MegaDropdownConfig {
  heading?: string;
  description?: string;
  links?: NavItem[];
  featured?: MegaDropdownFeatured[];
}
```

Add to the `NavItem` interface (after `children`):

```typescript
  mega?: MegaDropdownConfig;
```

**Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS (no usages of `mega` yet)

**Step 3: Commit**

```bash
git add src/types/nav.ts
git commit -m "feat(nav): add MegaDropdownConfig type to NavItem"
```

---

### Task 2: Add mega dropdown internal components to Navbar

**Files:**
- Modify: `src/molecules/navbar.tsx`

This task adds three internal components and updates `NavbarItem` to use them. The hover/click/escape/click-outside logic already exists in `NavbarItem` — we reuse it. The mega panel is positioned differently (full-width, relative to the `<nav>` instead of the trigger).

**Step 1: Add NavbarMegaLink component**

Add this component after `NavbarDropdownItem` (around line 70):

```tsx
function NavbarMegaLink({
  item,
  isActive,
  onSelect,
}: {
  item: NavItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  const classes = cn(
    "block py-1.5 font-display text-xs uppercase tracking-wider transition-colors",
    isActive
      ? "text-accent"
      : "text-foreground/50 hover:text-foreground",
    item.disabled && "pointer-events-none opacity-40",
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={classes}
        onClick={onSelect}
        aria-disabled={item.disabled}
      >
        {item.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onSelect}
      disabled={item.disabled}
    >
      {item.label}
    </button>
  );
}
```

**Step 2: Add NavbarMegaFeatured component**

Add this after `NavbarMegaLink`:

```tsx
function NavbarMegaFeatured({
  item,
}: {
  item: MegaDropdownFeatured;
}) {
  const content = (
    <div className="group/featured overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden bg-foreground/[0.03]">
        <img
          src={item.image}
          alt={item.title}
          className="size-full object-cover transition-transform duration-500 group-hover/featured:scale-105"
        />
      </div>
      <div className="mt-3">
        <p className="font-display text-xs uppercase tracking-wider text-foreground">
          {item.title}
        </p>
        {item.subtitle && (
          <p className="mt-1 text-xs text-foreground/40">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (item.href) {
    return <a href={item.href}>{content}</a>;
  }

  return content;
}
```

**Step 3: Add NavbarMegaDropdown component**

Add this after `NavbarMegaFeatured`. Note the `import type { MegaDropdownFeatured } from "@/types/nav"` must be added to the import at the top of the file.

```tsx
function NavbarMegaDropdown({
  mega,
  activeId,
  onNavigate,
  onClose,
}: {
  mega: MegaDropdownConfig;
  activeId: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const hasFeatured = mega.featured && mega.featured.length > 0;
  const hasLinks = mega.links && mega.links.length > 0;

  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 w-full",
        "border-b border-border bg-background shadow-lg",
      )}
    >
      <div
        className={cn(
          "flex",
          hasFeatured ? "flex-row" : "flex-col",
        )}
      >
        {/* Left column: heading + links or description */}
        <div
          className={cn(
            "shrink-0 px-8 py-8",
            hasFeatured
              ? "w-64 border-r border-border bg-foreground/[0.02]"
              : "w-full",
          )}
        >
          {mega.heading && (
            <p className="mb-4 font-display text-[10px] uppercase tracking-widest text-foreground/30">
              {mega.heading}
            </p>
          )}
          {hasLinks && (
            <div className="flex flex-col gap-0.5">
              {mega.links!.map((link) => (
                <NavbarMegaLink
                  key={link.id}
                  item={link}
                  isActive={link.id === activeId}
                  onSelect={() => {
                    onNavigate(link.id);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}
          {mega.description && (
            <p className="text-sm leading-relaxed text-foreground/60">
              {mega.description}
            </p>
          )}
        </div>

        {/* Right area: featured items */}
        {hasFeatured && (
          <div className="flex-1 px-8 py-8">
            <div
              className={cn(
                "grid gap-8",
                mega.featured!.length === 1
                  ? "grid-cols-1 max-w-sm"
                  : "grid-cols-2",
              )}
            >
              {mega.featured!.map((feat) => (
                <NavbarMegaFeatured key={feat.id} item={feat} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 4: Update the import at the top of navbar.tsx**

Change:
```typescript
import { isItemActive, type NavItem } from "@/types/nav";
```
To:
```typescript
import {
  isItemActive,
  type MegaDropdownConfig,
  type MegaDropdownFeatured,
  type NavItem,
} from "@/types/nav";
```

**Step 5: Update NavbarItem to render mega dropdown**

In the `NavbarItem` component, determine if this item has a mega config. The `hasChildren` check should consider `mega` too. Replace the dropdown rendering section (lines ~236-255) with logic that checks `item.mega` first:

Change the `hasChildren` line from:
```typescript
const hasChildren = item.children && item.children.length > 0;
```
To:
```typescript
const hasMega = !!item.mega;
const hasChildren = hasMega || (item.children && item.children.length > 0);
```

Replace the dropdown panel rendering block:
```tsx
{hasChildren && open && (
  <div
    className={cn(
      "absolute left-0 top-full z-50 mt-0.5 min-w-48",
      "border border-border bg-card shadow-lg",
    )}
  >
    {item.children!.map((child) => (
      <NavbarDropdownItem
        key={child.id}
        item={child}
        isActive={child.id === activeId}
        onSelect={() => {
          onNavigate(child.id);
          setOpen(false);
        }}
      />
    ))}
  </div>
)}
```

With:
```tsx
{hasChildren && open && (
  hasMega ? (
    <NavbarMegaDropdown
      mega={item.mega!}
      activeId={activeId}
      onNavigate={onNavigate}
      onClose={() => setOpen(false)}
    />
  ) : (
    <div
      className={cn(
        "absolute left-0 top-full z-50 mt-0.5 min-w-48",
        "border border-border bg-card shadow-lg",
      )}
    >
      {item.children!.map((child) => (
        <NavbarDropdownItem
          key={child.id}
          item={child}
          isActive={child.id === activeId}
          onSelect={() => {
            onNavigate(child.id);
            setOpen(false);
          }}
        />
      ))}
    </div>
  )
)}
```

**Step 6: Fix mega panel positioning — make nav the positioning ancestor**

The mega dropdown needs to span the full `<nav>` width, not just the trigger button width. The `NavbarItem` wrapper `<div>` currently has `className="relative"` which makes the compact dropdown position relative to the trigger. For mega dropdowns this positioning ancestor must be the `<nav>` element instead.

In the `Navbar` component, change the `<nav>` element to add `relative`:
```tsx
<nav
  className={cn(
    "sticky top-0 z-40 w-full",
    "border-b border-border bg-background/80 backdrop-blur-md",
    className,
  )}
>
```
Change to:
```tsx
<nav
  className={cn(
    "relative sticky top-0 z-40 w-full",
    "border-b border-border bg-background/80 backdrop-blur-md",
    className,
  )}
>
```

Then in `NavbarItem`, make the container `static` for mega items so the panel positions relative to the `<nav>`:

Change:
```tsx
<div
  ref={containerRef}
  className="relative"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
```
To:
```tsx
<div
  ref={containerRef}
  className={hasMega ? "static" : "relative"}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
```

**Step 7: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

**Step 8: Commit**

```bash
git add src/molecules/navbar.tsx
git commit -m "feat(navbar): add mega dropdown panel rendering"
```

---

### Task 3: Update the navigation preview demo

**Files:**
- Modify: `src/app/tabs/navigation.tsx`

**Step 1: Add a mega dropdown item to NAVBAR_ITEMS**

Update the `NAVBAR_ITEMS` array in `navigation.tsx` to include a nav item with a `mega` config. Replace the current `NAVBAR_ITEMS` definition with:

```tsx
const NAVBAR_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard" },
  {
    id: "systems",
    label: "Systems",
    mega: {
      heading: "Infrastructure",
      links: [
        { id: "sys-compute", label: "Compute", icon: <Cpu size={14} /> },
        { id: "sys-database", label: "Database", icon: <Database size={14} /> },
        { id: "sys-network", label: "Network", icon: <Shield size={14} /> },
      ],
      featured: [
        {
          id: "feat-status",
          title: "System Status",
          subtitle: "All services operational",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=450&fit=crop",
        },
        {
          id: "feat-perf",
          title: "Performance",
          subtitle: "Real-time monitoring dashboard",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop",
        },
      ],
    },
  },
  {
    id: "reports",
    label: "Reports",
    mega: {
      heading: "Analytics",
      description:
        "Access system reports, audit logs, and historical performance data across all infrastructure nodes.",
      links: [
        { id: "rep-daily", label: "Daily Summary" },
        { id: "rep-audit", label: "Audit Log" },
        { id: "rep-perf", label: "Performance" },
      ],
    },
  },
  { id: "settings", label: "Settings" },
];
```

This gives us two mega dropdowns to demo: one with featured items (Systems) and one without (Reports).

**Step 2: Run dev server and visually verify**

Run: `pnpm dev`

Navigate to the preview page, click the Navigation tab. Hover/click "Systems" — should see a full-width panel with "Infrastructure" heading, three links on the left, and two image cards on the right. Hover/click "Reports" — should see a panel with "Analytics" heading, description text, and three links, no featured images (single column).

**Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

**Step 4: Commit**

```bash
git add src/app/tabs/navigation.tsx
git commit -m "feat(navbar): add mega dropdown demo to navigation preview"
```

---

### Task 4: Visual polish and interaction refinement

**Files:**
- Modify: `src/molecules/navbar.tsx`

After visually testing, apply any needed polish. Known items to check:

**Step 1: Verify hover zone continuity**

The mega panel must be part of the same hover zone as the trigger. Since the `NavbarItem` container wraps both the trigger and the dropdown (compact or mega), mouse movement from trigger to panel should keep the panel open. For mega dropdowns the container is `static` so it doesn't constrain the panel — but the panel is still a child of the container div, so `onMouseEnter`/`onMouseLeave` events should bubble correctly.

Test by slowly moving the mouse from the trigger text down into the mega panel. If the panel closes, we need to adjust the hover zone (add an invisible bridge element between trigger and panel).

**Step 2: Verify backdrop blur on the nav doesn't affect the mega panel**

The `<nav>` has `bg-background/80 backdrop-blur-md`. The mega panel renders inside the nav. This should be fine since the panel has its own `bg-background`. Verify visually that the panel background is fully opaque.

**Step 3: Run build**

Run: `pnpm build`
Expected: PASS

**Step 4: Commit any polish changes**

```bash
git add src/molecules/navbar.tsx
git commit -m "fix(navbar): refine mega dropdown hover zones and styling"
```
