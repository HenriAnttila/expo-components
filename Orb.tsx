import { useEffect } from "react";
import { View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type OrbProps = {
  progress: number; // 0 to 1
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
};

const heightScaler = (progress: number): number => {
  if (progress <= 0.5) return progress * 2;
  return 2 - progress * 1.5;
};

const MIN_DURATION = 1500;
const MAX_DURATION = 2000;
const GLOW_EFFECT_HEIGHT = 3;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Orb = ({ progress, onAnimationStart, onAnimationEnd }: OrbProps) => {
  const animatedProgress = useSharedValue(0);
  const scaledEffectHeight = heightScaler(progress) * GLOW_EFFECT_HEIGHT;

  const progressStyle = useAnimatedStyle(() => ({
    height: `${animatedProgress.value * 100}%`,
    bottom: -scaledEffectHeight / 2
  }));

  useEffect(() => {
    onAnimationStart?.();
    const progressDelta = Math.abs(animatedProgress.value - progress);
    const duration = lerp(MIN_DURATION, MAX_DURATION, progressDelta);

    animatedProgress.value = withTiming(progress, {
      duration,
      easing: Easing.out(Easing.exp)
    }, () => {
      onAnimationEnd && scheduleOnRN(onAnimationEnd);
    });
  }, [progress, animatedProgress, onAnimationEnd, onAnimationStart]);


  return (
    <View style={styles.orb}>
      <Animated.View style={[styles.fill, progressStyle]}>
        {progress > 0 && progress < 1 && (
          <View
            style={[
              styles.fillTop,
              { borderWidth: scaledEffectHeight, top: -scaledEffectHeight },
            ]}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  orb: {
    position: "relative",
    width: 31,
    height: 31,
    borderRadius: 50,
    backgroundColor: "#E3E3E3",
    overflow: "hidden",
  },
  fill: {
    backgroundColor: "#F75700",
    width: "100%",
    position: "absolute",
    height: "50%",
  },
  fillTop: {
    borderRadius: 100,
    borderColor: "#F75700",
    width: 31,
    zIndex: 5,
    position: "absolute",
  },
});

export default Orb;

