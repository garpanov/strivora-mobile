import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';

export type DayData = { done: number; total: number };

type Props = {
  month: string;
  year: number;
  totalDays: number;
  dayData: Record<number, DayData>;
  discipline: number;
  skipped: number;
};

const COLS = 7;
const GAP = 8;
const COLOR_FROM = { r: 0xff, g: 0x7f, b: 0x70 }; // #FF7F70
const COLOR_TO = { r: 0x8b, g: 0xf1, b: 0xe6 };   // #8BF1E6
const COLOR_EMPTY = "#1C2E2B";

function getRatioColor(ratio: number): string {
  const t = Math.max(0, Math.min(1, ratio));
  const r = Math.round(COLOR_FROM.r + (COLOR_TO.r - COLOR_FROM.r) * t);
  const g = Math.round(COLOR_FROM.g + (COLOR_TO.g - COLOR_FROM.g) * t);
  const b = Math.round(COLOR_FROM.b + (COLOR_TO.b - COLOR_FROM.b) * t);
  return `rgb(${r},${g},${b})`;
}

export default function TaskCompletionWidget({
  month,
  year,
  totalDays,
  dayData,
  discipline,
  skipped,
}: Props) {
  const { t } = useTranslation();
  const [cellSize, setCellSize] = useState(0);

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const rows: number[][] = [];
  for (let i = 0; i < days.length; i += COLS) {
    rows.push(days.slice(i, i + COLS));
  }

  const getCellColor = (day: number): string => {
    const data = dayData[day];
    if (!data || data.total === 0) return COLOR_EMPTY;
    return getRatioColor(data.done / data.total);
  };

  const isEmpty = discipline === 0 && skipped === 0;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("analysis_tasks_title")}</Text>
        <Text style={styles.date}>{`${month}\n${year}`}</Text>
      </View>

      {/* Grid — measure its width to compute cell size */}
      <View
        style={styles.grid}
        onLayout={(e) => {
          const gridWidth = e.nativeEvent.layout.width;
          // 7 cells + 6 gaps
          setCellSize(Math.floor((gridWidth - GAP * (COLS - 1)) / COLS));
        }}
      >
        {cellSize > 0 &&
          rows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {row.map((day) => (
                <View
                  key={day}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderRadius: 10,
                    backgroundColor: getCellColor(day),
                  }}
                />
              ))}
            </View>
          ))}
      </View>

      {/* Footer */}
      {isEmpty ? (
        <Text style={styles.emptyText}>Немає даних за цей місяць</Text>
      ) : (
        <View style={styles.footer}>
          <View>
            <Text style={styles.statValue}>{discipline}%</Text>
            <Text style={styles.statLabel}>{t("analysis_tasks_discipline")}</Text>
          </View>
          <View>
            <Text style={styles.statValue}>{skipped}</Text>
            <Text style={styles.statLabel}>{t("analysis_tasks_missed")}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0E1113",
    marginVertical: 20,
    borderRadius: 24,
    padding: 30,
    gap: 20,
    borderColor: "#rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  date: {
    color: "#C3C6CF",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "right",
    lineHeight: 20,
  },
  grid: {
    gap: GAP,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    gap: GAP,
  },
  footer: {
    flexDirection: "row",
    gap: 32,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 32,
  },
  statLabel: {
    color: "#8A9E9B",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginTop: 2,
  },
  emptyText: {
    color: "#8A9E9B",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 8,
  },
});