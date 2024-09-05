import { useCallback, useState } from "react";
import { Photo } from "../types/types";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filterPhotos = useCallback((photos: Photo[], term: string) => {
    if (!term) return photos;
    return photos.filter((photo) =>
      photo.title.toLowerCase().includes(term.toLowerCase())
    );
  }, []);

  return { searchTerm, handleSearch, filterPhotos };
};
