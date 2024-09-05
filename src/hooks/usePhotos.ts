import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "../types/types";

const ITEMS_PER_PAGE = 20;

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const initialFetchDone = useRef(false);

  const fetchPhotos = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const API_BASE_URL = "https://jsonplaceholder.typicode.com";
      const API_ENDPOINT = "/photos";
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINT}?_page=${page}&_limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) throw new Error("Failed to fetch photos");
      const fetchedPhotos: Photo[] = await response.json();
      setPhotos(fetchedPhotos);

      // Get total count from headers
      const totalCount = parseInt(
        response.headers.get("x-total-count") || "0",
        10
      );
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));

      setError(null);
    } catch (err) {
      setError("Error fetching photos. Please try again later.");
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchPhotos(currentPage);
      initialFetchDone.current = true;
    }
  }, [fetchPhotos, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setCurrentPage(page);
        fetchPhotos(page);
      }
    },
    [currentPage, fetchPhotos]
  );

  const resetPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      fetchPhotos(1);
    }
  }, [currentPage, fetchPhotos]);

  return {
    photos,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    resetPage,
  };
};
