"use client";

import { useEffect, type RefObject } from "react";

/** Plays/pauses a background video based on viewport visibility — with 8 of
 * these on one page, letting every one autoplay regardless of scroll position
 * wastes bandwidth and CPU for no visible benefit. */
export function useAutoplayInView(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef]);
}
