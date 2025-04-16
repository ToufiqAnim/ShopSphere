// export const dynamic = "force-static";
// export const revalidate = 900;

import Products from "@/components/Products";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProdcuts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  // console.log(
  //   crypto.randomUUID().slice(0, 6) + ` products lenght ${products.length}`
  // );
  // console.log(products, categories);
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col   items-center justify-top min-h-screen p-4">
        <Products products={products} categories={categories} />
      </div>
    </div>
  );
}
