import React from "react";
import "./FlipDeckGallery.css";

const FlipDeckGallery = ({
  products,
  currentProductIndex,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  const handleNextImage = () => {
    const images = products[currentProductIndex]?.images || [];
    if (images.length === 0) return;
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    const images = products[currentProductIndex]?.images || [];
    if (images.length === 0) return;
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flip-deck-container">
      <div className="flip-deck">
        <div className="flip-card active">
          <img
            src={products[currentProductIndex]?.images[currentImageIndex]}
            alt={products[currentProductIndex]?.name}
            className="flip-card-image"
          />
        </div>
      </div>
      <div className="flip-controls">
        <button onClick={handlePrevImage} aria-label="Previous image">
          ← Prev Image
        </button>
        <button onClick={handleNextImage} aria-label="Next image">
          Next Image →
        </button>
      </div>
      </div>
    );
  };
  
  export default FlipDeckGallery;