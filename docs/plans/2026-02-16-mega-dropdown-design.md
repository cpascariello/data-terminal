# Mega Dropdown Design

## Context

The Navbar component currently has compact dropdown menus for items with `children`. We want to add a full-viewport-width "mega dropdown" variant inspired by the Lightweight bicycle website, where clicking/hovering a nav item reveals a large panel with structured content: a left column for navigation links or description text, and an optional right area for 1-2 featured items with images.

## Data Model

Extend `NavItem` with an optional `mega` field:

```typescript
interface MegaDropdownFeatured {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href?: string;
}

interface MegaDropdownConfig {
  heading?: string;
  description?: string;
  links?: NavItem[];
  featured?: MegaDropdownFeatured[];
}

interface NavItem {
  // ... existing fields unchanged
  mega?: MegaDropdownConfig;  // new
}
```

When `mega` is present, the Navbar renders a full-width mega panel instead of the compact dropdown. The `children` field is ignored if `mega` is set.

## Layout

- Full viewport width, positioned below the navbar
- Two-column layout when `featured` items are present:
  - Left column (~250px): heading + links list OR description text
  - Right area (remaining): featured item cards with images in a grid
- Single column when no `featured` items: heading + links/description fill the panel
- Left column has subtle background tint for visual separation
- Panel has bottom border and shadow

## Interaction

- Hover-with-delay + click toggle (same as current dropdowns)
- Hover zone extends to cover entire mega panel
- Escape key and click-outside close the panel
- Only one mega panel open at a time

## Component Structure

All changes stay in `Navbar.tsx` and `nav.ts`:
- New internal component `NavbarMegaDropdown` renders the panel
- `NavbarItem` checks `item.mega` to decide which dropdown variant to render
- `NavbarMegaLink` renders individual links in the left column
- `NavbarMegaFeatured` renders featured item cards

## Preview

Update the navigation tab demo to show a mega dropdown example alongside the existing compact dropdown demo.
