import * as Haptics from 'expo-haptics';
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import TouchableHaptic from "./TouchableHaptic";

type ActionOption = {
  title: string;
  destructive?: boolean;
}

type ActionSheetProps = {
  title?: string;
  options: ActionOption[];
  onSelect?: (option: ActionOption) => void;
  onClosed?: () => void;
  open: boolean;
};

const ActionSheet = ({ title, options, onSelect, onClosed, open }: ActionSheetProps) => {
  const slideY = useSharedValue(100);

  const sheetAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: `${slideY.value}%` }],
    };
  });

  useEffect(() => {
    if (open) {
      slideY.value = withTiming(0, { duration: 200 });
    } else {
      slideY.value = withTiming(100, { duration: 200 }, () => {
        onClosed?.();
      });
    }
  }, [onClosed, open, slideY]);

  return (
    <Animated.View style={[styles.container, sheetAnimStyle]}>
      <View style={styles.options}>
        {title && <Text style={styles.title}>{title}</Text>}
        {options.map((option, i) => (
          <TouchableHaptic
            key={option.title}
            hapticStyle={
              option.destructive ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light
            }
            onPress={() => onSelect?.(option)}
          >
            <Text style={[styles.label, option.destructive && styles.danger]}>
              {option.title}
            </Text>
          </TouchableHaptic>
        ))}
      </View>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#F6F6F6",
    paddingBottom: 48,
    overflow: "hidden",
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  label: {
    fontSize: 20,
    backgroundColor: "##FFFEFC",
    padding: 12,
    paddingLeft: 22,
  },
  danger: {
    color: "#EF4444",
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    paddingLeft: 18,
    paddingTop: 20,
    paddingBottom: 18,
    backgroundColor: "#F6F6F6",
  }
});

export type { ActionOption };
export default ActionSheet;

