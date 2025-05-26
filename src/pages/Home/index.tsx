import { useState } from "react";
import { HomeHeader } from "../../components/HomeHeader";
import { ProductListContent } from "../../components/ProductListContent";
import { Tab } from "../../components/Tab";
import type { Product } from "../../interfaces/products";
import { productsApi } from "../../lib/api";

export const Home = () => {
  const [products, setProducts] = useState({
    popular: [] as Product[],
    newests: [] as Product[],
  });

  const handleUpdatePopularProducts = (newProducts: Product[]) => {
    setProducts((prev) => ({
      ...prev,
      popular: [...prev.popular, ...newProducts],
    }));
  };

  const handleUpdateNewestProducts = (newProducts: Product[]) => {
    setProducts((prev) => ({
      ...prev,
      newests: [...prev.newests, ...newProducts],
    }));
  };

  return (
    <main>
      <HomeHeader />

      <Tab
        items={[
          {
            label: "Popular",
            content: (
              <ProductListContent
                fetcher={productsApi.fetchPopularProducts}
                products={products.popular}
                setProducts={handleUpdatePopularProducts}
              />
            ),
            key: "popular",
          },
          {
            label: "Newest",
            content: (
              <ProductListContent
                fetcher={productsApi.fetchNewestProducts}
                products={products.newests}
                setProducts={handleUpdateNewestProducts}
              />
            ),
            key: "newest",
          },
        ]}
      />
    </main>
  );
};
