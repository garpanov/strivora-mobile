import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  description?: string;
  tags?: string[];
};

export default function AnnualCharacteristics({
  description = "Ви демонструєте високу стійкість у першій половині року. Ваша фінансова грамотність зросла на 24%. Найбільшим викликом залишається вечірній екранний час у вихідні дні.",
  tags = ["#Аналітичний_Розум", "#Фінансова_Стабільність", "#Екранний_Заручник"],
}: Props) {
  const { t } = useTranslation();
  const hasTags = tags && tags.length > 0;

  return (
    <View style={styles.glowWrapper}>
    <View style={styles.card}>
      {/* Watermark icon */}
      <View style={styles.watermark}>
        <Ionicons name="analytics-outline" size={200} color="rgba(255,255,255,0.05)" />
      </View>

      <Text style={styles.title}>{t("analysis_yearly_title")}</Text>
      <Text style={styles.description}>{description}</Text>

      {hasTags ? (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="file-tray-outline" size={32} color="rgba(255,255,255,0.3)" />
          <Text style={styles.emptyText}>Немає даних для відображення</Text>
        </View>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glowWrapper: {
    borderRadius: 24,
    shadowColor: "#8bf1e742",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.4,
    shadowRadius: 18,
    elevation: 12, // Android
  },
  card: {
    backgroundColor: "#1c1c1ed8",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: 24,
    overflow: "hidden",
    position: "relative",
  },
  watermark: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 34,
    marginBottom: 16,
    zIndex: 1,
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 24,
    marginBottom: 24,
    zIndex: 1,
  },
  tagsContainer: {
    gap: 10,
    zIndex: 1,
  },
  tag: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 10,
    zIndex: 1,
  },
  emptyText: {
    color: "rgba(255, 255, 255, 0.35)",
    fontSize: 14,
  },
});