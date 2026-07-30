"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ImageWithSkeleton({
  src,
  alt,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0">
          <Skeleton height="100%" width="100%" />
        </div>
      )}
      <CldImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes={sizes || "(max-width: 640px) 100vw, 50vw"}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
