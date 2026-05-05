import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { ThemedIcon } from './ui/themed-icon';

const wavingHandIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e3e3e3"><path d="M430-120q-92 0-157-64.5T208-341v-219q0-18.75 12.63-31.37Q233.25-604 252-604q18.75 0 31.38 12.63Q296-578.75 296-560v129h44v-213q0-18.75 12.63-31.37Q365.25-688 384-688q18.75 0 31.38 12.63Q428-662.75 428-644v169h44v-189q0-18.75 12.63-31.37Q497.25-708 516-708q18.75 0 31.38 12.63Q560-682.75 560-664v145h44v-109q0-18.75 12.63-31.37Q629.25-672 648-672q18.75 0 31.38 12.63Q692-646.75 692-628v287q0 92-64.5 156.5T470-120h-40ZM252-340q0 73.71 51.15 124.85Q354.29-164 428-164h2q73.71 0 124.85-51.15Q606-266.29 606-340v-44H252v44Zm0-88h354v-200h-44v65H476v-145H384v189H296v-129H252v220Zm0 0v-220 220Z"/></svg>`;

export function HelloWave() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 600 }), 4, true);
  }, [progress]);

  const rStyle = useAnimatedStyle(() => {
    const deg = `${(progress.value * 25).toFixed(2)}deg`;
    return {
      transform: [{ rotate: deg }],
    };
  });

  return (
    <Animated.View style={[{ marginTop: -6 }, rStyle]}>
      <ThemedIcon xml={wavingHandIcon} size={28} />
    </Animated.View>
  );
}
