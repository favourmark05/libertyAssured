"use client";

// components/ScreenDetector.tsx (or a custom hook)
import { useEffect, useState, useCallback } from 'react';

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
    if (typeof window === 'undefined') return;

    const newScreenInfo: ScreenInfo = {
      isMultiMonitor: false,
      screenCount: 1,
    };

    // Option 1: Using screen.isExtended (simpler, less detail)
    // This is a good first check.
    if ('isExtended' in window.screen && window.screen.isExtended) {
      newScreenInfo.isMultiMonitor = true;
      // We can't easily get the count without getScreenDetails
    }

    // Option 2: Using window.getScreenDetails() (most robust, requires permission)
    if ('getScreenDetails' in window && !permissionGranted) {
      try {
        // Request permission if not already granted.
        // This will show a prompt to the user.
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

        // Add event listener for screen changes
        // This listener only works if getScreenDetails() permission is granted
        if (screenDetails.onchange && !screenDetails.onchange.__bound) { // Prevent double-binding
          screenDetails.onchange = () => {
            console.log('Screen configuration changed (via getScreenDetails.onchange)');
            checkScreens(); // Re-check when a change is detected
          };
          screenDetails.onchange.__bound = true; // Mark as bound
        }

      } catch (error) {
        console.warn('getScreenDetails permission denied or API error:', error);
        setPermissionGranted(false);
        // Fallback to less detailed checks or assume single screen
      }
    } else if ('isExtended' in window.screen) {
        // Fallback for browsers that don't support getScreenDetails or permission denied
        newScreenInfo.isMultiMonitor = window.screen.isExtended;
        newScreenInfo.screenCount = window.screen.isExtended ? 2 : 1; // Best guess for count
    }


    setScreenInfo(newScreenInfo);
  }, [permissionGranted]); // Re-run if permission state changes

  useEffect(() => {
    // Initial check on component mount
    checkScreens();

    // Option 3: Fallback using window.onresize (less reliable for multi-monitor)
    // This mostly detects window resizing, but a window spanning multiple screens
    // might trigger it. Not reliable for detection of new monitors being *added*.
    const handleResize = () => {
      // For older browsers, you might try to infer from screen dimensions,
      // but it's very unreliable without isExtended or getScreenDetails.
      // This is more for general responsiveness than multi-monitor detection.
      // console.log('Window resized. screen.width:', window.screen.width, 'screen.height:', window.screen.height);
      // checkScreens(); // Can uncomment to re-check on resize, but be careful with performance
    };
    window.addEventListener('resize', handleResize);


    // Option 4: Use screen.onchange (if available, without getScreenDetails)
    // This is the older, less powerful screen.onchange.
    // It fires when the screen the window is *currently on* changes its properties (resolution etc.)
    // or when the window moves to a different screen.
    // It might not reliably fire when a *new* screen is simply plugged in if the window doesn't move.
    if ('onchange' in window.screen && window.screen.onchange === null) { // Check if not already bound by getScreenDetails
        const oldScreenOnChange = window.screen.onchange; // Store existing
        window.screen.onchange = () => {
            console.log('Screen characteristics changed (via window.screen.onchange)');
            checkScreens(); // Re-check
        };
    }


    return () => {
      window.removeEventListener('resize', handleResize);
      if ('onchange' in window.screen && window.screen.onchange === null) {
          // Restore original if we bound it
          // window.screen.onchange = oldScreenOnChange;
      }
      // Cleanup for getScreenDetails.onchange would be within the screenDetails object
      // if (screenDetails && screenDetails.onchange) { screenDetails.onchange = null; }
    };
  }, [checkScreens]); // Depend on checkScreens to ensure it's up-to-date

  return { screenInfo, permissionGranted, requestScreenDetailsPermission: checkScreens };
}