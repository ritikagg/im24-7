import React, { useMemo } from "react";
import "./App.css";
import {
  ErrorMessage,
  Header,
  LoadingSpinner,
  Pagination,
  ProductGallery,
} from "./components";

import { usePhotos, useSearch, useSorting } from "./hooks";
import { Photo } from "./types/types";

const App: React.FC = () => {
  const { photos, loading, error, currentPage, totalPages, handlePageChange } =
    usePhotos();

  const { sortOrder, isSorting, handleSort, sortPhotos } = useSorting();
  const { searchTerm, handleSearch, filterPhotos } = useSearch();

  const filteredAndSortedPhotos = useMemo(() => {
    return sortPhotos(filterPhotos(photos, searchTerm));
  }, [photos, searchTerm, sortPhotos, filterPhotos]);

  const headerProps = useMemo(
    () => ({
      searchTerm,
      setSearchTerm: handleSearch,
      sortOrder,
      onSort: handleSort,
      isSorting,
    }),
    [searchTerm, handleSearch, sortOrder, handleSort, isSorting]
  );

  const paginationProps = useMemo(
    () => ({
      currentPage,
      totalPages,
      onPageChange: handlePageChange,
    }),
    [currentPage, totalPages, handlePageChange]
  );

  return (
    <div className="App flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ErrorMessage error={error} />
        <ContentArea loading={loading} photos={filteredAndSortedPhotos} />
      </main>
      <footer className="mt-auto py-4 bg-gray-100">
        <Pagination {...paginationProps} />
      </footer>
    </div>
  );
};

interface ContentAreaProps {
  loading: boolean;
  photos: Photo[];
}

const ContentArea: React.FC<ContentAreaProps> = ({ loading, photos }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No photos found. Try adjusting your search.
      </p>
    );
  }

  return <ProductGallery photos={photos} />;
};

export default App;
