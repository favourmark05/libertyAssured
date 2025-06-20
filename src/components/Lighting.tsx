"use client";

import React, { useEffect, useState } from "react";
import IconBox from "./IconBox";
import { useProctor } from "@/context/ProctorContext";

export default function Lighting() {
  const {lightingHasErrors} = useProctor()
  const [state, setState] = useState("");
  
  useEffect(() => {
    if (lightingHasErrors) {
      setState("error");
    }
    else {
      setState("success");
    }
  }, [lightingHasErrors]);
  

  return (
    <IconBox
      icon="lamp"
      size="xl"
      color="purple-1"
      title="Lighting"
      state={state}
    />
  );
}
