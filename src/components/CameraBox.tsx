"use client";

import { useProctor } from "@/context/ProctorContext";
import { useScreenMonitor } from "@/hooks/useScreenMonitor";
import React, { useCallback, useEffect, useRef, useState } from "react";
  

export default function CameraBox() {
  const [hasMultiScreens, setHasMultiScreens] = useState(false);
  const { setScreenHasErrors } = useProctor();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { screenInfo } = useScreenMonitor();

  // Brightness detection
  // This will capture the video stream and calculate average brightness
  const {setLightingHasErrors} = useProctor()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const getAverageBrightness = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (context) {
        // Set canvas dimensions to match video to avoid distortion
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the pixel data from the canvas
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data; // This is a Uint8ClampedArray

        let totalBrightness = 0;
        let pixelCount = 0;

        // Iterate over pixels (skipping some for performance if needed)
        // Each pixel has R, G, B, A components (4 bytes)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate perceived brightness (luminance)
          // A common formula for luminance is: 0.299*R + 0.587*G + 0.114*B
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
          totalBrightness += brightness;
          pixelCount++;
        }

        const averageBrightness = totalBrightness / pixelCount;
        // console.log("Average Brightness:", averageBrightness);
        
        // if brightness is less than 110, setLightingHasError to true
        if (averageBrightness < 110) {
          setLightingHasErrors?.(true);
        }
        else {
          setLightingHasErrors?.(false);
        }
      }
    }
  }, [setLightingHasErrors]);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          // Start brightness detection after the video stream is ready
          videoRef.current.onloadedmetadata = () => {
            intervalIdRef.current = setInterval(getAverageBrightness, 5000);
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    enableCamera();
  }, [getAverageBrightness]);

  useEffect(() => {
    // check screens
    if (screenInfo.isMultiMonitor) {
      setHasMultiScreens(true);
      setScreenHasErrors(true);
    } else {
      setHasMultiScreens(false);
      setScreenHasErrors(false);
    }
  }, [screenInfo, setScreenHasErrors]);

  return (
    <div
      className={`relative overflow-hidden w-[275px] h-[168px] ${
        hasMultiScreens ? "border-[3px] border-red-main" : "border border-primary"
      } rounded-[10px]`}
    >
      {hasMultiScreens && (
        <div className="absolute top-0 left-0 px-3 h-6 text-sm bg-light-red-bg text-white flex items-center rounded-[5px] mx-[3px] my-[1px] text-[10px]">
          Desktop detected
        </div>
      )}
      <div className="w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          autoPlay
          playsInline
        />
        <canvas ref={canvasRef} className="hidden"></canvas> {/* Hidden canvas */}
      </div>
    </div>
  );
}
