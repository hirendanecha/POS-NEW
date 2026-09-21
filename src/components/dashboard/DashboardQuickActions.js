import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { ShoppingCart, UtensilsCrossed } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashboardQuickActions({ handleQuickStart }) {
  return (
    <View style={styles.quickActionsRow}>
      <TouchableOpacity
        style={[styles.quickBtn, { backgroundColor: ThemeColors.accent }]}
        activeOpacity={0.82}
        onPress={() => handleQuickStart("Dine-In")}
      >
        <View
          style={[
            styles.quickBtnBlob,
            { backgroundColor: ThemeColors.white + "1F" }, // 12% opacity white
          ]}
        />
        <View style={styles.quickBtnInner}>
          <View style={styles.quickBtnIconWrap}>
            <UtensilsCrossed
              size={28}
              color={ThemeColors.white}
              strokeWidth={2}
            />
          </View>
          <Text style={styles.quickBtnLabel}>Dine-In</Text>
          <Text style={styles.quickBtnMeta}>Table order</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.quickBtn, { backgroundColor: ThemeColors.primary }]}
        activeOpacity={0.82}
        onPress={() => handleQuickStart("Takeaway")}
      >
        <View
          style={[
            styles.quickBtnBlob,
            { backgroundColor: ThemeColors.white + "1F" },
          ]}
        />
        <View style={styles.quickBtnInner}>
          <View style={styles.quickBtnIconWrap}>
            <ShoppingCart size={28} color={ThemeColors.white} strokeWidth={2} />
          </View>
          <Text style={styles.quickBtnLabel}>Takeaway</Text>
          <Text style={styles.quickBtnMeta}>Counter order</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quickActionsRow: {
    flexDirection: "row",
    gap: ThemeSpacing.md || 16,
  },
  quickBtn: {
    flex: 1, // Allow to grow and fill row
    maxWidth: 240, // But not too large on wide screens
    minHeight: 100,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickBtnBlob: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    bottom: -24,
    right: -24,
  },
  quickBtnInner: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 4,
  },
  quickBtnIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ThemeColors.white + "26", // 15% opacity white
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickBtnLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: ThemeColors.white,
    letterSpacing: 0.3,
  },
  quickBtnMeta: {
    fontSize: 12,
    color: ThemeColors.white + "BF", // 75% opacity white
    fontWeight: "500",
  },
});
