import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { useResponsive } from "@/hooks/useResponsive";
import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { Activity, FileText, Receipt } from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

export function InvoicesSummaryCards({ metrics }) {
  const { isMobile, isMiniTab } = useResponsive();

  if (!metrics) return null;

  const isScrollable = isMobile || isMiniTab;
  const cardWidth = isMobile ? 280 : 320;

  const stats = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: `₹${metrics.totalRevenue.toFixed(2)}`,
      icon: Receipt,
      color: ThemeColors.emerald,
      changeLabel: "+12.5% this month",
      positive: true,
    },
    {
      id: "invoices",
      title: "Total Invoices",
      value: metrics.totalInvoices.toString(),
      icon: FileText,
      color: ThemeColors.accent,
      changeLabel: "All time",
      positive: true,
    },
    {
      id: "average",
      title: "Average Value",
      value: `₹${metrics.averageValue.toFixed(2)}`,
      icon: Activity,
      color: ThemeColors.blue,
      changeLabel: "Per invoice",
      positive: true,
    },
  ];

  const content = stats.map((stat) => (
    <View
      key={stat.id}
      style={[isScrollable ? { width: cardWidth } : { flex: 1 }]}
    >
      <SummaryCard
        title={stat.title}
        primary={stat.value}
        icon={<stat.icon size={16} color={stat.color} strokeWidth={2} />}
        badge={stat.changeLabel}
        color={stat.color}
      />
    </View>
  ));

  if (isScrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: ThemeSpacing.md || 16,
          paddingRight: ThemeSpacing.xl,
        }}
        style={{
          marginHorizontal: -ThemeSpacing.lg,
          paddingHorizontal: ThemeSpacing.lg,
          marginBottom: ThemeSpacing.xl,
        }}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={styles.statsGrid}>{content}</View>;
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row",
    gap: ThemeSpacing.md || 16,
    marginBottom: ThemeSpacing.xl,
  },
});
