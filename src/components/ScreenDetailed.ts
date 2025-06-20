// If not already in your lib.dom.d.ts, add this to a .d.ts file
interface ScreenDetailed extends Screen {
  label: string;
  isPrimary: boolean;
  isInternal: boolean;
  isExtended: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  pixelDepth: number;
  scaleFactor: number;
  devicePixelRatio: number;
  colorDepth: number;
  // Add more properties as needed from the spec
}

interface ScreenDetails {
  screens: ScreenDetailed[];
  onchange: (() => void) | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  getScreenDetails?(): Promise<ScreenDetails>;
}