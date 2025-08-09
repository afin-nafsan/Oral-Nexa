import React from 'react';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

type BrandLogoProps = {
  className?: string;
  height?: number; // in px
};

export const BrandLogo: React.FC<BrandLogoProps> = ({ className, height = 44 }) => {
  const sources = React.useMemo(() => ['/logo.svg', '/logo.png', '/logo.jpg', '/logo.jpeg'], []);
  const [index, setIndex] = React.useState(0);
  const src = sources[index];

  if (src) {
    return (
      <img
        src={src}
        alt="Oral Nexa logo"
        style={{ height }}
        className={cn('block w-auto', className)}
        onError={() => setIndex((i) => (i + 1 < sources.length ? i + 1 : sources.length))}
      />
    );
  }

  const iconSize = Math.max(20, Math.round(height * 0.6));
  return (
    <div className={cn('flex items-center space-x-3 leading-none', className)} style={{ height }}>
      <div className="bg-blue-600 rounded-lg flex items-center justify-center" style={{ width: iconSize, height: iconSize }}>
        <Heart className="text-white" style={{ width: iconSize * 0.7, height: iconSize * 0.7 }} />
      </div>
      <span className="font-bold text-gray-900" style={{ fontSize: Math.round(height * 0.6) }}>
        Oral Nexa
      </span>
    </div>
  );
};


