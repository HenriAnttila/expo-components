// WIP, slightly sloppy
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ActionType = "primary" | "secondary" | "form" | "danger" | "success";
type ButtonSize = "small" | "medium" | "large" | "full" | "auto";
type ButtonType = "default" | "pill";

type Props = {
  title: string,
  type?: ButtonType,
  size?: ButtonSize,
  action?: ActionType,
  icon?: {
    component: React.ReactNode,
    align?: "left" | "right" | "text",
  },
  onPress?: () => void,
}

const getCustomHaptic = (action: string) => {
  switch (action) {
    case "success":
      return Haptics.NotificationFeedbackType.Success
  }
};

const CustomButton = ({
  title,
  size = "medium",
  action = "primary",
  type = "default",
  icon,
  onPress,
  ...rest
}: Props) => {
  const hapticEvent = getCustomHaptic(action);
  const iconAlignment = icon?.align || "right";
  return (
    <TouchableOpacity
      onPress={() => {
        if (hapticEvent) {
          Haptics.notificationAsync(hapticEvent);
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress && onPress();
      }}
      {...rest}
    >
      <View style={[buttonTypes[type], sizes[size], actions[action], styles.base, size === "auto" && {
        paddingLeft: icon && iconAlignment === "left" ? 48 : 20,
        paddingRight: icon && iconAlignment === "right" ? 40 : 20,
      }]}>
        {icon && (
          <View style={iconAlignments[iconAlignment]}>
            {icon.component}
          </View>
        )}
        <Text style={[textActions[action], { fontSize: 16 }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const iconAlignments = StyleSheet.create({
  left: {
    position: "absolute",
    left: 16,
    transform: [{ rotate: "180deg" }]
  },
  right: {
    position: "absolute",
    right: 16,
  },
  text: {
    width: 0,
    marginRight: 20
  }
})

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  iconBefore: {
    backgroundColor: "green"
  }
})

const buttonTypes = StyleSheet.create({
  default: {
    borderRadius: 4,
    fontSize: 18,
  },
  pill: {
    borderRadius: 16,
    fontSize: 20,
  },
} as Record<ButtonType, any>);

const sizes = StyleSheet.create({
  small: {
    minWidth: 80,
    height: 24,
  },
  medium: {
    minWidth: 100,
    height: 32,
    paddingHorizontal: 16,
  },
  large: {
    minWidth: 150,
    height: 48,
    paddingHorizontal: 16,
  },
  full: {
    width: "100%",
    height: 48,
  },
  auto: {
    paddingHorizontal: 16,
    height: 48,
  }
} as Record<ButtonSize, any>)

const actions = StyleSheet.create({
  primary: {
    backgroundColor: "black",
    color: "#1F2937",
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    color: "black",
  },
  form: {
    backgroundColor: "#F1F1F1",
    color: "#1F2937",
  },
  danger: {
    backgroundColor: "transparent",
    outlineColor: "#EF4444",
    outlineWidth: 1,
    color: "#EF4444",
  },
  success: {
  }
} as Record<ActionType, any>);

const textActions = StyleSheet.create({
  primary: {
    color: "#FFFEFC",
  },
  secondary: {
    color: "#1F2937",
  },
  danger: {
    color: "#EF4444",
  },
  success: {
  }
} as Record<ActionType, any>);

export default CustomButton;
