export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface ProductItemProps {
  photo: Photo;
}

export interface ProductGalleryProps {
  photos: Photo[];
  lastPhotoElementRef: (node: HTMLDivElement | null) => void;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onSort: () => void;
}
