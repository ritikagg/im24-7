import React, { useCallback, useEffect, useState } from "react";
import { Photo } from "../../types/types";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import { XIcon } from "../icons/Icons";

interface ProductDetailsProps {
  photo: Photo;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ photo, onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = photo.url;
    img.onload = () => {
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
    };
  }, [photo.url]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{photo.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon />
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-auto mb-4 rounded"
            />
            <p className="mb-2">
              <strong>ID:</strong> {photo.id}
            </p>
            <p className="mb-2">
              <strong>Album ID:</strong> {photo.albumId}
            </p>
            <p className="mb-2">
              <strong>Thumbnail URL:</strong>{" "}
              <a
                href={photo.thumbnailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {photo.thumbnailUrl}
              </a>
            </p>
            <p>
              <strong>Full Image URL:</strong>{" "}
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {photo.url}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
