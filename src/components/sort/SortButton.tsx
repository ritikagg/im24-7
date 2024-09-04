import React from "react";
import { ArrowClockwiseIcon, DownArrowIcon, UpArrowIcon } from "../icons/Icons";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onSort: () => void;
  isSorting: boolean;
}

export const SortButton: React.FC<SortButtonProps> = ({
  sortOrder,
  onSort,
  isSorting,
}) => {
  return (
    <button
      onClick={onSort}
      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
      disabled={isSorting}
      title={`Sort by ID (${sortOrder === "asc" ? "Ascending" : "Descending"})`}
    >
      {isSorting ? (
        <div className="animate-spin">
          <ArrowClockwiseIcon />
        </div>
      ) : sortOrder === "asc" ? (
        <DownArrowIcon />
      ) : (
        <UpArrowIcon />
      )}
      <span className="ml-2 hidden sm:inline">Sort by ID</span>
    </button>
  );
};
