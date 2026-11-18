import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HealthIcon from '../../components/HealthIcon';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenBackground from '../../components/ScreenBackground';
import useCurrentDate from '../../hooks/useCurrentDate';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { formatDateKey, getGreeting } from '../../utils/dates';
import DashboardMetricCard from './components/DashboardMetricCard';
import DailyStepsRing from './components/DailyStepsRing';
import { STEP_GOAL, WATER_GOAL } from './constants';
import useDailyRecord from './hooks/useDailyRecord';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Change this name to personalise the greeting.
const DISPLAY_NAME = 'Akshan';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const today = useCurrentDate();
  const dateKey = formatDateKey(today);
  const { record, loading, error, refresh } = useDailyRecord(dateKey);
  const steps = record?.steps ?? 0;
  const calories = record?.calories ?? 0;
  const water = record?.water ?? 0;
  const remainingSteps = Math.max(STEP_GOAL - steps, 0);

  const goalMessage = !record
    ? 'Your daily progress starts here.'
    : remainingSteps === 0
      ? 'You have reached your daily step goal!'
      : `You're ${remainingSteps.toLocaleString('en-GB')} steps away from your daily goal!`;

  function openRecordForm() {
    navigation.navigate('AddRecord', { date: dateKey });
  }

  return (
    <ScreenBackground>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.greetingCopy}>
              <Text style={styles.greeting}>{getGreeting(today)},</Text>
              <View style={styles.nameRow}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {DISPLAY_NAME}
                </Text>
                <HealthIcon name="leaf" size={24} />
              </View>
              <Text style={styles.subtitle}>
                A healthier you, a brighter tomorrow.
              </Text>
            </View>
            <View style={styles.headerSide}>
              <View
                style={styles.avatar}
                accessible
                accessibilityLabel={DISPLAY_NAME}
              >
                <Text style={styles.initial}>{DISPLAY_NAME.charAt(0)}</Text>
              </View>
              <LinearGradient
                colors={[colors.cardStart, colors.cardEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quote}
              >
                <Text style={styles.quoteText}>
                  Small steps make big changes.
                </Text>
              </LinearGradient>
            </View>
          </View>

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.subtitle}>Loading your daily record...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorArea}>
              <Text style={styles.error} accessibilityLiveRegion="polite">
                {error}
              </Text>
              <PrimaryButton title="Try Again" onPress={refresh} />
            </View>
          ) : (
            <>
              <DailyStepsRing steps={steps} goal={STEP_GOAL} />

              <View style={styles.metrics}>
                <DashboardMetricCard
                  icon="water"
                  title="Hydration"
                  value={`${(water / 1000).toLocaleString('en-GB', {
                    maximumFractionDigits: 3,
                  })} L`}
                  caption={`of ${WATER_GOAL / 1000} L`}
                  progress={water / WATER_GOAL}
                  onPress={openRecordForm}
                />
                <DashboardMetricCard
                  icon="flame"
                  title="Calories"
                  value={calories.toLocaleString('en-GB')}
                  caption="kcal burned"
                  onPress={openRecordForm}
                />
              </View>

              <PrimaryButton
                title="Add today's activity"
                onPress={() => navigation.navigate('AddRecord', { date: dateKey })}
              />

              <Pressable
                onPress={openRecordForm}
                accessibilityRole="button"
                accessibilityLabel={
                  record ? "Edit today's record" : "Add today's record"
                }
                accessibilityHint={goalMessage}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <LinearGradient
                  colors={[colors.cardStart, colors.cardEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.goalBanner}
                >
                  <View style={styles.leafBadge}>
                    <HealthIcon name="leaf" size={25} />
                  </View>
                  <View style={styles.goalCopy}>
                    <Text style={styles.goalText}>{goalMessage}</Text>
                    <Text style={styles.goalAction}>
                      {record ? "Edit today's record" : "Add today's record"}
                    </Text>
                  </View>
                  <Text style={styles.chevron} accessible={false}>›</Text>
                </LinearGradient>
              </Pressable>

              <Text style={styles.storageNote}>
                {record
                  ? 'Your daily totals are saved on this device.'
                  : 'No record saved for today.'}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  content: { width: '100%', maxWidth: 420, alignSelf: 'center', gap: 18 },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  greetingCopy: { flex: 1, minWidth: 0, gap: 5 },
  greeting: { color: colors.text, fontSize: 18, lineHeight: 25 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: {
    flexShrink: 1,
    color: colors.text,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700',
  },
  subtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 20 },
  headerSide: { width: '36%', alignItems: 'flex-end', gap: 14 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardEnd,
  },
  initial: { color: colors.primary, fontSize: 17, fontWeight: '600' },
  quote: { width: '100%', borderRadius: 18, padding: 12 },
  quoteText: { color: colors.text, fontSize: 12, lineHeight: 18 },
  metrics: { flexDirection: 'row', alignItems: 'stretch', gap: 12 },
  goalBanner: {
    minHeight: 88,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leafBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  goalCopy: { flex: 1, gap: 5 },
  goalText: { color: colors.text, fontSize: 14, lineHeight: 21 },
  goalAction: { color: colors.primary, fontSize: 12, lineHeight: 18, fontWeight: '600' },
  chevron: { color: colors.primary, fontSize: 28, lineHeight: 32 },
  storageNote: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
  },
  pressed: { opacity: 0.8 },
  loading: { minHeight: 320, alignItems: 'center', justifyContent: 'center', gap: 16 },
  errorArea: { gap: 16, paddingVertical: 24 },
  error: { color: colors.error, fontSize: 15, lineHeight: 22 },
});
