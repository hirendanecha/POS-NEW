import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardTopSelling({ topSellingDishes }) {
  return (
    <View style={styles.sideCard}>
      <Text style={styles.cardTitle}>Top Selling Dishes</Text>
      <View style={styles.listContainer}>
        {topSellingDishes.map((dish, index) => (
          <View
            key={dish.id}
            style={[
              styles.listItem,
              index !== topSellingDishes.length - 1 && styles.listItemBorder,
            ]}
          >
            <View style={styles.listItemLeft}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <View>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishPrice}>{dish.price}</Text>
              </View>
            </View>
            <View style={styles.listItemRight}>
              <Text style={styles.dishOrders}>{dish.orders} Orders</Text>
              <Text
                style={[
                  styles.dishTrend,
                  {
                    color: dish.trend.startsWith("+")
                      ? ThemeColors.emerald
                      : ThemeColors.red,
                  },
                ]}
              >
                {dish.trend}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideCard: {
    flex: 1,
    minWidth: 250,
    backgroundColor: ThemeColors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ThemeSpacing.md || 16,
  },
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.border,
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: ThemeColors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  rankText: {
    fontSize: 14,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
  },
  dishName: {
    fontSize: 14,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
    marginBottom: 2,
  },
  dishPrice: {
    fontSize: 12,
    fontWeight: "500",
    color: ThemeColors.textSecondary,
  },
  listItemRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  dishOrders: {
    fontSize: 14,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
  },
  dishTrend: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
