import { ThemeSpacing } from "@/theme/theme";
import { StyleSheet, View } from "react-native";
import { SummaryCard } from "./SummaryCard";

export default function DashboardStatsGrid({ stats }) {
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat) => (
        <SummaryCard
          key={stat.id}
          icon={<stat.icon size={16} color={stat.color} strokeWidth={2} />}
          title={stat.title}
          primary={stat.value}
          badge={stat.changeLabel}
          color={stat.color}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ThemeSpacing.md || 16,
  },
});
