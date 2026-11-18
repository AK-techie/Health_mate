import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import HealthIcon from './HealthIcon';

type BottomNavigationProps = {
  active: 'Home' | 'History';
  onHome: () => void;
  onHistory: () => void;
};

export default function BottomNavigation({
  active,
  onHome,
  onHistory,
}: BottomNavigationProps) {
  return (
    <View style={styles.background}>
      <View style={styles.tabs}>
        <Pressable
          onPress={onHome}
          accessibilityRole="tab"
          accessibilityState={{ selected: active === 'Home' }}
          style={styles.tab}
        >
          <View style={[styles.pill, active === 'Home' && styles.activePill]}>
            <HealthIcon name={active === 'Home' ? 'home-active' : 'home'} />
          </View>
          <Text style={[styles.label, active === 'Home' && styles.activeLabel]}>
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={onHistory}
          accessibilityRole="tab"
          accessibilityState={{ selected: active === 'History' }}
          style={styles.tab}
        >
          <View style={[styles.pill, active === 'History' && styles.activePill]}>
            <HealthIcon name={active === 'History' ? 'history-active' : 'history'} />
          </View>
          <Text style={[styles.label, active === 'History' && styles.activeLabel]}>
            History
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { backgroundColor: colors.backgroundStart },
  tabs: {
    width: '100%',
    maxWidth: 393,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: { flex: 1, minHeight: 64, padding: 8, alignItems: 'center', gap: 4 },
  pill: {
    width: 48,
    height: 28,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: { backgroundColor: colors.cardEnd },
  label: { color: colors.textSecondary, fontSize: 12, lineHeight: 17 },
  activeLabel: { color: colors.primary },
});
