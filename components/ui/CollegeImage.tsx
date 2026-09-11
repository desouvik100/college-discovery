"use client";

import { useState } from "react";
import Image from "next/image";
import { getInitials } from "@/lib/utils";

interface CollegeImageProps {
  src?: string | null;
  imageUrl?: string | null;
  alt?: string | null;
  imageAlt?: string | null;
  collegeName?: string;
  name?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: "square" | "video" | "wide";
}

export default function CollegeImage({
  src,
  imageUrl,
  alt,
  imageAlt,
  collegeName,
  name,
  className = "",
  sizes = "(max-width: 768px) 100vw, 300px",
  priority = false,
  aspectRatio = "square",
}: CollegeImageProps) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = imageUrl !== undefined ? imageUrl : src;
  const altText = imageAlt !== undefined ? imageAlt : alt;
  const displayName = (name || collegeName || "Institution").trim();

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  if (!imageSrc || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-slate-100/90 border border-slate-200 text-slate-700 select-none overflow-hidden ${aspectClass} ${className}`}
        aria-label={displayName}
      >
        <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-600">
          {getInitials(displayName)}
        </span>
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-sans mt-0.5">
          Campus
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${aspectClass} ${className}`}>
      <Image
        src={imageSrc}
        alt={altText || `${displayName} campus`}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
