import { useEffect, useState } from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';

const STORAGE_KEY = 'APP_COLOR_SCHEME_OVERRIDE';
type AppScheme = ColorSchemeName | 'system' | null;

let _override: AppScheme = null;
const listeners: (() => void)[] = [];

// Synchronously load from localStorage
try {
  _override = localStorage.getItem(STORAGE_KEY) as AppScheme;
} catch {
  _override = null;
}

export function setColorSchemeOverride(value: ColorSchemeName | 'system' | null) {
  _override = value === 'system' ? null : value;
  try {
    if (value === 'system' || value === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, value);
    }
  } catch {
    // Ignore errors
  }
  listeners.forEach((l) => l());
}

export function useColorScheme(): ColorSchemeName {
  const [system, setSystem] = useState<ColorSchemeName>(Appearance.getColorScheme());
  const [, setTick] = useState(0);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystem(colorScheme);
    });

    const l = () => setTick((t) => t + 1);
    listeners.push(l);

    return () => {
      const idx = listeners.indexOf(l);
      if (idx >= 0) listeners.splice(idx, 1);
      sub.remove();
    };
  }, []);

  if (_override === 'dark' || _override === 'light') {
    return _override;
  }
  return system ?? 'light';
}