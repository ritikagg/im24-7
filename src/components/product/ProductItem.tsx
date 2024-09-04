import React, { useState } from "react";

import { useDelayedHover } from "../../hooks";
import { Photo } from "../../types/types";
import LazyImage from "../common/LazyImage/LazyImage";
import ProductDetails from "./ProductDetails";

interface ProductItemProps {
  photo: Photo;
}

const ProductItem: React.FC<ProductItemProps> = React.memo(({ photo }) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useDelayedHover(
    300,
    100
  );
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <div
        className={`
          relative cursor-pointer
          bg-white rounded-lg shadow-md overflow-hidden
          transition-all duration-300 ease-in-out
          h-full
          ${isHovered ? "z-10" : "z-0"}
        `}
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transformOrigin: "center center",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="relative pt-[75%] w-full">
          <LazyImage
            src={photo.thumbnailUrl}
            alt={photo.title}
            className={`
              absolute top-0 left-0 w-full h-full object-cover
              ${
                isHovered
                  ? "blur-md transition-all duration-300 ease-in-out"
                  : "transition-none"
              }
            `}
          />
        </div>
        <div
          className={`p-2 sm:p-4 ${
            isHovered
              ? "blur-md transition-all duration-300 ease-in-out"
              : "transition-none"
          }`}
        >
          <h2
            className={`
              font-semibold mb-1
              line-clamp-2
              ${isHovered ? "text-xs sm:text-sm" : "text-sm sm:text-base"}
              ${
                isHovered
                  ? "transition-all duration-300 ease-in-out"
                  : "transition-none"
              }
            `}
          >
            {photo.title}
          </h2>
          <p className="text-xs text-gray-600">ID: {photo.id}</p>
          <p className="text-xs text-gray-600">Album ID: {photo.albumId}</p>
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-white bg-opacity-90 p-2 sm:p-4 flex flex-col justify-center">
            <h2 className="text-xs sm:text-sm font-semibold mb-2">
              {photo.title}
            </h2>
            <p className="text-xs">ID: {photo.id}</p>
            <p className="text-xs">Album ID: {photo.albumId}</p>
          </div>
        )}
      </div>
      {showDetails && (
        <ProductDetails photo={photo} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
});

export default ProductItem;
