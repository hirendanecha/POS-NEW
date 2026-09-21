import { Text } from "@/components/ui/Text";
import { ThemeColors, ThemeRadius, ThemeSpacing } from "@/theme/theme";
import { AlertTriangle, X } from "lucide-react-native";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export function DeleteConfirmModal({ visible, item, onClose, onConfirm }) {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <AlertTriangle size={20} color={ThemeColors.rose} />
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <X size={20} color={ThemeColors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Body */}
              <View style={styles.body}>
                <Text weight="bold" style={styles.title}>
                  Delete Supplier
                </Text>
                <Text style={styles.message}>
                  Are you sure you want to delete{" "}
                  <Text weight="bold">{item.name}</Text>? This action cannot be
                  undone.
                </Text>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
                  <Text weight="bold" style={styles.deleteBtnText}>
                    Delete Supplier
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ThemeColors.black + "80",
    justifyContent: "center",
    alignItems: "center",
    padding: ThemeSpacing.lg,
  },
  container: {
    backgroundColor: ThemeColors.white,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ThemeSpacing.lg,
    paddingBottom: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.roseDim,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    padding: 8,
  },
  body: {
    padding: ThemeSpacing.lg,
  },
  title: {
    fontSize: 18,
    color: ThemeColors.textPrimary,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: ThemeColors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: ThemeSpacing.lg,
    backgroundColor: ThemeColors.white + "80",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    gap: ThemeSpacing.md,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: ThemeRadius.md,
    backgroundColor: ThemeColors.white + "80",
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  cancelBtnText: {
    fontSize: 14,
    color: ThemeColors.textPrimary,
    fontWeight: "500",
  },
  deleteBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: ThemeRadius.md,
    backgroundColor: ThemeColors.rose,
  },
  deleteBtnText: {
    fontSize: 14,
    color: ThemeColors.white,
  },
});
