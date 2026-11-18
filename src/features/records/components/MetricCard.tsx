import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import HealthIcon from '../../../components/HealthIcon';
import { colors } from '../../../theme/colors';

type MetricCardProps = {
  icon: 'flame' | 'water';
  title: string;
  value: number;
  unit: string;
  progress?: number;
};

export default function MetricCard({
  icon,
  title,
  value,
  unit,
  progress,
}: MetricCardProps) {
  return (
    <LinearGradient
      colors={[colors.cardStart, colors.cardEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.heading}>
        <HealthIcon name={icon} />
        <Text style={styles.label}>{title}</Text>
      </View>
      <Text
        style={styles.value}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.4}
      >
        {value.toLocaleString('en-GB')}
      </Text>
      <Text style={styles.unit}>{unit}</Text>
      {progress !== undefined && (
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${Math.max(0, Math.min(progress, 1)) * 100}%` },
            ]}
          />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0, minHeight: 144, padding: 16, borderRadius: 20, gap: 6 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  label: { fontSize: 12, lineHeight: 17, color: colors.primary },
  value: { fontSize: 30, lineHeight: 35, color: colors.text, fontWeight: '500' },
  unit: { fontSize: 12, lineHeight: 17, color: colors.textSecondary },
  track: {
    height: 6,
    borderRadius: 99,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  fill: { height: 6, borderRadius: 99, backgroundColor: colors.primary },
});
