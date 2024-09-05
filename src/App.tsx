import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  ErrorMessage,
  Header,
  LoadingSpinner,
  Pagination,
  ProductGallery,
  Switch,
} from "./components";

import { useInfinitePhotos, usePhotos, useSearch, useSorting } from "./hooks";
import { Photo } from "./types/types";

const App: React.FC = () => {
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);

  const {
    photos: paginatedPhotos,
    loading: paginatedLoading,
    error: paginatedError,
    currentPage,
    totalPages,
    handlePageChange,
    resetPage,
  } = usePhotos();

  const {
    photos: infinitePhotos,
    loading: infiniteLoading,
    error: infiniteError,
    hasMore,
    loadMorePhotos,
    resetPhotos,
  } = useInfinitePhotos(useInfiniteScroll);

  const { sortOrder, isSorting, handleSort, sortPhotos } = useSorting();
  const { searchTerm, handleSearch, filterPhotos } = useSearch();

  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const photos = useInfiniteScroll ? infinitePhotos : paginatedPhotos;
    const filteredPhotos = filterPhotos(photos, searchTerm);
    const sortedPhotos = sortPhotos(filteredPhotos);
    setDisplayedPhotos(sortedPhotos);
  }, [
    useInfiniteScroll,
    infinitePhotos,
    paginatedPhotos,
    searchTerm,
    sortPhotos,
    filterPhotos,
  ]);

  const loading = useInfiniteScroll ? infiniteLoading : paginatedLoading;
  const error = useInfiniteScroll ? infiniteError : paginatedError;

  const headerProps = useMemo(
    () => ({
      searchTerm,
      setSearchTerm: handleSearch,
      sortOrder,
      onSort: handleSort,
      isSorting,
      useInfiniteScroll,
      setUseInfiniteScroll,
    }),
    [
      searchTerm,
      handleSearch,
      sortOrder,
      handleSort,
      isSorting,
      useInfiniteScroll,
    ]
  );

  const paginationProps = useMemo(
    () => ({
      currentPage,
      totalPages,
      onPageChange: handlePageChange,
    }),
    [currentPage, totalPages, handlePageChange]
  );

  const handleToggleInfiniteScroll = useCallback(
    (checked: boolean) => {
      setUseInfiniteScroll(checked);
      if (checked) {
        resetPhotos();
      } else {
        resetPage();
      }
      window.scrollTo(0, 0);
    },
    [resetPhotos, resetPage]
  );

  const handleLoadMore = useCallback(() => {
    if (useInfiniteScroll && hasMore && !infiniteLoading) {
      loadMorePhotos();
    }
  }, [useInfiniteScroll, hasMore, infiniteLoading, loadMorePhotos]);

  return (
    <div className="App flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-end">
          <Switch
            checked={useInfiniteScroll}
            onChange={handleToggleInfiniteScroll}
            label={useInfiniteScroll ? "Infinite Scroll" : "Pagination"}
          />
        </div>

        <ErrorMessage error={error} />
        <ContentArea
          loading={loading}
          photos={displayedPhotos}
          useInfiniteScroll={useInfiniteScroll}
          hasMore={hasMore}
          loadMorePhotos={handleLoadMore}
          isLoadingMore={false}
        />
      </main>

      {!useInfiniteScroll && (
        <footer className="mt-auto py-4 bg-gray-100">
          <Pagination {...paginationProps} />
        </footer>
      )}
    </div>
  );
};

interface ContentAreaProps {
  loading: boolean;
  photos: Photo[];
  useInfiniteScroll: boolean;
  hasMore: boolean;
  loadMorePhotos: () => void;
  isLoadingMore: boolean;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  loading,
  photos,
  useInfiniteScroll,
  hasMore,
  loadMorePhotos,
  isLoadingMore,
}) => {
  if (loading && photos.length === 0) {
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

  return (
    <ProductGallery
      photos={photos}
      useInfiniteScroll={useInfiniteScroll}
      hasMore={hasMore}
      loadMorePhotos={loadMorePhotos}
      loading={false}
    />
  );
};

export default App;
