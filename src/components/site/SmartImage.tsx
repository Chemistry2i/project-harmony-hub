import { useEffect, useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

/** Image with a shimmering skeleton while loading and a graceful error state. */
export function SmartImage({ src, alt, className = "", imgClassName = "" }: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    setStatus("loading");
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-surface-low ${className}`}>
      {status !== "loaded" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface-low via-muted to-surface-low" />
      )}
      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <span className="material-symbols-outlined text-3xl">imagesmode</span>
          <span className="text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
