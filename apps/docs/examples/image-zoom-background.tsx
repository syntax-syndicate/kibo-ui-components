'use client';

import { cn } from '@/lib/utils';
import { ImageZoom } from '@repo/image-zoom';
import Image from 'next/image';

const Example = () => (
  <ImageZoom
    backdropClassName={cn(
      '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80'
    )}
  >
    <Image
      alt="Placeholder image"
      src="https://placehold.co/1200x800"
      width={1200}
      height={800}
      unoptimized
      className="h-auto w-96"
    />
  </ImageZoom>
);

export default Example;
