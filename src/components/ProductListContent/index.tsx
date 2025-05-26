import { useCallback, useRef } from "react";
import { useObserver } from "../../hooks/useObserver";
import type { FetchProductsResult, Product } from "../../interfaces/products";
import { LoadingIcon } from "../LoadingIcon";
import { MaxContentWidth } from "../MaxContentWidth";
import { ProductCard } from "../ProductCard";
import { LoadMoreContainer, ProductsListContainer } from "./styles";

type PopularContentProps = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  fetcher: (cursor: string | null) => Promise<FetchProductsResult>;
  handleVote: (index: number) => void;
};

export const ProductListContent = ({
  setProducts,
  products,
  fetcher,
  handleVote,
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
      // TODO: Handle error appropriately
      console.error("Error loading products:", error);
      hasMoreRef.current = false;
    }
  }, [setProducts, fetcher]);

  const observableRef = useObserver<HTMLDivElement>(loadMoreItems);

  // TODO: Add virtualization to improve performance
  return (
    <MaxContentWidth>
      <ProductsListContainer>
        {products.map((item, index) => (
          <ProductCard
            key={item.id}
            {...item}
            onVote={() => handleVote(index)}
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
