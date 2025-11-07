
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenViewProps = {
  children: React.ReactNode;
  topColor?: string;
  darkStatusBar?: boolean;
  bottomColor?: string;
  overlayRenderer?: () => React.ReactNode;
};

const ScreenView = ({ children, darkStatusBar = true, overlayRenderer, topColor, bottomColor }: ScreenViewProps) => {
  return (
    <>
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 0, backgroundColor: topColor }} />
      <SafeAreaView edges={["bottom"]} style={{ flex: 1, backgroundColor: bottomColor }}>
        <StatusBar barStyle={darkStatusBar ? "dark-content" : "light-content"} />
        <View style={{ flex: 1 }}>
          {children}
        </View>
        {overlayRenderer && (
          overlayRenderer()
        )}
      </SafeAreaView>
    </>
  );
}
export default ScreenView;
