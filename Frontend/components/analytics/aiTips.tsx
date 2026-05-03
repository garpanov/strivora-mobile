import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';

type Tip = {
  title: string;
  description: string;
};

type AiTipsCardProps = {
  tips?: Tip[];
  onOptimize?: () => void;
};

export default function AiTipsCard({ tips = [], onOptimize }: AiTipsCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Ionicons name="sparkles" size={18} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>{t('analysis_ai_title')}</Text>
      </View>

      {/* Content */}
      {tips.length === 0 ? (
        <Text style={styles.emptyText}>
          Поки що порад немає. Повертайтесь пізніше — AI проаналізує вашу активність.
        </Text>
      ) : (
        tips.map((tip, index) => (
          <React.Fragment key={index}>
            {index > 0 && <View style={styles.divider} />}
            <View style={styles.tipBlock}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          </React.Fragment>
        ))
      )}

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onOptimize} activeOpacity={0.85}>
        <Text style={styles.buttonText}>{t('analysis_ai_button')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#8BF1E6",
    borderRadius: 24,
    padding: 30,
    gap: 12,
    marginTop: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  iconWrapper: {
    backgroundColor: "#002927",
    borderRadius: 50,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Manrope"
  },
  emptyText: {
    fontSize: 14,
    color: "#1A1A1A",
    lineHeight: 20,
    marginVertical: 8,
  },
  tipBlock: {
    gap: 4,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#006F67",
    lineHeight: 22,
    fontFamily: "Inter-SemiBold"
  },
  tipDescription: {
    fontSize: 14,
    color: "#006F67",
    lineHeight: 20,
    fontFamily: "Inter-Medium"
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.12)",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#1A1A1A",
    borderRadius: 17,
    paddingVertical: 19,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter-SemiBold"
  },
});