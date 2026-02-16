# Form Elements Design

Date: 2026-02-16

## Summary

Add 7 form components to the Data Terminal design system: Checkbox, RadioGroup, Toggle, Select, MultiSelect, SearchInput, and Textarea. All follow existing patterns (molecules, design tokens, `cn()`, `className` prop).

## Decisions

- **State model:** Uncontrolled by default (internal state), controllable via optional `value`/`onChange` props
- **Style:** Web controls with terminal skin (not CLI-native bracket selectors)
- **Labels:** Built-in optional `label` prop renders `HudLabel` above each control
- **Structure:** Individual files in `src/molecules/`, no subfolder
- **Interaction:** Native HTML elements where possible for free accessibility/keyboard support

## Components

### 1. Checkbox (`checkbox.tsx`)

Styled native `<input type="checkbox">`. Square box with `border-border`, accent fill + glow when checked. Supports disabled state.

**Props:** `label?`, `checked?`, `defaultChecked?`, `onChange?`, `disabled?`, `className?`

### 2. RadioGroup (`radio-group.tsx`)

Container wrapping native `<input type="radio">` elements. Circular indicator, accent dot when selected. Vertical layout.

**Props:** `label?`, `options: { value, label }[]`, `value?`, `defaultValue?`, `onChange?`, `disabled?`, `name?`, `className?`

### 3. Toggle (`toggle.tsx`)

Sliding switch with hidden checkbox for accessibility. Pill-shaped track, round thumb with accent glow when active.

**Props:** `label?`, `checked?`, `defaultChecked?`, `onChange?`, `disabled?`, `className?`

### 4. Select (`select.tsx`)

Custom dropdown: `<button>` trigger + positioned overlay panel. Trigger styled like CommandInput with chevron icon. Panel with `bg-card`, accent hover states. Closes on outside click and Escape.

**Props:** `label?`, `options: { value, label }[]`, `value?`, `defaultValue?`, `onChange?`, `placeholder?`, `disabled?`, `className?`

### 5. MultiSelect (`multi-select.tsx`)

Like Select but multiple selections. Trigger shows Badge components for selected items or count. Dropdown options have checkboxes. Doesn't close on selection.

**Props:** `label?`, `options: { value, label }[]`, `value?`, `defaultValue?`, `onChange?`, `placeholder?`, `disabled?`, `className?`

### 6. SearchInput (`search-input.tsx`)

Search icon prefix instead of `>`, clear (X) button when text present. Optional debounced `onSearch` callback.

**Props:** `label?`, `placeholder?`, `value?`, `defaultValue?`, `onSearch?`, `onChange?`, `debounceMs?`, `className?`

### 7. Textarea (`textarea.tsx`)

Multi-line terminal-styled input. Monospace accent text, auto-resize optional.

**Props:** `label?`, `placeholder?`, `value?`, `defaultValue?`, `onChange?`, `rows?`, `maxRows?`, `autoResize?`, `className?`

## Shared Patterns

- All use `cn()` for class merging, accept `className`
- All use design tokens (`--border`, `--accent`, `--accent-glow`, etc.)
- Focus/hover: `border-hover` transition
- Disabled: reduced opacity, `pointer-events-none`
- Optional `label` renders `<HudLabel>` above control
- Uncontrolled default, controllable via `value`/`onChange`

## Showcase

Each component gets a showcase section on `page.tsx` in a new "Form Elements" section between "Command Input" and "CTA Terminal Prompt."
