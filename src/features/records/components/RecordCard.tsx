import { Pressable, StyleSheet, Text, View } from 'react-native';

import HealthIcon from '../../../components/HealthIcon';
import { colors } from '../../../theme/colors';
import { formatShortRecordDate, getRecordDayLabel } from '../../../utils/dates';
import type { HealthRecord } from '../types';

type RecordCardProps = {
  record: HealthRecord;
  today: Date;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function RecordCard({
  record,
  today,
  onOpen,
  onEdit,
  onDelete,
}: RecordCardProps) {
  const date = formatShortRecordDate(record.date);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.accent} />
        <Pressable
          onPress={onOpen}
          accessibilityRole="button"
          accessibilityLabel={`View record for ${date}`}
          style={styles.dateButton}
        >
          <Text style={styles.day}>{getRecordDayLabel(record.date, today)}</Text>
          <Text style={styles.date}>{date}</Text>
        </Pressable>
        <Pressable
          onPress={onEdit}
          accessibilityRole="button"
          accessibilityLabel={`Edit record for ${date}`}
          style={styles.action}
        >
          <HealthIcon name="edit" size={20} />
        </Pressable>
        <Pressable
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={`Delete record for ${date}`}
          style={styles.action}
        >
          <HealthIcon name="delete" size={20} />
        </Pressable>
      </View>
      <Pressable onPress={onOpen} accessible={false} style={styles.metrics}>
        <View style={styles.metric}>
          <Text
            style={[styles.value, styles.stepValue]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}
          >
            {record.steps.toLocaleString('en-GB')}
          </Text>
          <Text style={styles.unit}>steps</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.metric}>
          <Text
            style={styles.value}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}
          >
            {record.calories.toLocaleString('en-GB')}
          </Text>
          <Text style={styles.unit}>kcal</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.metric}>
          <Text
            style={styles.value}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}
          >
            {record.water.toLocaleString('en-GB')}
          </Text>
          <Text style={styles.unit}>ml</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.recordBorder,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.recordSurface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 68,
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: 4,
    height: 34,
    borderRadius: 2,
    backgroundColor: colors.recordAccent,
  },
  dateButton: { flex: 1, minWidth: 0, minHeight: 48, justifyContent: 'center', gap: 2 },
  day: { color: colors.text, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  date: { color: colors.textSecondary, fontSize: 12, lineHeight: 17 },
  action: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 64,
    backgroundColor: colors.recordPanel,
  },
  metric: { flex: 1, minWidth: 0, gap: 2 },
  value: { color: colors.onDark, fontSize: 20, lineHeight: 24, fontWeight: '600' },
  stepValue: { color: colors.lime },
  unit: { color: colors.onDarkSecondary, fontSize: 11, lineHeight: 14 },
  separator: { width: 1, height: 34, backgroundColor: colors.progressTrack },
});
