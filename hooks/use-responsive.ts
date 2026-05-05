import { useWindowDimensions } from 'react-native';

export const TABLET_BREAKPOINT = 768;
export const CONTENT_MAX_WIDTH = 900;

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const padding = isTablet ? 48 : 24;
  const contentWidth = Math.min(width, CONTENT_MAX_WIDTH) - padding * 2;
  const col2Width = (contentWidth - 16) / 2;
  return {
    isTablet,
    screenWidth: width,
    padding,
    headerHeight: isTablet ? 360 : 250,
    columns: isTablet ? 2 : 1,
    contentWidth,
    col2Width,
  };
}
