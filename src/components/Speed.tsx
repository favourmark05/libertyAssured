"use client";

import React, { useCallback, useEffect, useState } from "react";
import IconBox from "./IconBox";
import { useProctor } from "@/context/ProctorContext";

export default function Speed() {
  const [state, setState] = useState("");
  const { networkHasErrors, setNetworkHasErrors } = useProctor();

  const checkConnection = useCallback(async () => {
    const startTime = new Date().getTime();

    // A tiny, cached image (35 bytes)
    const TEST_URL = "https://jsonplaceholder.typicode.com/todos/1";


    try {
      // Add a cache-buster to ensure a fresh request and not a cached response
      const response = await fetch(`${TEST_URL}?_t=${startTime}`, {
        cache: "no-store",
      });

      if (response.ok) {
        setState("success");
        setNetworkHasErrors(false);
      } else {
        setState("error");
        setNetworkHasErrors(true);
      }
    } catch (error) {
      console.error("Connectivity check failed:", error);
      setState("error");
      setNetworkHasErrors(true);
    }
  }, []);

  useEffect(() => {
    checkConnection();

    const interval = setInterval(checkConnection, networkHasErrors ? 10000 : 30000); // Check every 30 seconds if connected and every 10 seconds if disconnected

    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);
    };
  }, []);

  return (
    <IconBox
      icon="wifi"
      size="xl"
      color="purple-1"
      title="Speed"
      state={state}
    />
  );
}
