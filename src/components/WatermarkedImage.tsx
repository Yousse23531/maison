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
  
  const getWatermarkPositionClasses = () => {
    switch (watermarkPosition) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'diagonal':
        return 'absolute inset-0 flex items-center justify-center pointer-events-none';
      default:
        return 'bottom-4 right-4';
    }
  };

  const getWatermarkSizeClasses = () => {
    switch (watermarkSize) {
      case 'small':
        return watermarkPosition === 'diagonal' ? 'text-2xl lg:text-3xl' : 'text-xs px-2 py-1';
      case 'large':
        return watermarkPosition === 'diagonal' ? 'text-4xl lg:text-5xl' : 'text-base px-4 py-2';
      default:
        return watermarkPosition === 'diagonal' ? 'text-3xl lg:text-4xl' : 'text-sm px-3 py-1.5';
    }
  };

  const getOpacityClasses = () => {
    switch (watermarkOpacity) {
      case 'light':
        return 'opacity-20';
      case 'strong':
        return 'opacity-60';
      default:
        return 'opacity-30';
    }
  };

  // Diagonal watermark
  if (watermarkPosition === 'diagonal') {
    return (
      <div className="relative inline-block w-full h-full">
        <ImageWithFallback
          src={src}
          alt={alt}
          className={className}
        />
        <div 
          className={`${getWatermarkPositionClasses()}`}
          style={{
            transform: 'rotate(-45deg)',
            transformOrigin: 'center center'
          }}
        >
          <div 
            className={`text-white ${getWatermarkSizeClasses()} ${getOpacityClasses()} 
                       font-bold tracking-[0.3em] select-none
                       drop-shadow-2xl`}
            style={{ 
              fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.1)',
              letterSpacing: '0.25em'
            }}
          >
            MAISON RUSTIQUE
          </div>
        </div>
      </div>
    );
  }

  // Regular positioned watermark
  return (
    <div className="relative inline-block w-full h-full">
      <ImageWithFallback
        src={src}
        alt={alt}
        className={className}
      />
      <div 
        className={`absolute ${getWatermarkPositionClasses()} ${getWatermarkSizeClasses()} 
                   bg-white/90 text-gray-800 rounded-lg backdrop-blur-sm
                   font-bold tracking-wide shadow-lg border border-white/50`}
        style={{ 
          fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)' 
        }}
      >
        MAISON RUSTIQUE
      </div>
    </div>
  );
}