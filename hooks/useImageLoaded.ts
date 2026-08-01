import { useEffect, useRef, useState } from "react";

/** Tracks whether an <img>/<Image> has finished loading, for skeleton/fade-in
 * placeholders. Checks `.complete` on mount to cover images the browser
 * already had cached before React attached the ref. */
export function useImageLoaded<T extends HTMLImageElement = HTMLImageElement>() {
  const imgRef = useRef<T>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return { imgRef, loaded, onLoad: () => setLoaded(true) };
}
