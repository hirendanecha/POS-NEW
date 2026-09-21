import { Loader } from "@/components/common/Loader";
import { Text } from "@/components/ui/Text";
import { useResponsive } from "@/hooks/useResponsive";
import {
  clearSelectedItem,
  fetchInventoryItemById,
} from "@/store/slices/inventorySlice";
import { ThemeColors, ThemeRadius, ThemeSpacing } from "@/theme/theme";
import { AlertCircle, Package, X } from "lucide-react-native";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function ProductInventoryModal({ product, visible, onClose }) {
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const { selectedItem, isItemLoading } = useSelector(
    (state) => state.inventory,
  );

  useEffect(() => {
    if (visible && product?.id) {
      dispatch(fetchInventoryItemById(product.id));
    }
    if (!visible) {
      dispatch(clearSelectedItem());
    }
  }, [visible, product?.id, dispatch]);

  const displayProduct = selectedItem || product;

  if (!visible || !displayProduct) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, styles.overlayCenter]}>
        <View
          style={[
            styles.modalContainerCentered,
            {
              padding: isMobile ? ThemeSpacing.lg : ThemeSpacing.xxl,
              width: isMobile ? "95%" : "100%",
              maxWidth: 600,
              backgroundColor: ThemeColors.white,
              borderRadius: 16,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: ThemeSpacing.md,
              }}
            >
              <View style={styles.iconBox}>
                <Package size={24} color={ThemeColors.blue} />
              </View>
              <View>
                {isItemLoading && !selectedItem ? (
                  <ActivityIndicator size="small" color={ThemeColors.primary} />
                ) : (
                  <>
                    <Text weight="bold" style={styles.title}>
                      {displayProduct.name}
                    </Text>
                    <Text style={styles.subtitle}>
                      {displayProduct.sku} • {displayProduct.category}
                    </Text>
                  </>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={24} color={ThemeColors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          {isItemLoading && !selectedItem ? (
            <View style={{ padding: ThemeSpacing.xl, alignItems: "center" }}>
              <Loader />
            </View>
          ) : (
            <>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Available</Text>
                  <Text weight="bold" style={styles.statValue}>
                    {displayProduct.in_stock ?? displayProduct.inStock}{" "}
                    {displayProduct.unit}
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Reserved</Text>
                  <Text weight="bold" style={styles.statValue}>
                    {displayProduct.reserved} {displayProduct.unit}
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Reorder Level</Text>
                  <Text weight="bold" style={styles.statValue}>
                    {displayProduct.reorder_level ??
                      displayProduct.reorderLevel}{" "}
                    {displayProduct.unit}
                  </Text>
                </View>
              </View>

              {/* Detailed Info */}
              <View style={styles.detailsSection}>
                <Text
                  weight="bold"
                  style={{ fontSize: 16, marginBottom: ThemeSpacing.md }}
                >
                  Valuation & Status
                </Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cost Price</Text>
                  <Text style={styles.infoValue}>₹{displayProduct.price}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Total Value</Text>
                  <Text style={styles.infoValue}>
                    ₹
                    {(
                      (displayProduct.in_stock ?? displayProduct.inStock) *
                      displayProduct.price
                    ).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {displayProduct.status === "Low" ||
                    displayProduct.status === "Critical" ? (
                      <AlertCircle size={14} color={ThemeColors.rose} />
                    ) : null}
                    <Text
                      style={[
                        styles.infoValue,
                        {
                          color:
                            displayProduct.status === "Normal"
                              ? ThemeColors.amber
                              : ThemeColors.rose,
                        },
                      ]}
                    >
                      {displayProduct.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Last Counted</Text>
                  <Text style={styles.infoValue}>
                    {displayProduct.lastCounted || displayProduct.updated_at
                      ? new Date(
                          displayProduct.updated_at ||
                            displayProduct.lastCounted,
                        ).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ThemeColors.black + "80",
  },
  overlayCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainerCentered: {
    width: "90%",
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: ThemeSpacing.xl,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: ThemeRadius.md,
    backgroundColor: ThemeColors.blue + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: ThemeColors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: ThemeColors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: ThemeSpacing.md,
    marginBottom: ThemeSpacing.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: ThemeColors.bg,
    padding: ThemeSpacing.md,
    borderRadius: ThemeRadius.md,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  statLabel: {
    fontSize: 12,
    color: ThemeColors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    color: ThemeColors.textPrimary,
  },
  detailsSection: {
    backgroundColor: ThemeColors.bg,
    padding: ThemeSpacing.lg,
    borderRadius: ThemeRadius.md,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borderSubtle,
  },
  infoLabel: {
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: ThemeColors.textPrimary,
    fontWeight: "500",
  },
});
