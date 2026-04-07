// ─── NAV SCROLL / ROUTE CONFIG ────────────────────────────────────────────────
// Maps each nav label to either a hash (scroll) or a path (route navigation).
// "hash" scrolls to an element with that id on the home page.
// "path" navigates to a route.
export const NAV_TARGETS: Record<string, { type: "hash" | "path"; value: string }> = {
  HOME:           { type: "path",  value: "/" },
  NEW:            { type: "hash",  value: "new-arrivals" },
  SHOP:           { type: "hash",  value: "shop" },
  "TRACK ORDER":  { type: "path",  value: "/track-order" },
  "STORE LOCATOR":{ type: "path",  value: "/store-locator" },
  "ABOUT US":     { type: "hash",  value: "about" },
};
// ───────────────────────────────────────────────────────────────────────────────
