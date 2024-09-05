import { useCallback, useState } from "react";
import { Photo } from "../types/types";

type SortOrder = "asc" | "desc";

export const useSorting = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isSorting, setIsSorting] = useState(false);

  const handleSort = useCallback(() => {
    setIsSorting(true);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsSorting(false), 300);
  }, []);

  const sortPhotos = useCallback(
    (photos: Photo[]) => {
      const sortedPhotos = [...photos].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
      return sortedPhotos;
    },
    [sortOrder]
  );

  return { sortOrder, isSorting, handleSort, sortPhotos };
};
