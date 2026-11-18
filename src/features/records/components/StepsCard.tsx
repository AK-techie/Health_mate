import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../theme/colors';
import ProgressRing from './ProgressRing';

export default function StepsCard({ steps, goal }: { steps: number; goal: number }) {
  return (
    <LinearGradient
      colors={[colors.darkCardStart, colors.darkCardEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.heading}>
        <View style={styles.accent} />
        <Text style={styles.eyebrow}>DAILY MOVEMENT</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.valueArea}>
          <Text
            style={styles.value}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.35}
          >
            {steps.toLocaleString('en-GB')}
          </Text>
          <Text style={styles.unit}>steps</Text>
        </View>
        <ProgressRing value={steps} goal={goal} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.goalLabel}>DAILY GOAL</Text>
        <Text style={styles.target}>{goal.toLocaleString('en-GB')} daily steps</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 24, padding: 20, minHeight: 204, gap: 6 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  accent: { width: 4, height: 12, borderRadius: 2, backgroundColor: colors.lime },
  eyebrow: { fontSize: 11, lineHeight: 14, color: colors.onDarkSecondary },
  main: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  valueArea: { flex: 1, minWidth: 0, gap: 2 },
  value: { fontSize: 48, lineHeight: 62, color: colors.onDark, fontWeight: '500' },
  unit: { fontSize: 14, lineHeight: 18, color: colors.onDarkSecondary },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.progressTrack,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  goalLabel: { fontSize: 10, lineHeight: 14, color: colors.onDarkSecondary },
  target: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.onDark,
    flexShrink: 1,
    textAlign: 'right',
  },
});
