import * as Haptics from 'expo-haptics';
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = {
  onPress?: () => any;
  children: React.ReactNode;
  style?: object;
  hapticStyle?: Haptics.ImpactFeedbackStyle;
}

const TouchableHaptic = (props: Props & TouchableOpacityProps) => {
  const {
    onPress,
    hapticStyle = Haptics.ImpactFeedbackStyle.Light,
    style,
    children,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(hapticStyle);
        onPress && onPress();
      }}
      style={style}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
};

export default TouchableHaptic;

