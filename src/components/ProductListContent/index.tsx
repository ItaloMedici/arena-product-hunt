import { Loader } from "lucide-react";
import { useCallback, useRef } from "react";
import { useObserver } from "../../hooks/useObserver";
import type { Product } from "../../interfaces/products";
import type { FetchProductsResult } from "../../lib/api";
import { MaxContentWidth } from "../MaxContentWidth";
import { ProductCard } from "../ProductCard";
import { LoadMoreContainer, ProductsListContainer } from "./styles";

type PopularContentProps = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  fetcher: (cursor: string | null) => Promise<FetchProductsResult>;
};

export const ProductListContent = ({
  setProducts,
  products,
  fetcher,
}: PopularContentProps) => {
  const nextCursorRef = useRef<string>(null);
  const hasMoreRef = useRef(true);

  const loadMoreItems = useCallback(async () => {
    if (!hasMoreRef.current) {
      return;
    }

    try {
      const { pageInfo, products } = await fetcher(nextCursorRef.current);

      setProducts(products);

      hasMoreRef.current = pageInfo.hasNextPage;
      nextCursorRef.current = pageInfo.nextCursor;
    } catch (error) {
      console.error("Error loading products:", error);
      hasMoreRef.current = false;
    }
  }, [setProducts, fetcher]);

  const observableRef = useObserver<HTMLDivElement>(loadMoreItems);

  return (
    <MaxContentWidth>
      <ProductsListContainer>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            onVote={() => console.log("Voted!")}
          />
        ))}
        <LoadMoreContainer ref={observableRef}>
          <LoadingIcon />
          <p>Loading products...</p>
        </LoadMoreContainer>
      </ProductsListContainer>
    </MaxContentWidth>
  );
};
