import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

export const getAllCategories =
  async (): Promise<ALL_CATEGORIES_QUERYResult> => {
    const ALL_CATEGORIES_QUERY = defineQuery(
      `*[_type == "category"] | order(name asc)`
    );
    try {
      const categories = await sanityFetch({
        query: ALL_CATEGORIES_QUERY,
      });
      return categories.data || [];
    } catch (error) {
      console.log("Error fetching all categories", error);
      return [];
    }
  };
