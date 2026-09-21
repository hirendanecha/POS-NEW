import { Text } from "@/components/ui/Text";
import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { Maximize, ZoomIn, ZoomOut } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function TablesZoomControls({
  isSmallScreen,
  isEditMode,
  handleZoomIn,
  handleZoomOut,
  handleResetZoom,
}) {
  return (
    <View
      style={[
        styles.zoomControls,
        {
          bottom: isSmallScreen ? ThemeSpacing.md : ThemeSpacing.xl,
          right: isSmallScreen ? ThemeSpacing.md : ThemeSpacing.xxl + 170,
        },
        isSmallScreen && {
          flexDirection: "column",
        },
        isEditMode && {
          right: isSmallScreen ? ThemeSpacing.md : ThemeSpacing.xxl + 180,
        },
      ]}
    >
      {isSmallScreen ? (
        <>
          <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomIn}>
            <ZoomIn size={20} color={ThemeColors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.scaleBtn} onPress={handleResetZoom}>
            <Maximize size={16} color={ThemeColors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomOut}>
            <ZoomOut size={20} color={ThemeColors.textPrimary} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomOut}>
            <ZoomOut size={20} color={ThemeColors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.scaleBtn} onPress={handleResetZoom}>
            <Text style={styles.scaleText}>Reset</Text>
            <Maximize size={16} color={ThemeColors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomIn}>
            <ZoomIn size={20} color={ThemeColors.textPrimary} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  zoomControls: {
    position: "absolute",
    bottom: ThemeSpacing.md,
    right: ThemeSpacing.xxl,
    flexDirection: "row",
    alignItems: "center",
    gap: ThemeSpacing.xs,
    backgroundColor: ThemeColors.white + "B3",
    padding: ThemeSpacing.xs,
    borderRadius: 100,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  zoomBtn: {
    padding: ThemeSpacing.sm,
    borderRadius: 100,
  },
  scaleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: ThemeSpacing.md,
    paddingVertical: ThemeSpacing.sm,
  },
  scaleText: {
    fontSize: 12,
    color: ThemeColors.textSecondary,
    fontWeight: "600",
  },
});
