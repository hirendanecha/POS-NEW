import { CommonHeader } from "@/components/common/CommonHeader";
import { Loader } from "@/components/common/Loader";
import { LogsEmptyState } from "@/components/operations/logs/LogsEmptyState";
import { Text } from "@/components/ui/Text";
import { useResponsive } from "@/hooks/useResponsive";
import { fetchAuditLogs } from "@/store/slices/auditLogSlice";
import { ThemeColors, ThemeRadius, ThemeSpacing } from "@/theme/theme";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ITEMS_PER_PAGE = 15;

export default function LogsScreen() {
  const dispatch = useDispatch();
  const { logs, loading } = useSelector((state) => state.auditLog);
  const activeBranch = useSelector((state) => state.branch?.activeBranch);
  const userBranchId = useSelector((state) => state.auth?.user?.branch_id);
  const currentBranchId =
    activeBranch && activeBranch !== "br-1" ? activeBranch : userBranchId;

  const { isWebDesktop } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentBranchId) {
      dispatch(fetchAuditLogs(currentBranchId));
    }
  }, [dispatch, currentBranchId]);

  const totalPages = Math.ceil((logs?.length || 0) / ITEMS_PER_PAGE);
  const paginatedLogs =
    logs?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    ) || [];

  return (
    <View style={styles.root}>
      <CommonHeader
        title="Audit Logs"
        subtitle="Track system actions and security events"
        isDesktop={isWebDesktop}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.listContent}
      >
        <View style={{ minWidth: 900, width: "100%" }}>
          <View style={styles.tableHeader}>
            <Text weight="bold" style={[styles.col, { width: 130 }]}>
              Reference
            </Text>
            <Text weight="bold" style={[styles.col, { width: 180 }]}>
              Date
            </Text>
            <Text weight="bold" style={[styles.col, { flex: 1 }]}>
              Action
            </Text>

            <Text
              weight="bold"
              style={[styles.col, { width: 100, textAlign: "center" }]}
            >
              Severity
            </Text>
            <Text
              weight="bold"
              style={[styles.col, { width: 120, textAlign: "right" }]}
            >
              User
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                  backgroundColor: ThemeColors.white + "B3",
                  borderBottomLeftRadius: ThemeRadius.md,
                  borderBottomRightRadius: ThemeRadius.md,
                }}
              >
                <Loader text="Loading logs..." />
              </View>
            ) : !logs || logs.length === 0 ? (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                  backgroundColor: ThemeColors.white + "B3",
                  borderBottomLeftRadius: ThemeRadius.md,
                  borderBottomRightRadius: ThemeRadius.md,
                }}
              >
                <LogsEmptyState />
              </View>
            ) : (
              paginatedLogs.map((item, index) => {
                const getSeverityColor = (severity) => {
                  if (severity === "critical") return ThemeColors.red;
                  if (severity === "warning") return ThemeColors.amber;
                  return ThemeColors.blue;
                };
                const severityColor = getSeverityColor(item.severity);

                const isLastItem = index === paginatedLogs.length - 1;

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.tableRow,
                      isLastItem &&
                        totalPages <= 1 && {
                          borderBottomLeftRadius: ThemeRadius.md,
                          borderBottomRightRadius: ThemeRadius.md,
                          borderBottomWidth: 0,
                        },
                    ]}
                  >
                    <Text
                      style={[
                        styles.col,
                        { width: 130, color: ThemeColors.blue },
                      ]}
                      numberOfLines={1}
                    >
                      {item.id.slice(0, 15).toUpperCase()}
                    </Text>
                    <Text
                      style={[
                        styles.col,
                        { width: 180, color: ThemeColors.textMuted },
                      ]}
                    >
                      {new Date(item.created_at).toLocaleString()}
                    </Text>
                    <Text style={[styles.col, { flex: 1 }]} numberOfLines={1}>
                      {item.action || "-"}
                    </Text>

                    <View
                      style={[styles.col, { width: 100, alignItems: "center" }]}
                    >
                      <View
                        style={[
                          styles.badge,
                          { backgroundColor: severityColor + "20" },
                        ]}
                      >
                        <Text
                          weight="bold"
                          style={[styles.badgeText, { color: severityColor }]}
                        >
                          {item.severity ? item.severity.toUpperCase() : "INFO"}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.col,
                        {
                          width: 120,
                          textAlign: "right",
                          color: ThemeColors.textSecondary,
                        },
                      ]}
                    >
                      {item.actor_name || "System"}
                    </Text>
                  </View>
                );
              })
            )}
          </ScrollView>

          {totalPages > 1 && (
            <View style={styles.paginationContainer}>
              <Text style={styles.paginationSummary}>
                Showing{" "}
                <Text weight="bold" style={{ color: ThemeColors.textPrimary }}>
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </Text>{" "}
                to{" "}
                <Text weight="bold" style={{ color: ThemeColors.textPrimary }}>
                  {Math.min(currentPage * ITEMS_PER_PAGE, logs.length)}
                </Text>{" "}
                of{" "}
                <Text weight="bold" style={{ color: ThemeColors.textPrimary }}>
                  {logs.length}
                </Text>{" "}
                entries
              </Text>
              <View style={styles.paginationControls}>
                <TouchableOpacity
                  style={[
                    styles.pageArrowBtn,
                    currentPage === 1 && styles.pageArrowBtnDisabled,
                  ]}
                  disabled={currentPage === 1}
                  onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                >
                  <ChevronLeft
                    size={18}
                    color={
                      currentPage === 1
                        ? ThemeColors.borderSubtle
                        : ThemeColors.textSecondary
                    }
                  />
                </TouchableOpacity>

                {(() => {
                  const pages = [];
                  let startPage = Math.max(1, currentPage - 1);
                  let endPage = Math.min(totalPages, currentPage + 1);

                  if (currentPage <= 2) endPage = Math.min(3, totalPages);
                  if (currentPage >= totalPages - 1)
                    startPage = Math.max(1, totalPages - 2);

                  if (startPage > 1) {
                    pages.push(
                      <TouchableOpacity
                        key="first"
                        style={styles.pageNumberBtn}
                        onPress={() => setCurrentPage(1)}
                      >
                        <Text style={styles.pageNumberText}>1</Text>
                      </TouchableOpacity>,
                    );
                    if (startPage > 2)
                      pages.push(
                        <Text key="ell1" style={styles.pageEllipsis}>
                          ...
                        </Text>,
                      );
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.pageNumberBtn,
                          currentPage === i && styles.pageNumberBtnActive,
                        ]}
                        onPress={() => setCurrentPage(i)}
                      >
                        <Text
                          style={[
                            styles.pageNumberText,
                            currentPage === i && styles.pageNumberTextActive,
                          ]}
                        >
                          {i}
                        </Text>
                      </TouchableOpacity>,
                    );
                  }

                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1)
                      pages.push(
                        <Text key="ell2" style={styles.pageEllipsis}>
                          ...
                        </Text>,
                      );
                    pages.push(
                      <TouchableOpacity
                        key="last"
                        style={styles.pageNumberBtn}
                        onPress={() => setCurrentPage(totalPages)}
                      >
                        <Text style={styles.pageNumberText}>{totalPages}</Text>
                      </TouchableOpacity>,
                    );
                  }
                  return pages;
                })()}

                <TouchableOpacity
                  style={[
                    styles.pageArrowBtn,
                    currentPage === totalPages && styles.pageArrowBtnDisabled,
                  ]}
                  disabled={currentPage === totalPages}
                  onPress={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                >
                  <ChevronRight
                    size={18}
                    color={
                      currentPage === totalPages
                        ? ThemeColors.borderSubtle
                        : ThemeColors.textSecondary
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ThemeColors.white + "80",
  },
  container: {
    width: "100%",
  },
  listContent: {
    padding: ThemeSpacing.lg,
    paddingBottom: 40,
    flexGrow: 1,
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: ThemeSpacing.lg,
    paddingVertical: ThemeSpacing.md,
    backgroundColor: ThemeColors.white + "B3",
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.border,
    borderTopLeftRadius: ThemeRadius.md,
    borderTopRightRadius: ThemeRadius.md,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: ThemeSpacing.lg,
    paddingVertical: ThemeSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borderSubtle,
    alignItems: "center",
    backgroundColor: ThemeColors.white + "80",
  },
  col: {
    fontSize: 13,
    color: ThemeColors.textPrimary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: ThemeRadius.md,
  },
  badgeText: { fontSize: 10 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: ThemeSpacing.xl,
    paddingBottom: ThemeSpacing.lg,
    paddingHorizontal: ThemeSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: ThemeColors.borderSubtle,
    backgroundColor: ThemeColors.white + "B3",
    borderBottomLeftRadius: ThemeRadius.md,
    borderBottomRightRadius: ThemeRadius.md,
    flexWrap: "wrap",
    gap: ThemeSpacing.lg,
  },
  paginationSummary: {
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
  paginationControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pageArrowBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ThemeRadius.full,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    backgroundColor: ThemeColors.white + "B3",
  },
  pageArrowBtnDisabled: {
    backgroundColor: ThemeColors.white + "80",
    borderColor: ThemeColors.borderSubtle,
  },
  pageNumberBtn: {
    minWidth: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ThemeRadius.full,
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
  pageNumberBtnActive: {
    backgroundColor: ThemeColors.amber,
  },
  pageNumberText: {
    fontSize: 14,
    color: ThemeColors.textSecondary,
    fontWeight: "500",
  },
  pageNumberTextActive: {
    color: ThemeColors.white,
    fontWeight: "600",
  },
  pageEllipsis: {
    fontSize: 14,
    color: ThemeColors.textMuted,
    paddingHorizontal: 4,
  },
});
