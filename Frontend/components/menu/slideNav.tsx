import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  PanResponder,
  Pressable,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { colors, spacing } from '../main/design-tokens';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MENU_HEIGHT = SCREEN_HEIGHT * 0.40;
const CLOSE_THRESHOLD = MENU_HEIGHT * 0.3; 

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  userName?: string;
  securityLevel?: string;
  menuItems?: MenuItem[];
};

const DEFAULT_ITEMS: MenuItem[] = [
  { icon: 'person-outline', label: 'Profile', onPress: () => {} },
  { icon: 'settings-outline', label: 'Settings', onPress: () => {} },
  { icon: 'help-circle-outline', label: 'FAQ', onPress: () => {} },
  { icon: 'log-out-outline', label: 'Log Out', onPress: () => {} },
];

export default function SlideMenu({
  visible,
  onClose,
  menuItems = DEFAULT_ITEMS,
}: Props) {

  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(MENU_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const animateOpen = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateClose = (onDone?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: MENU_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(onDone);
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(MENU_HEIGHT);
      animateOpen();
    } else {
      animateClose();
    }
  }, [visible]);

  // PanResponder тільки на зоні ручки — не заважає скролу всередині меню
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => dy > 5,

      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) {
          translateY.setValue(dy);
        }
      },

      onPanResponderRelease: (_, { dy, vy }) => {
        const shouldClose = dy > CLOSE_THRESHOLD || vy > 0.5;

        if (shouldClose) {
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: MENU_HEIGHT,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
              toValue: 0,
              duration: 180,
              useNativeDriver: true,
            }),
          ]).start(() => onClose());
        } else {
          // Повертаємо назад з пружиною
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 18,
            stiffness: 220,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          { paddingBottom: insets.bottom + 16 },
          { transform: [{ translateY }] },
        ]}
      >
        {/* Drag зона — тільки ця частина реагує на свайп */}
        <View {...panResponder.panHandlers} style={styles.dragZone}>
          <View style={styles.handle} />
        </View>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              item.onPress();
              onClose();
            }}
            activeOpacity={0.6}
          >
            <View style={[styles.menuLeft, item.label == "FAQ" ? { marginTop: 18 } : {}]}>
              <Ionicons name={item.icon} size={23} color={colors.primary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={"rgba(189, 201, 198, 0.3)"} />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MENU_HEIGHT,
    backgroundColor: '#0d0d0d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  dragZone: {
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  panelTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.5,
    lineHeight: 28,
  },
  sessionLabel: {
    color: '#555',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    letterSpacing: 1,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  securityBadge: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  securityLabel: {
    color: '#555',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  securityValue: {
    color: '#8bf1e6',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e1e1e',
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
});