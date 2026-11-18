import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'tonal';
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.dimmed]}
    >
      <LinearGradient
        colors={
          variant === 'danger'
            ? [colors.danger, colors.danger]
            : variant === 'tonal'
              ? [colors.cardStart, colors.cardEnd]
              : [colors.primary, colors.primaryDark]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.label, variant === 'tonal' && styles.tonalLabel]}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    minHeight: 54,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.buttonText,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  dimmed: {
    opacity: 0.7,
  },
  tonalLabel: { color: colors.primary },
});
