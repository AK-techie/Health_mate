import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import HealthIcon from '../../../components/HealthIcon';
import { colors } from '../../../theme/colors';

type DashboardMetricCardProps = {
  icon: 'water' | 'flame';
  title: string;
  value: string;
  caption: string;
  progress?: number;
  onPress: () => void;
};

export default function DashboardMetricCard({
  icon,
  title,
  value,
  caption,
  progress,
  onPress,
}: DashboardMetricCardProps) {
  const fillPercentage = Math.max(0, Math.min(progress ?? 0, 1)) * 100;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${value}, ${caption}`}
      accessibilityHint="Opens today's record, or the add form if no record is saved."
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={
          icon === 'water'
            ? ['#E0F2FE', '#93C5FD']
            : ['#FEE2E2', '#FCA5A5']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.heading}>
          <View style={styles.iconBadge}>
            <HealthIcon name={icon} size={27} />
          </View>
          <Text style={styles.chevron} accessible={false}>›</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.value}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.35}
        >
          {value}
        </Text>
        <Text style={styles.caption}>{caption}</Text>
        {progress !== undefined ? (
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${fillPercentage}%` }]} />
          </View>
        ) : (
          <Text style={styles.footer}>Daily total</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minWidth: 0, borderRadius: 22 },
  card: { flex: 1, minHeight: 164, borderRadius: 22, padding: 14, gap: 4 },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  chevron: { color: colors.primary, fontSize: 25, lineHeight: 30 },
  title: { color: colors.text, fontSize: 14, lineHeight: 20 },
  value: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  caption: { color: colors.text, fontSize: 12, lineHeight: 18 },
  track: {
    height: 7,
    marginTop: 5,
    borderRadius: 99,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 99, backgroundColor: colors.primary },
  footer: { color: colors.primaryDark, fontSize: 10, lineHeight: 14, marginTop: 2 },
  pressed: { opacity: 0.8 },
});
