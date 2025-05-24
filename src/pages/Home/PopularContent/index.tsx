import { Loader } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MaxContentWidth } from "../../../components/MaxContentWidth";
import { ProductCard } from "../../../components/ProductCard";
import { productsApi } from "../../../lib/api";
import { LoadMoreContainer, PopularListContainer } from "./styles";

export const PopularContent = () => {
  const loadMoreElementRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const currentPage = useRef(1);

  const loadMoreItems = useCallback(async () => {
    currentPage.current += 1;
    setLoading(true);

    try {
      const newProducts = await productsApi.getProducts(currentPage.current);
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error("Error loading products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const targetNode = loadMoreElementRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const node = entries[0];

        if (node.isIntersecting) {
          loadMoreItems();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (targetNode) {
      observer.observe(targetNode);
    }

    return () => {
      if (targetNode) {
        observer.unobserve(targetNode);
      }
    };
  }, [loadMoreItems]);

  return (
    <MaxContentWidth>
      <PopularListContainer>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            voteCount={item.voteCount}
            voted={item.voted}
            onVote={() => console.log("Voted!")}
          />
        ))}
        <LoadMoreContainer ref={loadMoreElementRef}>
          <Loader className="load-icon" />
          <p>Loading products...</p>
        </LoadMoreContainer>
      </PopularListContainer>
    </MaxContentWidth>
  );
};
