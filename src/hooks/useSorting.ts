import { useCallback, useState } from "react";
import { Photo } from "../types/types";

export const useSorting = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const handleSort = useCallback(() => {
    setIsSorting(true);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setTimeout(() => setIsSorting(false), 300);
  }, []);

  const sortPhotos = useCallback(
    (photos: Photo[]) => {
      return [...photos].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
    },
    [sortOrder]
  );

  return { sortOrder, isSorting, handleSort, sortPhotos };
};
