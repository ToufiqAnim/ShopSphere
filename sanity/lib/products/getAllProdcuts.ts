import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { ALL_PRODUCTS_QUERYResult } from "@/sanity.types";

export const getAllProducts = async (): Promise<ALL_PRODUCTS_QUERYResult> => {
  const ALL_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product"] | order(name asc)`
  );

  try {
    const response = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    return response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
