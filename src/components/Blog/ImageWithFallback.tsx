import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string;
};

const DEFAULT_FALLBACK =
  'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';

export function ImageWithFallback({ fallback = DEFAULT_FALLBACK, ...rest }: Props) {
  const [src, setSrc] = React.useState(rest.src);
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      {...rest}
      src={src}
      loading={rest.loading ?? 'lazy'}
      onError={() => setSrc(fallback)}
    />
  );
}


