import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../../../theme/colors';

type DailyStepsRingProps = {
  steps: number;
  goal: number;
};

const RADIUS = 132;
const ARC_LENGTH = 2 * Math.PI * RADIUS * (270 / 360);
// A 270-degree arc leaves an opening at the bottom of the ring.
const ARC_PATH = 'M 66.662 253.338 A 132 132 0 1 1 253.338 253.338';

export default function DailyStepsRing({ steps, goal }: DailyStepsRingProps) {
  const percentage = goal > 0 ? Math.round((steps / goal) * 100) : 0;
  const progress = Math.max(0, Math.min(goal > 0 ? steps / goal : 0, 1));

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Today's steps"
      accessibilityValue={{
        min: 0,
        max: goal,
        now: Math.min(steps, goal),
        text: `${steps.toLocaleString('en-GB')} steps, ${percentage}% of your daily goal`,
      }}
    >
      <Svg width="100%" height="100%" viewBox="0 0 320 320" accessible={false}>
        <Path
          d={ARC_PATH}
          fill="none"
          stroke={colors.cardEnd}
          strokeWidth={14}
          strokeLinecap="round"
        />
        {progress > 0 && (
          <Path
            d={ARC_PATH}
            fill="none"
            stroke={colors.primary}
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray={`${ARC_LENGTH} ${ARC_LENGTH}`}
            strokeDashoffset={ARC_LENGTH * (1 - progress)}
          />
        )}
      </Svg>

      <View style={styles.centre} pointerEvents="none">
        <View style={styles.walkBadge}>
          <Svg width={27} height={27} viewBox="0 0 24 24" accessible={false}>
            <Circle cx={14} cy={4} r={2} fill={colors.primary} />
            <Path
              d="M12.5 8 L10 13 L13.5 16 L15.5 21 M10 13 L6 20 M12.5 8 L16 11 L19 12 M12.5 8 L8 9.5 L7 13"
              fill="none"
              stroke={colors.primary}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <Text
          style={styles.value}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.35}
          maxFontSizeMultiplier={1.2}
        >
          {steps.toLocaleString('en-GB')}
        </Text>
        <Text style={styles.label} maxFontSizeMultiplier={1.2}>steps today</Text>
        <Text style={styles.target} maxFontSizeMultiplier={1.2}>
          {percentage}% of {goal.toLocaleString('en-GB')}
        </Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <Text style={styles.encouragement} maxFontSizeMultiplier={1.2}>
        {steps >= goal ? 'Goal reached!' : steps > 0 ? 'Keep going!' : 'A fresh start'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 300, aspectRatio: 1, alignSelf: 'center' },
  centre: {
    position: 'absolute',
    top: '17%',
    left: '17%',
    right: '17%',
    bottom: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  walkBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardEnd,
    marginBottom: 3,
  },
  value: {
    width: '100%',
    color: colors.text,
    textAlign: 'center',
    fontSize: 50,
    lineHeight: 60,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  label: { color: colors.text, fontSize: 18, lineHeight: 24 },
  target: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 8 },
  track: {
    width: '86%',
    height: 7,
    marginTop: 3,
    borderRadius: 99,
    backgroundColor: colors.cardEnd,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: colors.primary, borderRadius: 99 },
  encouragement: {
    position: 'absolute',
    bottom: 18,
    right: 0,
    maxWidth: 76,
    color: colors.primary,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
