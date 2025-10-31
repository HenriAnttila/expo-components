import { Modal, TouchableOpacity, View } from "react-native";

type DimmedModalProps = {
  onBackdropPress?: () => void;
  children?: React.ReactNode;
  alpha?: number;
};

const DimmedModal = ({ onBackdropPress, children, alpha = 0.2 }: DimmedModalProps) => {
  return (
    <Modal transparent visible>
      <TouchableOpacity activeOpacity={1}
        onPress={() => {
          if (onBackdropPress) onBackdropPress();
        }}
      >
        <View style={{
          height: '100%',
          width: '100%',
          backgroundColor: `rgba(0, 0, 0, ${alpha})`
        }}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default DimmedModal;

