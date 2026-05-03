import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';

type FinanceWidgetProps = {
  amount: number;
  subtitle?: string;
  savingsNote?: string;
  emptyText?: string;
  budgetStatus?: string;
};

export default function FinanceWidget({
  amount = 12400,
  savingsNote = "Заощаджено 15% більше, ніж у січні",
  budgetStatus = "Ви в межах бюджету",
  emptyText = "Немає даних за цей період",
}: FinanceWidgetProps) {
  const { t } = useTranslation();
  const isEmpty = amount === 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t('analysis_finance_title')}</Text>
      <Text style={styles.subtitle}>{t('analysis_finance_subtitle')}</Text>

      <Text style={styles.amount}>
        ₴{amount.toLocaleString("uk-UA")}
      </Text>

      {isEmpty ? (
        <Text style={styles.emptyText}>{emptyText}</Text>
      ) : (
        <>
          <Text style={styles.budgetStatus}>{budgetStatus}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="wallet" size={20} color="#8BF1E6" />
            <Text style={styles.infoText}>{savingsNote}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0E1113",
    borderRadius: 16,
    padding: 30,
    gap: 6,
    borderColor: "#rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#888888",
    fontSize: 14,
    marginBottom: 6,
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: -1,
    marginVertical: 4,
  },
  budgetStatus: {
    color: "#8BF1E6",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282B2E",
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 7,
  },
  infoText: {
    color: "#C3C6CF",
    fontSize: 14,
  },
  emptyText: {
    color: "#666666",
    fontSize: 15,
    marginTop: 8,
    fontStyle: "italic",
  },
});