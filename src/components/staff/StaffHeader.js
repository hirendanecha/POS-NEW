import { CommonHeader } from "@/components/common/CommonHeader";
import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { StyleSheet } from "react-native";

export function StaffHeader({}) {
  return <CommonHeader title="Staff" />;
}

const styles = StyleSheet.create({
  headerDate: {
    fontSize: 13,
    color: ThemeColors.textSecondary,
  },
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ThemeSpacing.xxl,
    paddingBottom: ThemeSpacing.md,
  },
  filterTabs: {
    flexDirection: "row",
    gap: ThemeSpacing.sm,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ThemeSpacing.lg,
    paddingVertical: ThemeSpacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  filterTabText: {
    fontSize: 13,
    color: ThemeColors.textSecondary,
  },
  filterTabTextActive: {
    color: ThemeColors.white,
  },
});
