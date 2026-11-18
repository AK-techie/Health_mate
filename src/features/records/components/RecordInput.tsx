import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../../../theme/colors';

type RecordInputProps = {
  label: string;
  unit: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  editable: boolean;
};

export default function RecordInput({
  label,
  unit,
  placeholder,
  value,
  onChangeText,
  error,
  editable,
}: RecordInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.invalid : undefined]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={10}
          editable={editable}
          accessibilityLabel={label}
          accessibilityHint={error ?? 'Enter a whole number, zero or more.'}
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <Text
        style={[styles.hint, error ? styles.error : undefined]}
        accessibilityLiveRegion="polite"
      >
        {error ?? 'Whole numbers, 0 or more'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 4 },
  label: { fontSize: 14, lineHeight: 20, color: colors.text, fontWeight: '600' },
  inputRow: {
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    margin: 0,
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  unit: { color: colors.textSecondary, fontSize: 12, lineHeight: 17 },
  hint: { color: colors.textSecondary, fontSize: 12, lineHeight: 17 },
  invalid: { borderColor: colors.error },
  error: { color: colors.error },
});
