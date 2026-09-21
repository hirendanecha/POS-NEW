import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardStatsGrid({ stats }) {
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat) => {
        return (
          <View key={stat.id} style={styles.statCard}>
            {/* Decorative blob */}
            <View style={[styles.statBlob, { backgroundColor: stat.color }]} />

            {/* Top row: icon pill + title */}
            <View style={styles.statTopRow}>
              <View
                style={[styles.iconPill, { backgroundColor: ThemeColors.bg }]}
              >
                <stat.icon size={16} color={stat.color} strokeWidth={2} />
              </View>
              <Text style={styles.statTitle} numberOfLines={1}>
                {stat.title}
              </Text>
            </View>

            {/* Bottom row: value + subtext */}
            <View style={styles.statBottomRow}>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>

            {stat.changeLabel && (
              <View style={styles.subtextContainer}>
                <View style={styles.infoIcon}>
                  <Text style={styles.infoIconText}>i</Text>
                </View>
                <Text style={styles.subtext}>{stat.changeLabel}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ThemeSpacing.md || 16,
  },
  statCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: ThemeColors.white + "B3", // 70% opacity white
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  statBlob: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    borderBottomLeftRadius: 128,
    opacity: 0.05,
  },
  statTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  iconPill: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
  },
  statBottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
  },
  subtextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  infoIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: ThemeColors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  infoIconText: {
    fontSize: 9,
    fontWeight: "bold",
    color: ThemeColors.textSecondary,
  },
  subtext: {
    fontSize: 12,
    fontWeight: "600",
    color: ThemeColors.textSecondary,
  },
});
