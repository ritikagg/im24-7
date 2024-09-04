import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "../types/types";

const ITEMS_PER_PAGE = 20;

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const fetchedRef = useRef<boolean>(false);

  const fetchPhotos = useCallback(async (page: number) => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    try {
      setLoading(true);
      const API_BASE_URL = "https://jsonplaceholder.typicode.com";
      const API_ENDPOINT = "/photos";
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINT}?_page=${page}&_limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) throw new Error("Failed to fetch photos");
      const data: Photo[] = await response.json();
      setPhotos(data);
      setError(null);

      const totalCount = response.headers.get("x-total-count");
      setTotalItems(totalCount ? parseInt(totalCount, 10) : 0);
    } catch (err) {
      setError("Error fetching photos. Please try again later.");
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [fetchPhotos, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    fetchedRef.current = false; // Reset the flag when page changes
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  return { photos, loading, error, currentPage, totalPages, handlePageChange };
};
