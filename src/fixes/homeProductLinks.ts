// ─── HOME PRODUCT LINK MAP ─────────────────────────────────────────────────────
// Maps each NewIn product id to its category slug and product id in categoryProducts.ts
// so clicking a home page product opens its detail page (same as the shop catalogue).
export const HOME_PRODUCT_LINKS: Record<number, { categorySlug: string; productId: string }> = {
  1: { categorySlug: "peplum-co-ords",   productId: "pc1" },
  2: { categorySlug: "cotton-kurti-set", productId: "ck1" },
  3: { categorySlug: "raw-silk-set",     productId: "rs1" },
  4: { categorySlug: "cotton-kurti-set", productId: "ck2" },
};
// ───────────────────────────────────────────────────────────────────────────────
