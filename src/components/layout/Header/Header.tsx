import React from "react";
import { SearchBar } from "../../search/SearchBar";
import { SortButton } from "../../sort/SortButton";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOrder: "asc" | "desc";
  onSort: () => void;
  isSorting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  onSort,
  isSorting,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 mr-4">
            Product Gallery
          </h1>
          <div className="flex-grow max-w-xl">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="ml-4">
            <SortButton
              sortOrder={sortOrder}
              onSort={onSort}
              isSorting={isSorting}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
