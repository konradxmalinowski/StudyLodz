import { useEffect, useState } from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'APP_COLOR_SCHEME_OVERRIDE';

type AppScheme = ColorSchemeName | 'system' | null;

let _override: AppScheme = null;
const listeners: (() => void)[] = [];

export async function loadOverride() {
    try {
        if (AsyncStorage) {
            const v = await AsyncStorage.getItem(STORAGE_KEY);
            _override = v as AppScheme;
        } else {
            _override = null;
        }
    } catch {
        _override = null;
    }
}

export async function setColorSchemeOverride(value: ColorSchemeName | 'system' | null) {
    _override = value === 'system' ? null : value;
    try {
        if (AsyncStorage) {
            if (value === 'system' || value === null) {
                await AsyncStorage.removeItem(STORAGE_KEY);
            } else {
                await AsyncStorage.setItem(STORAGE_KEY, value);
            }
        }
    } catch {
        // ignore
    }
    listeners.forEach((l) => l());
}

export function useColorScheme(): ColorSchemeName {
    const [system, setSystem] = useState<ColorSchemeName>(Appearance.getColorScheme());
    const [, setTick] = useState(0);

    useEffect(() => {
        // load override once
        let mounted = true;
        loadOverride().then(() => {
            if (mounted) setTick((t) => t + 1);
        });

        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            setSystem(colorScheme);
        });

        const l = () => setTick((t) => t + 1);
        listeners.push(l);

        return () => {
            mounted = false;
            // remove listener
            const idx = listeners.indexOf(l);
            if (idx >= 0) listeners.splice(idx, 1);
            sub.remove();
        };
    }, []);

    // prefer override when set
    if (_override === 'dark' || _override === 'light') return _override;
    return system ?? 'light';
}

