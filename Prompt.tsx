import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export type PromptProps = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const Prompt = ({ title, message, confirmText = "Delete", cancelText = "Cancel", onConfirm, onCancel }: PromptProps) => {
  return (
    <View style={styles.content}>
      {title && <Text style={styles.title}>{title}</Text>}
      {message && <Text style={styles.message}>{message}</Text>}
      <View style={styles.buttons}>
        <Button
          title={confirmText}
          onPress={() => {
            onConfirm?.();
          }}
          action="danger"
        />
        <Button
          title={cancelText}
          onPress={() => {
            onCancel?.();
          }}
          action="primary"
        />
      </View>
    </View>
  )
};

const PromptContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: "#1F2937",
  },
  message: {
    marginTop: 10,
    fontSize: 18,
    color: "#6B7280"
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 32
  },
  content: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  }
});

export default Prompt;
export { PromptContainer };
