"use client";

import React, { useEffect, useState } from "react";
import IconBox from "./IconBox";
import { useProctor } from "@/context/ProctorContext";

export default function Mic() {
  const [state, setState] = useState("");
  const { setMicHasErrors } = useProctor();

  const checkMicAndCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      return { mic: true };
    } catch (err) {
      console.error("Microphone access error:", err);
      return { mic: false };
    }
  };
  useEffect(() => {
    const checkDevices = async () => {
      const { mic } = await checkMicAndCamera();
      if (mic) {
        setState("success");
        setMicHasErrors(false);
      } else {
        setState("error");
        setMicHasErrors(true);
      }
    };
    checkDevices();
    // Set an interval to check the mic status periodically
    const interval = setInterval(async () => {
      checkDevices();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <IconBox
      icon="monitor"
      size="xl"
      color="purple-1"
      title="Gadget mic"
      state={state}
    />
  );
}
