import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';

export default function ScreenBackground({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={[colors.backgroundStart, colors.backgroundEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
