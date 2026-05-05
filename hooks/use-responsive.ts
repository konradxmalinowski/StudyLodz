import { useWindowDimensions } from 'react-native';

export const TABLET_BREAKPOINT = 768;
export const CONTENT_MAX_WIDTH = 900;

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  return {
    isTablet,
    screenWidth: width,
    padding: isTablet ? 48 : 24,
    headerHeight: isTablet ? 360 : 250,
    columns: isTablet ? 2 : 1,
  };
}
