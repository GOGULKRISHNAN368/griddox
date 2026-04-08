import React from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
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
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      {...props}
    />
  );
};

export default OptimizedImage;
