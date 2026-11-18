import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';

type GhostButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
};

export default function GhostButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}: GhostButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.dimmed]}
    >
      <Text style={[styles.label, variant === 'danger' && styles.danger]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  label: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  danger: { color: colors.danger },
  dimmed: { opacity: 0.7 },
});
