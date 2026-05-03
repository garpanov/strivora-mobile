import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

export default function FinanceHeroCard() {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../../assets/images/financeBG.png')}
        style={styles.card}
        imageStyle={styles.image}
        resizeMode="cover"
      >
        {/* Dark overlay */}
        <View style={styles.overlay} />

        {/* Header text */}
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Ваш фінансовий{'\n'}спокій.</Text>
          <Text style={styles.subtitle}>
            Усвідомленість у витратах — це перший крок до справжньої свободи.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 12,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  image: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    borderRadius: 20,
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 20,
  },
  sectionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionItem: {
    flex: 1,
    alignItems: 'center',
  },
  sectionValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionLabel: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  sectionDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  emptyBlock: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
});