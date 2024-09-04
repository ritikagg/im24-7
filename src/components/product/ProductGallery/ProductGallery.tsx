import React from "react";
import { Photo } from "../../../types/types";
import ProductItem from "../ProductItem";

interface ProductGalleryProps {
  photos: Photo[];
}

const ProductGallery: React.FC<ProductGalleryProps> = React.memo(
  ({ photos }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos.map((photo) => (
          <div key={`photo-${photo.albumId}-${photo.id}`} className="h-full">
            <ProductItem photo={photo} />
          </div>
        ))}
      </div>
    );
  }
);

export default ProductGallery;
