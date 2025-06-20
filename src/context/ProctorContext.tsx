"use client";

import { createContext, useContext, useState } from "react";

// Define an interface for the context value
interface ProctorContextType {
  screenHasErrors: boolean;
  setScreenHasErrors: React.Dispatch<React.SetStateAction<boolean>>;
  cameraHasErrors: boolean;
  setCameraHasErrors: React.Dispatch<React.SetStateAction<boolean>>;
  micHasErrors: boolean;
  setMicHasErrors: React.Dispatch<React.SetStateAction<boolean>>;
  networkHasErrors: boolean;
  setNetworkHasErrors: React.Dispatch<React.SetStateAction<boolean>>;
  lightingHasErrors?: boolean;
  setLightingHasErrors?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProctorContext = createContext<ProctorContextType>({
  screenHasErrors: false,
  setScreenHasErrors: () => {},
  cameraHasErrors: false,
  setCameraHasErrors: () => {},
  micHasErrors: false,
  setMicHasErrors: () => {},
  networkHasErrors: false,
  setNetworkHasErrors: () => {},
  lightingHasErrors: false,
  setLightingHasErrors: () => {},
});

export const ProctorProvider = ({ children }: { children: React.ReactNode }) => {
  const [screenHasErrors, setScreenHasErrors] = useState(false);
  const [cameraHasErrors, setCameraHasErrors] = useState(false);
  const [micHasErrors, setMicHasErrors] = useState(false);
  const [networkHasErrors, setNetworkHasErrors] = useState(false);
  const [lightingHasErrors, setLightingHasErrors] = useState(false);

  return (
    <ProctorContext.Provider
      value={{
        screenHasErrors,
        setScreenHasErrors,
        cameraHasErrors,
        setCameraHasErrors,
        micHasErrors,
        setMicHasErrors,
        networkHasErrors,
        setNetworkHasErrors,
        lightingHasErrors,
        setLightingHasErrors,
      }}
    >
      {children}
    </ProctorContext.Provider>
  );
};

export const useProctor = () => useContext(ProctorContext);
