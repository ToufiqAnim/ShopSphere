import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("ShopSphere")
    .items([
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("order").title("Orders"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !["post", "category", "order"].includes(item.getId()!)
      ),
    ]);
