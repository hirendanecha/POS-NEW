import { ThemeColors, ThemeSpacing } from "@/theme/theme";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardRecentOrders({ recentOrders }) {
  return (
    <View style={styles.sideCard}>
      <Text style={styles.cardTitle}>Recent Orders</Text>
      {recentOrders.length > 0 ? (
        <View style={styles.listContainer}>
          {recentOrders.map((order, index) => (
            <View
              key={order.id}
              style={[
                styles.listItem,
                index !== recentOrders.length - 1 && styles.listItemBorder,
              ]}
            >
              <View style={styles.listItemLeft}>
                <View
                  style={[
                    styles.rankBadge,
                    {
                      backgroundColor:
                        order.order_type?.toLowerCase() === "dine-in"
                          ? ThemeColors.indigoDim
                          : ThemeColors.amberDim,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.rankText,
                      {
                        color:
                          order.order_type?.toLowerCase() === "dine-in"
                            ? ThemeColors.accent
                            : ThemeColors.jain,
                      },
                    ]}
                  >
                    {order.order_type?.toLowerCase() === "dine-in"
                      ? "DI"
                      : "TA"}
                  </Text>
                </View>
                <View>
                  <Text style={styles.dishName}>
                    {order.order_type?.toLowerCase() === "dine-in"
                      ? order.table?.name
                        ? `Table ${order.table.name}`
                        : "Dine-In"
                      : order.customer_info?.name
                        ? `${order.customer_info.name} ${order.customer_info.phone ? `(${order.customer_info.phone})` : ""}`
                        : "Takeaway"}
                  </Text>
                  <Text style={styles.dishPrice}>
                    {new Date(
                      order.created_at || order.createdAt,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
              <View style={styles.listItemRight}>
                <Text style={styles.dishOrders}>
                  ₹
                  {Number(order.total_amount || order.grand_total || 0).toFixed(
                    2,
                  )}
                </Text>
                <Text
                  style={[
                    styles.dishTrend,
                    {
                      color:
                        order.status === "Paid"
                          ? ThemeColors.emerald
                          : ThemeColors.red,
                    },
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>No recent orders</Text>
        </View>
      )}
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
  placeholderBox: {
    height: 200,
    backgroundColor: ThemeColors.bg,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.border,
    borderStyle: "dashed",
  },
  placeholderText: {
    color: ThemeColors.textMuted,
    fontSize: 14,
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
    backgroundColor: ThemeColors.amberDim, // Leaving as explicit as there's no matching bg
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
