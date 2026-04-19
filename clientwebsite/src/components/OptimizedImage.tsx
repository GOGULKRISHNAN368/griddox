import React from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  isProductImage?: boolean;
}

/**
 * OptimizedImage Component
 * 
 * Features:
 * 1. Automatic loading strategy (lazy for below-the-fold, eager for priority)
 * 2. High fetching priority for Hero images
 * 3. Modern decoding for faster main thread execution
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className, 
  priority = false, 
  isProductImage = false,
  onClick,
  ...props 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isProductImage) {
      // Show promotional modal, without stopping propagation if they're clicking a link
      window.dispatchEvent(new CustomEvent('openPromoModal', { detail: { src } }));
    }
    if (onClick) onClick(e);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onClick={handleClick}
      {...props}
    />
  );
};

export default OptimizedImage;
