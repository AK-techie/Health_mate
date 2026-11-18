import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BottomNavigation from '../../components/BottomNavigation';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenBackground from '../../components/ScreenBackground';
import useCurrentDate from '../../hooks/useCurrentDate';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import DateFilter from './components/DateFilter';
import DeleteRecordDialog from './components/DeleteRecordDialog';
import EmptyRecords from './components/EmptyRecords';
import RecordCard from './components/RecordCard';
import useDeleteRecord from './hooks/useDeleteRecord';
import useHistoryRecords from './hooks/useHistoryRecords';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

function Separator() {
  return <View style={styles.separator} />;
}

export default function HistoryScreen({ navigation }: Props) {
  const today = useCurrentDate();
  const [filter, setFilter] = useState<string | null>(null);
  const { records, loading, error, refresh } = useHistoryRecords(filter);
  const deletion = useDeleteRecord(refresh);

  function addRecord() {
    navigation.navigate('AddRecord', filter ? { date: filter } : undefined);
  }

  return (
    <ScreenBackground>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={loading || error ? [] : records}
        keyExtractor={(item) => String(item.id)}
        extraData={today}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headingArea}>
              <Text style={styles.heading}>Your daily story.</Text>
              <Text style={styles.subtitle}>Small efforts. A future investment.</Text>
            </View>
            <DateFilter value={filter} onChange={setFilter} />
            <View style={styles.filterRow}>
              <Text style={styles.count} accessibilityLiveRegion="polite">
                {loading
                  ? 'Loading records...'
                  : error
                    ? 'Records unavailable'
                    : `${records.length} ${records.length === 1 ? 'record' : 'records'}${filter ? ' found' : ''}`}
              </Text>
              {filter && (
                <Pressable
                  onPress={() => setFilter(null)}
                  accessibilityRole="button"
                  style={styles.clearButton}
                >
                  <Text style={styles.clearLabel}>Clear filter</Text>
                </Pressable>
              )}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <RecordCard
            record={item}
            today={today}
            onOpen={() => navigation.navigate('DailyRecord', { recordId: item.id })}
            onEdit={() => navigation.navigate('EditRecord', { recordId: item.id })}
            onDelete={() => deletion.requestDelete(item)}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={colors.primary} size="large" />
            </View>
          ) : error ? (
            <View style={styles.errorArea}>
              <Text style={styles.error} accessibilityLiveRegion="polite">
                {error}
              </Text>
              <PrimaryButton title="Try Again" onPress={refresh} />
            </View>
          ) : (
            <EmptyRecords
              filtered={filter !== null}
              onClear={() => setFilter(null)}
              onAdd={addRecord}
            />
          )
        }
      />
      <BottomNavigation
        active="History"
        onHome={() => navigation.popTo('Home')}
        onHistory={refresh}
      />
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
  list: { flex: 1, width: '100%', maxWidth: 393, alignSelf: 'center' },
  listContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  header: { gap: 16, marginBottom: 16 },
  headingArea: { gap: 4 },
  heading: { fontSize: 28, lineHeight: 35, color: colors.text },
  subtitle: { fontSize: 15, lineHeight: 22, color: colors.textSecondary },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
    gap: 12,
  },
  count: { flex: 1, fontSize: 12, lineHeight: 17, color: colors.textSecondary },
  clearButton: {
    minHeight: 48,
    minWidth: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearLabel: { fontSize: 12, lineHeight: 17, color: colors.primary },
  separator: { height: 12 },
  loading: { minHeight: 240, alignItems: 'center', justifyContent: 'center' },
  errorArea: { gap: 16, paddingVertical: 24 },
  error: { color: colors.error, fontSize: 15, lineHeight: 22 },
});
