import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '../../../theme/colors';

export default function ProgressRing({ value, goal }: { value: number; goal: number }) {
  const percentage = goal > 0 ? (value / goal) * 100 : 0;
  const progress = Math.max(0, Math.min(percentage / 100, 1));
  const circumference = 2 * Math.PI * 54;

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`${percentage.toFixed(1)} percent of daily step goal`}
    >
      <Svg width={118} height={118} viewBox="0 0 118 118">
        <Circle
          cx={59}
          cy={59}
          r={54}
          fill="none"
          stroke={colors.progressTrack}
          strokeWidth={10}
        />
        <Circle
          cx={59}
          cy={59}
          r={54}
          fill="none"
          stroke={colors.lime}
          strokeWidth={10}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - progress)}
          rotation={-90}
          origin="59, 59"
        />
      </Svg>
      <View style={styles.label}>
        <Text
          style={styles.percentage}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.4}
        >
          {percentage.toFixed(1)}%
        </Text>
        <Text style={styles.caption}>PROGRESS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 118, height: 118 },
  label: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    padding: 12,
  },
  percentage: { color: colors.onDark, fontSize: 22, lineHeight: 29, fontWeight: '500' },
  caption: { color: colors.onDarkSecondary, fontSize: 8, lineHeight: 12 },
});
