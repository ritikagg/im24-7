import { useCallback, useEffect, useState } from "react";
import { Photo } from "../types/types";

const ITEMS_PER_PAGE = 40;

export const useInfinitePhotos = (isInfiniteScrollActive: boolean) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMorePhotos = useCallback(async () => {
    if (!isInfiniteScrollActive || loading || !hasMore) return;

    setLoading(true);
    try {
      const API_BASE_URL = "https://jsonplaceholder.typicode.com";
      const API_ENDPOINT = "/photos";
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINT}?_page=${page}&_limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) throw new Error("Failed to fetch photos");
      const newPhotos: Photo[] = await response.json();

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => {
          const uniqueNewPhotos = newPhotos.filter(
            (newPhoto) => !prevPhotos.some((photo) => photo.id === newPhoto.id)
          );
          return [...prevPhotos, ...uniqueNewPhotos];
        });
        setPage((prevPage) => prevPage + 1);
      }
      setError(null);
    } catch (err) {
      setError("Error fetching photos. Please try again later.");
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  }, [isInfiniteScrollActive, loading, hasMore, page]);

  useEffect(() => {
    if (isInfiniteScrollActive && photos.length === 0) {
      loadMorePhotos();
    }
  }, [isInfiniteScrollActive, photos.length, loadMorePhotos]);

  const resetPhotos = useCallback(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  return { photos, loading, error, hasMore, loadMorePhotos, resetPhotos };
};
