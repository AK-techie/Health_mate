import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import HealthIcon from './HealthIcon';

export default function ScreenHeader({
  title,
  onBack,
  disabled = false,
}: {
  title: string;
  onBack: () => void;
  disabled?: boolean;
}) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        accessibilityState={{ disabled }}
        style={styles.back}
      >
        <HealthIcon name="back" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  back: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, color: colors.text, fontSize: 14, lineHeight: 20, fontWeight: '600' },
});
