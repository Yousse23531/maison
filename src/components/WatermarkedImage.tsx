import { ImageWithFallback } from './figma/ImageWithFallback';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  watermarkPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center' | 'diagonal';
  watermarkSize?: 'small' | 'medium' | 'large';
  watermarkOpacity?: 'light' | 'medium' | 'strong';
}

export function WatermarkedImage({ 
  src, 
  alt, 
  className = '', 
  watermarkPosition = 'diagonal',
  watermarkSize = 'medium',
  watermarkOpacity = 'medium'
}: WatermarkedImageProps) {
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className={className}
    />
  );
}