"use client";

import React, { useEffect, useState } from "react";
import IconBox from "./IconBox";
import { useProctor } from "@/context/ProctorContext";


export default function Webcam() {
  const [state, setState] = useState("");
  const { setCameraHasErrors } = useProctor();

  const checkCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop()); 
      return { camera: true };
    } catch (err) {
      console.error("Camera access error:", err);
      return { camera: false };
    }
  };

  useEffect(() => {
    const checkDevices = async () => {
      const { camera } = await checkCamera();
      if (camera) {
        setState("success");
        setCameraHasErrors(false)
      } else {
        setState("error");
        setCameraHasErrors(true)
      }
    };

    checkDevices();

    // Set an interval to check the camera status periodically
    const interval = setInterval(async () => {
      checkDevices();
    }, 5000);

    return () => clearInterval(interval);

  }, []); 

  return (
    <div>
      <IconBox
        icon="monitor"
        size="xl"
        color="purple-1"
        title="Webcam"
        state={state}
      />
    </div>
  );
}

