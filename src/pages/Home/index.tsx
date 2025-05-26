import { useCallback, useState } from "react";
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

  const handleUpdateProducts = useCallback(
    (type: "popular" | "newests") => (newProducts: Product[]) => {
      setProducts((prev) => ({
        ...prev,
        [type]: [...prev[type], ...newProducts],
      }));
    },
    []
  );

  const handleVote = useCallback(
    (type: "popular" | "newests") => (index: number) => {
      setProducts((prev) => {
        const updatedProducts = [...prev[type]];

        updatedProducts[index].voted = !updatedProducts[index].voted;
        updatedProducts[index].voteCount += updatedProducts[index].voted
          ? 1
          : -1;

        console.log(updatedProducts[index].voted);

        return {
          ...prev,
          [type]: updatedProducts,
        };
      });
    },
    [setProducts]
  );

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
                setProducts={handleUpdateProducts("popular")}
                handleVote={handleVote("popular")}
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
                setProducts={handleUpdateProducts("newests")}
                handleVote={handleVote("newests")}
              />
            ),
            key: "newest",
          },
        ]}
      />
    </main>
  );
};
