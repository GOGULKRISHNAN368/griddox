// ─── NAV SCROLL / ROUTE CONFIG ────────────────────────────────────────────────
export const NAV_TARGETS: Record<string, { type: "hash" | "path"; value: string }> = {
  HOME:       { type: "path", value: "/" },
  NEW:        { type: "hash", value: "new-arrivals" },
  SHOP:       { type: "hash", value: "shop" },
  "ABOUT US": { type: "hash", value: "about" },
};
// TRACK ORDER and STORE LOCATOR removed — track order is in account dashboard, store info is in About Us
// ───────────────────────────────────────────────────────────────────────────────
