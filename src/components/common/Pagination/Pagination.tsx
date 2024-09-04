import React from "react";
import { CaretLeft, CaretRight } from "../../icons/Icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <nav className="flex justify-end items-center mr-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={`px-3 py-1 rounded ${
          currentPage <= 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-gray-400`}
        aria-label="Previous page"
      >
        <CaretLeft />
      </button>
      <span className="mx-4 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`px-3 py-1 rounded ${
          currentPage >= totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-gray-400`}
        aria-label="Next page"
      >
        <CaretRight />
      </button>
    </nav>
  );
};

export default Pagination;
