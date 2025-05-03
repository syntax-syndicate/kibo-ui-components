'use client';

import { ImageZoom } from '@repo/image-zoom';
import Image from 'next/image';

const Example = () => (
  <ImageZoom zoomMargin={100}>
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
