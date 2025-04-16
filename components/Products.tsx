import { Category, Product } from "@/sanity.types";

import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";

interface ProductsProps {
  products: Product[];
  categories: Category[];
}

const Products = ({ products, categories }: ProductsProps) => {
  return (
    <div>
      <div>
        <CategorySelector categories={categories} />
      </div>
      <div>
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
