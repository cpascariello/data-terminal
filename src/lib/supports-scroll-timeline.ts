let cached: boolean | undefined;

export function supportsScrollTimeline(): boolean {
  if (cached === undefined) {
    cached =
      typeof CSS !== "undefined" &&
      CSS.supports("animation-timeline", "view()");
  }
  return cached;
}
