import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import GhostButton from '../../components/GhostButton';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenBackground from '../../components/ScreenBackground';
import ScreenHeader from '../../components/ScreenHeader';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { formatRecordDate, parseDateKey } from '../../utils/dates';
import DeleteRecordDialog from './components/DeleteRecordDialog';
import MetricCard from './components/MetricCard';
import StepsCard from './components/StepsCard';
import { STEP_GOAL, WATER_GOAL } from './constants';
import useDeleteRecord from './hooks/useDeleteRecord';
import useRecordById from './hooks/useRecordById';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyRecord'>;

export default function DailyRecordScreen({ navigation, route }: Props) {
  const { record, loading, error, refresh } = useRecordById(route.params.recordId);
  const deletion = useDeleteRecord(() => {
    if (navigation.isFocused()) navigation.goBack();
  });
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <ScreenHeader
            title="Daily record"
            onBack={() => navigation.goBack()}
            disabled={deletion.deleting}
          />
          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={styles.loading}
            />
          ) : error ? (
            <View style={styles.message}>
              <Text style={styles.error} accessibilityLiveRegion="polite">
                {error}
              </Text>
              <PrimaryButton title="Try Again" onPress={refresh} />
            </View>
          ) : !record ? (
            <View style={styles.message}>
              <Text style={styles.heading}>Record unavailable.</Text>
              <Text style={styles.subtitle}>
                This record is no longer on your device.
              </Text>
              <PrimaryButton title="Go Back" onPress={() => navigation.goBack()} />
            </View>
          ) : (
            <>
              <View style={styles.headingArea}>
                <Text style={styles.heading}>Your daily activity.</Text>
                <Text style={styles.subtitle}>
                  {formatRecordDate(parseDateKey(record.date) ?? new Date())}
                </Text>
              </View>
              <StepsCard steps={record.steps} goal={STEP_GOAL} />
              <View style={styles.metrics}>
                <MetricCard
                  icon="flame"
                  title="ENERGY"
                  value={record.calories}
                  unit="kcal burned"
                />
                <MetricCard
                  icon="water"
                  title="HYDRATION"
                  value={record.water}
                  unit={`of ${WATER_GOAL.toLocaleString('en-GB')} ml`}
                  progress={record.water / WATER_GOAL}
                />
              </View>
              <PrimaryButton
                title="Edit Record"
                onPress={() => navigation.navigate('EditRecord', { recordId: record.id })}
              />
              <GhostButton
                title="Delete record"
                variant="danger"
                onPress={() => deletion.requestDelete(record)}
              />
            </>
          )}
        </View>
      </ScrollView>
      <DeleteRecordDialog
        record={deletion.target}
        deleting={deletion.deleting}
        error={deletion.error}
        onCancel={deletion.cancelDelete}
        onConfirm={deletion.confirmDelete}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
  },
  content: { width: '100%', maxWidth: 345, alignSelf: 'center', gap: 16 },
  headingArea: { gap: 4 },
  heading: { color: colors.text, fontSize: 28, lineHeight: 35 },
  subtitle: { color: colors.textSecondary, fontSize: 15, lineHeight: 22 },
  metrics: { flexDirection: 'row', gap: 12 },
  loading: { marginVertical: 48 },
  message: { gap: 16, paddingVertical: 24 },
  error: { color: colors.error, fontSize: 15, lineHeight: 22 },
});
