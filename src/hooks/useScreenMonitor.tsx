"use client";

// components/ScreenDetector.tsx (or a custom hook)
import { useEffect, useState, useCallback } from "react";

interface ScreenInfo {
  isMultiMonitor: boolean;
  screenCount: number;
  details?: ScreenDetailed[]; // From getScreenDetails
}

export function useScreenMonitor() {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo>({
    isMultiMonitor: false,
    screenCount: 1,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);

  const checkScreens = useCallback(async () => {
    if (typeof window === "undefined") return;

    const newScreenInfo: ScreenInfo = {
      isMultiMonitor: false,
      screenCount: 1,
    };

    if ("isExtended" in window.screen && window.screen.isExtended) {
      newScreenInfo.isMultiMonitor = true;
    }

    if ("getScreenDetails" in window && !permissionGranted) {
      try {
        // Request permission if not already granted.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const screenDetails = await (window as any).getScreenDetails();
        setPermissionGranted(true);

        const currentScreenCount = screenDetails.screens.length;
        if (currentScreenCount > 1) {
          newScreenInfo.isMultiMonitor = true;
          newScreenInfo.screenCount = currentScreenCount;
          newScreenInfo.details = screenDetails.screens;
        } else {
          newScreenInfo.isMultiMonitor = false;
          newScreenInfo.screenCount = 1;
          newScreenInfo.details = screenDetails.screens;
        }

        // This listener only works if getScreenDetails() permission is granted
        if (screenDetails.onchange && !screenDetails.onchange.__bound) {
          // Prevent double-binding
          screenDetails.onchange = () => {
            console.log(
              "Screen configuration changed (via getScreenDetails.onchange)"
            );
            checkScreens(); // Re-check when a change is detected
          };
          screenDetails.onchange.__bound = true; // Mark as bound
        }
      } catch (error) {
        console.warn("getScreenDetails permission denied or API error:", error);
        setPermissionGranted(false);
        // Fallback to less detailed checks or assume single screen
      }
    } else if ("isExtended" in window.screen) {
      // Fallback for browsers that don't support getScreenDetails or permission denied
      newScreenInfo.isMultiMonitor = Boolean(window.screen.isExtended);
      newScreenInfo.screenCount = window.screen.isExtended ? 2 : 1; // Best guess for count
    }

    setScreenInfo(newScreenInfo);
  }, [permissionGranted]); // Re-run if permission state changes

  useEffect(() => {
    // Initial check on component mount
    checkScreens();
    const handleResize = () => {
      checkScreens(); // re-check on resize, but be careful with performance
    };

    window.addEventListener("resize", handleResize);

    if ("onchange" in window.screen && window.screen.onchange === null) {
      // Check if not already bound by getScreenDetails
      window.screen.onchange = () => {
        checkScreens(); // Re-check
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [checkScreens]); // Depend on checkScreens to ensure it's up-to-date

  return {
    screenInfo,
    permissionGranted,
    requestScreenDetailsPermission: checkScreens,
  };
}
