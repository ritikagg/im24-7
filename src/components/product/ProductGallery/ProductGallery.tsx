import React, { useCallback, useEffect, useRef } from "react";
import { Photo } from "../../../types/types";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import ProductItem from "../ProductItem";

interface ProductGalleryProps {
  photos: Photo[];
  useInfiniteScroll: boolean;
  hasMore: boolean;
  loadMorePhotos: () => void;
  loading: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  photos,
  useInfiniteScroll,
  hasMore,
  loadMorePhotos,
  loading,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadMorePhotos();
      }
    },
    [hasMore, loadMorePhotos, loading]
  );

  useEffect(() => {
    if (useInfiniteScroll) {
      const options = {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      };
      observer.current = new IntersectionObserver(handleObserver, options);
      if (loadingRef.current) {
        observer.current.observe(loadingRef.current);
      }
    } else if (observer.current) {
      observer.current.disconnect();
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [useInfiniteScroll, handleObserver]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id}>
            <ProductItem photo={photo} />
          </div>
        ))}
      </div>

      {useInfiniteScroll && (hasMore || loading) && (
        <div ref={loadingRef} className="col-span-full text-center py-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
