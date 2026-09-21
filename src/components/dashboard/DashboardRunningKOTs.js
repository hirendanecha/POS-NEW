import { ThemeColors } from "@/theme/theme";
import { Clock, ShoppingBag, UtensilsCrossed } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardRunningKOTs({ runningOrders }) {
  return (
    <View style={styles.contentRow}>
      <View style={styles.mainCard}>
        <Text style={styles.cardTitle}>Running KOTs</Text>
        {runningOrders.length > 0 ? (
          <View style={styles.kotGrid}>
            {runningOrders.map((order) => {
              let items = [];
              try {
                items =
                  typeof order.running_order === "string"
                    ? JSON.parse(order.running_order)
                    : order.running_order || [];
              } catch (e) {}

              const isDineIn = order.order_type?.toLowerCase() === "dine-in";
              const tableName = order.table?.name
                ? `Table ${order.table.name}`
                : isDineIn
                  ? "Dine-In"
                  : "Takeaway";
              const time = new Date(
                order.created_at || order.createdAt,
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <View key={order.id} style={styles.kotCard}>
                  <View
                    style={[
                      styles.kotHeader,
                      {
                        backgroundColor: isDineIn
                          ? ThemeColors.indigoDim
                          : ThemeColors.amberDim,
                        borderBottomColor: isDineIn
                          ? ThemeColors.indigo + "33"
                          : ThemeColors.amber + "33",
                      },
                    ]}
                  >
                    <View style={styles.kotHeaderLeft}>
                      {isDineIn ? (
                        <UtensilsCrossed
                          size={16}
                          color={ThemeColors.textPrimary}
                          style={styles.headerIcon}
                        />
                      ) : (
                        <ShoppingBag
                          size={16}
                          color={ThemeColors.textPrimary}
                          style={styles.headerIcon}
                        />
                      )}
                      <Text style={styles.kotTableName}>{tableName}</Text>
                    </View>
                    <View style={styles.kotHeaderRight}>
                      <Clock
                        size={14}
                        color={ThemeColors.textSecondary}
                        style={styles.timeIcon}
                      />
                      <Text style={styles.kotTime}>{time}</Text>
                    </View>
                  </View>
                  <View style={styles.kotBody}>
                    {items.length > 0 ? (
                      items.map((item, idx) => (
                        <View key={idx} style={styles.kotItemRow}>
                          <View style={styles.kotItemQtyBadge}>
                            <Text style={styles.kotItemQtyText}>
                              {item.quantity}x
                            </Text>
                          </View>
                          <View style={styles.kotItemDetails}>
                            <Text style={styles.kotItemName}>
                              {item.product?.name || item.name}
                            </Text>
                            {item.variant?.name && (
                              <Text style={styles.kotItemVariant}>
                                {item.variant.name}
                              </Text>
                            )}
                          </View>
                          {/* Status badge */}
                          <View
                            style={[
                              styles.kotItemStatusBadge,
                              {
                                backgroundColor:
                                  item.status === "Pending"
                                    ? ThemeColors.red + "1F"
                                    : item.status === "Served"
                                      ? ThemeColors.emerald + "1F"
                                      : ThemeColors.amber + "1F",
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.kotItemStatusText,
                                {
                                  color:
                                    item.status === "Pending"
                                      ? ThemeColors.red
                                      : item.status === "Served"
                                        ? ThemeColors.emerald
                                        : ThemeColors.amber,
                                },
                              ]}
                            >
                              {item.status || "Pending"}
                            </Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.kotItemVariant}>No items found</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderText}>No running orders</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainCard: {
    flex: 2,
    minWidth: 300,
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
  kotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  kotCard: {
    width: 280, // Fixed width for masonry/grid look
    backgroundColor: ThemeColors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    overflow: "hidden",
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  kotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  kotHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  kotHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 6,
  },
  timeIcon: {
    marginRight: 4,
  },
  kotTableName: {
    fontSize: 14,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
  },
  kotTime: {
    fontSize: 12,
    fontWeight: "500",
    color: ThemeColors.textSecondary,
  },
  kotBody: {
    padding: 12,
    gap: 8,
  },
  kotItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },
  kotItemQtyBadge: {
    backgroundColor: ThemeColors.borderSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 36,
    alignItems: "center",
  },
  kotItemQtyText: {
    fontSize: 13,
    fontWeight: "bold",
    color: ThemeColors.textPrimary,
  },
  kotItemDetails: {
    flex: 1,
  },
  kotItemName: {
    fontSize: 14,
    fontWeight: "500",
    color: ThemeColors.textPrimary,
  },
  kotItemVariant: {
    fontSize: 11,
    color: ThemeColors.textSecondary,
    marginTop: 2,
  },
  kotItemStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: "auto",
  },
  kotItemStatusText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
