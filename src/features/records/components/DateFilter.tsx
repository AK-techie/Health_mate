import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import HealthIcon from '../../../components/HealthIcon';
import { colors } from '../../../theme/colors';
import { formatDateKey, formatRecordDate, parseDateKey } from '../../../utils/dates';

export default function DateFilter({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (date: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const selected = value ? (parseDateKey(value) ?? new Date()) : new Date();
  function changeDate(event: DateTimePickerEvent, date?: Date) {
    setVisible(false);
    if (event.type === 'set' && date) onChange(formatDateKey(date));
  }
  return (
    <View>
      <Pressable
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={
          value
            ? `Filter records. ${formatRecordDate(selected)}`
            : 'Search records by date'
        }
        style={styles.button}
      >
        <HealthIcon name="search" />
        <Text style={styles.label}>
          {value ? formatRecordDate(selected) : 'Search by date'}
        </Text>
        <HealthIcon name="calendar" size={20} />
      </Pressable>
      {visible && (
        <DateTimePicker
          value={selected}
          mode="date"
          maximumDate={new Date()}
          onChange={changeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  label: { flex: 1, fontSize: 15, lineHeight: 22, color: colors.textSecondary },
});
