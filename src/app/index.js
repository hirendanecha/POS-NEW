import { CommonHeader } from "@/components/common/CommonHeader";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import DashboardRecentOrders from "@/components/dashboard/DashboardRecentOrders";
import DashboardRunningKOTs from "@/components/dashboard/DashboardRunningKOTs";
import DashboardStatsGrid from "@/components/dashboard/DashboardStatsGrid";
import DashboardTopSelling from "@/components/dashboard/DashboardTopSelling";
import { fetchAllOrders, setOrderType } from "@/store/slices/posSlice";
import { ThemeSpacing, ThemeColors } from "@/theme/theme";
import { useFocusEffect, useRouter } from "expo-router";
import { Activity, IndianRupee, ShoppingBag, Users } from "lucide-react-native";
import { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardScreen() {
  const { user } = useSelector((state) => state.auth);
  const {
    activeBranch,
    branches,
    tables = [],
  } = useSelector((state) => state.branch);
  const { allOrders = [] } = useSelector((state) => state.pos);

  const currentBranch = branches?.find((b) => b.id === activeBranch);
  const branchName = currentBranch?.name || "All Branches";
  const currentBranchId = currentBranch?.id || user?.branch_id;

  const dispatch = useDispatch();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (currentBranchId) {
        dispatch(fetchAllOrders(currentBranchId));
      }
    }, [dispatch, currentBranchId]),
  );

  const { stats, topSellingDishes, recentOrders, runningOrders } =
    useMemo(() => {
      const todayStr = new Date().toISOString().split("T")[0];

      // Filter today's orders
      const todayOrders = allOrders.filter(
        (o) =>
          o.created_at?.startsWith(todayStr) ||
          o.createdAt?.startsWith(todayStr),
      );

      // Calculate stats
      const todaysSales = todayOrders
        .filter((o) => o.status === "Paid")
        .reduce(
          (sum, o) =>
            sum + (Number(o.total_amount) || Number(o.grand_total) || 0),
          0,
        );

      const totalOrdersCount = todayOrders.length;
      const activeTablesCount = tables.filter(
        (t) => t.status === "Occupied",
      ).length;
      const liveActivityCount = todayOrders.filter(
        (o) => o.status === "Pending",
      ).length;

      // Calculate top selling dishes
      const itemCounts = {};
      todayOrders.forEach((order) => {
        let items = [];
        try {
          items =
            typeof order.running_order === "string"
              ? JSON.parse(order.running_order)
              : order.running_order || [];
        } catch (e) {}

        items.forEach((item) => {
          const name = item.product?.name || item.name;
          if (!name) return;
          if (!itemCounts[name]) {
            itemCounts[name] = {
              name,
              orders: 0,
              price:
                item.variant?.price ||
                item.product?.price ||
                item.product?.pricing?.sellingPrice ||
                item.price ||
                0,
            };
          }
          itemCounts[name].orders += item.quantity || 1;
        });
      });

      const topSelling = Object.values(itemCounts)
        .sort((a, b) => b.orders - a.orders)
        .slice(0, 4)
        .map((dish, i) => ({
          id: i + 1,
          name: dish.name,
          orders: dish.orders,
          price: `₹${Number(dish.price).toFixed(2)}`,
          trend: "+0%", // Needs yesterday's data to calculate accurately
        }));

      return {
        stats: [
          {
            id: 1,
            title: "Today's Sales",
            value: `₹${todaysSales.toFixed(2)}`,
            icon: IndianRupee,
            color: ThemeColors.accent,
            change: 0,
            changeLabel: "From Yesterday",
          },
          {
            id: 2,
            title: "Total Orders",
            value: totalOrdersCount.toString(),
            icon: ShoppingBag,
            color: ThemeColors.accent,
            change: 0,
            changeLabel: "From Yesterday",
          },
          {
            id: 3,
            title: "Active Tables",
            value: activeTablesCount.toString(),
            icon: Users,
            color: ThemeColors.accent,
            change: 0,
            changeLabel: "Right Now",
          },
          {
            id: 4,
            title: "Live Activity",
            value: liveActivityCount.toString(),
            icon: Activity,
            color: ThemeColors.accent,
            change: 0,
            changeLabel: "Today",
          },
        ],
        topSellingDishes: topSelling,
        recentOrders: todayOrders.slice(0, 4),
        runningOrders: todayOrders.filter((o) => o.status === "Pending"),
      };
    }, [allOrders, tables]);

  const handleQuickStart = (type) => {
    if (type === "Dine-In") {
      dispatch(setOrderType(type));
      router.push("/tables");
    } else {
      router.push("/pos");
    }
  };

  return (
    <View style={styles.root}>
      <CommonHeader title="Dashboard" />

      <ScrollView contentContainerStyle={styles.container}>
        <DashboardStatsGrid stats={stats} />

        <DashboardQuickActions handleQuickStart={handleQuickStart} />

        <DashboardRunningKOTs runningOrders={runningOrders} />

        <View style={styles.contentRow}>
          <DashboardTopSelling topSellingDishes={topSellingDishes} />
          <DashboardRecentOrders recentOrders={recentOrders} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ThemeColors.bg,
  },
  // ── Scrollable body ──────────────────────────────────
  container: {
    padding: ThemeSpacing.xl || 24,
    gap: ThemeSpacing.xl || 24,
  },
  contentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ThemeSpacing.lg || 20,
  },
});
