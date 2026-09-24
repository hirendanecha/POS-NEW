import { Text } from "@/components/ui/Text";
import { ThemeColors, ThemeRadius, ThemeSpacing } from "@/theme/theme";
import { StyleSheet, View } from "react-native";

// ─── Metric Row ──────────────────────────────────────────────────────────────
export function MetricRow({ label, value, highlight, arrow }) {
  const arrowChar = arrow === "up" ? "↑" : arrow === "down" ? "↓" : null;
  const arrowColor = arrow === "up" ? ThemeColors.emerald : ThemeColors.red;
  return (
    <View style={styles.metricRow}>
      <Text weight="medium" style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricValueRow}>
        {arrowChar && (
          <Text weight="extrabold" style={[styles.metricArrow, { color: arrowColor }]}>
            {arrowChar}
          </Text>
        )}
        <Text
          weight="bold"
          style={[styles.metricValue, highlight && { color: ThemeColors.emerald }]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────
export function SummaryCard({ icon, title, primary, badge, color = ThemeColors.accent, children }) {
  return (
    <View style={styles.statCard}>
      {/* Decorative blob */}
      <View style={[styles.statBlob, { backgroundColor: color }]} />

      {/* Top row: icon pill + title */}
      <View style={styles.statTopRow}>
        <View style={[styles.iconPill, { backgroundColor: ThemeColors.bg }]}>
          {icon}
        </View>
        <Text style={styles.statTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Bottom row: value */}
      <View style={styles.statBottomRow}>
        <Text style={styles.statValue}>{primary}</Text>
      </View>

      {badge && (
        <View style={styles.subtextContainer}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
          <Text style={styles.subtext}>{badge.label || badge}</Text>
        </View>
      )}

      {children && (
        <>
          <View style={styles.divider} />
          {children}
        </>
      )}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    minWidth: 130, // from SummaryCard (DashboardStatsGrid had 180, we keep it smaller for flex)
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
  divider: {
    height: 1,
    backgroundColor: ThemeColors.borderSubtle,
    marginVertical: ThemeSpacing.md,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: ThemeColors.textMuted,
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metricArrow: {
    fontSize: 10,
  },
  metricValue: {
    fontSize: 13,
    color: ThemeColors.textSecondary,
  },
});
