import { useCallback, useState } from "react";
import { Photo } from "../types/types";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const filterPhotos = useCallback((photos: Photo[], term: string) => {
    if (!term) return photos;
    return photos.filter((photo) =>
      photo.title.toLowerCase().includes(term.toLowerCase())
    );
  }, []);

  return { searchTerm, handleSearch, filterPhotos };
};
