import { Text } from "@/components/ui/Text";
import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { StyleSheet, View } from "react-native";

export function TablesLegend({ isSmallScreen, availableCount, dineInCount }) {
  return (
    <View
      style={[
        styles.legend,
        isSmallScreen && {
          left: ThemeSpacing.md,
          bottom: ThemeSpacing.md,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: ThemeSpacing.sm,
        },
      ]}
    >
      <View style={styles.legendItem}>
        <View
          style={[
            styles.legendDot,
            {
              backgroundColor: ThemeColors.white,
              borderWidth: 1,
              borderColor: ThemeColors.border,
            },
          ]}
        />
        <Text style={styles.legendText}>Available: {availableCount}</Text>
      </View>
      <View style={styles.legendItem}>
        <View
          style={[styles.legendDot, { backgroundColor: ThemeColors.blue }]}
        />
        <Text style={styles.legendText}>Occupied: {dineInCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    position: "absolute",
    bottom: ThemeSpacing.xl,
    left: ThemeSpacing.xxl,
    flexDirection: "column",
    backgroundColor: ThemeColors.primary, // Modified background
    paddingHorizontal: ThemeSpacing.lg,
    paddingVertical: ThemeSpacing.lg,
    borderRadius: 16,
    gap: ThemeSpacing.md,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: ThemeColors.textWhite,
    fontWeight: "500",
  },
});
