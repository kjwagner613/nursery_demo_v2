import { useState, useEffect } from "react";
import "..//index.css"; // Import your CSS file

const ProductGallery = ({ images, onImageChange }) => {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    const newIndex = (index + 1) % images.length;
    setIndex(newIndex);
    onImageChange(images[newIndex]); // ✅ Updates product details
  };

  const prevImage = () => {
    const newIndex = (index - 1 + images.length) % images.length;
    setIndex(newIndex);
    onImageChange(images[newIndex]); // ✅ Updates product details
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  return (
    <div>
      <img src={images[index]} alt={`Product Image ${index + 1}`} />
      <button onClick={prevImage}>← Prev</button>
      <button onClick={nextImage}>Next →</button>
    </div>
  );
};

export default ProductGallery;