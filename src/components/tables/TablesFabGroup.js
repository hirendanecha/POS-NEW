import { Text } from "@/components/ui/Text";
import { ThemeColors, ThemeRadius, ThemeSpacing } from "@/theme/theme";
import { Check, Edit2, Plus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function TablesFabGroup({
  isEditMode,
  onMergePress,
  onAddPress,
  onEditToggle,
}) {
  return (
    <View style={styles.fabContainer}>
      {!isEditMode && (
        <TouchableOpacity
          style={[styles.fab, isEditMode && styles.fabActive]}
          activeOpacity={0.8}
          onPress={onMergePress}
        >
          <Text style={styles.mergeFabText}>Merge Tables</Text>
        </TouchableOpacity>
      )}

      {isEditMode && (
        <TouchableOpacity
          style={[styles.fab, styles.addFab]}
          activeOpacity={0.8}
          onPress={onAddPress}
        >
          <Plus size={20} color={ThemeColors.white} />
          <Text style={styles.fabText}>Add Table</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.fab, isEditMode && styles.fabActive]}
        activeOpacity={0.8}
        onPress={onEditToggle}
      >
        {isEditMode ? (
          <Check size={20} color={ThemeColors.white} strokeWidth={3} />
        ) : (
          <Edit2 size={20} color={ThemeColors.white} strokeWidth={2.5} />
        )}
        <Text style={styles.fabText}>
          {isEditMode ? "Done Editing" : "Edit Layout"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: ThemeSpacing.xl,
    right: ThemeSpacing.xxl,
    alignItems: "flex-end",
    gap: 16,
  },
  fab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: ThemeColors.textPrimary,
    paddingHorizontal: ThemeSpacing.xl,
    paddingVertical: 14,
    borderRadius: ThemeRadius.full,
    shadowColor: ThemeColors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  addFab: { backgroundColor: ThemeColors.primary },
  fabActive: {
    backgroundColor: ThemeColors.emerald,
    shadowColor: ThemeColors.emerald,
  },
  fabText: {
    color: ThemeColors.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  mergeFabText: {
    color: ThemeColors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});
