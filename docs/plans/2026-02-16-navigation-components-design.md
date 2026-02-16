# Navigation Components Design

Two independent navigation molecules — a horizontal Navbar and a vertical Sidebar — both with two-level hierarchy.

## Shared Types

```ts
interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: NavItem[];
  disabled?: boolean;
}
```

- `id` for active state tracking
- `href` optional — renders `<a>` if provided, `<button>` otherwise
- `children` provides second level (dropdowns in Navbar, nested groups in Sidebar)
- `icon` required for Sidebar collapsed rail, optional for Navbar

## Navbar

Horizontal top bar molecule.

### Props

```ts
interface NavbarProps {
  items: NavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onNavigate?: (id: string) => void;
  logo?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
```

### Behavior

- Sticky top, full-width, `bg-background/80 backdrop-blur`
- Logo slot left, nav items center-left, actions slot right
- Top-level items: horizontal links/buttons, `font-display` uppercase tracking
- Active item: `text-accent` + bottom border accent glow
- Dropdowns: open on hover (~150ms delay), toggle on click for touch. Close on mouse leave, outside click, or Escape. Panel styled like Select dropdown (`border-border bg-card shadow-lg`)
- Uncontrolled by default (internal `activeId` state), controllable via `activeId` + `onNavigate`
- `onNavigate` fires with clicked item's `id` for both top-level and child items
- Desktop only — no hamburger/mobile menu

## Sidebar

Vertical navigation molecule.

### Props

```ts
interface SidebarProps {
  items: NavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onNavigate?: (id: string) => void;
  header?: {
    logo: ReactNode;
    collapsedLogo: ReactNode;
  };
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}
```

### Behavior

- Fixed height (`h-screen`), `border-r border-border`, `bg-card`
- **Expanded:** ~240px wide. Header shows `logo`. Nav items show icon + label. Second-level items indent below parent when group is open.
- **Collapsed:** ~56px wide (icon rail). Header shows `collapsedLogo`. Only icons visible. Hover shows tooltip with label. Parent items show flyout panel with children on hover.
- **Collapse toggle:** Built-in chevron button at bottom. Also controllable via `collapsed`/`onCollapsedChange`.
- **Group expand:** Click parent item toggles child list (expanded mode). Collapsed mode uses hover flyout.
- Active item: `bg-accent/10 text-accent`
- Smooth width transition between states
- Uncontrolled by default for both `activeId` and `collapsed`

## Navigation Tab Showcase

Replace the `navigation.tsx` placeholder with demos:

- **Navbar demo:** Sample items (Dashboard, Systems with dropdown children, Reports, Settings), logo text, theme switcher in actions slot. Wrapped in bordered container to avoid conflicting with actual page header.
- **Sidebar demo:** Two sidebars side by side — one expanded, one collapsed — with sample items (Overview, Monitoring with children, Logs, Config). Each in a fixed-height container (~400px).

Both demos share the same `NavItem` type.

## Approach

Two independent molecules (Approach A). No coupling between them. Shared `NavItem` type definition. Matches existing project pattern where components are self-contained.
