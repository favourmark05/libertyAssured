"use client";

import { useEffect, useState } from "react";

export function useLightingStatus(videoRef: React.RefObject<HTMLVideoElement>) {
  const [lighting, setLighting] = useState<"good" | "bad" | "unknown">("unknown");

  useEffect(() => {
    if (!videoRef.current) return;

    const evaluateLighting = (): "good" | "bad" => {
      const video = videoRef.current!;
      if (!video.videoWidth || !video.videoHeight) return "bad";

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return "bad";

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      let brightnessSum = 0;
      let pixelCount = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        brightnessSum += brightness;
        pixelCount++;
      }

      const avgBrightness = brightnessSum / pixelCount;

      let varianceSum = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        const diff = brightness - avgBrightness;
        varianceSum += diff * diff;
      }

      const variance = varianceSum / pixelCount;

      return avgBrightness < 40 || variance < 15 ? "bad" : "good";
    };

    const interval = setInterval(() => {
      const result = evaluateLighting();
      setLighting(result);
    }, 1000);

    return () => clearInterval(interval);
  }, [videoRef]);

  return lighting;
}
