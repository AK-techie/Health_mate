import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import GhostButton from '../../../components/GhostButton';
import HealthIcon from '../../../components/HealthIcon';
import PrimaryButton from '../../../components/PrimaryButton';
import { colors } from '../../../theme/colors';

export default function EmptyRecords({
  filtered,
  onClear,
  onAdd,
}: {
  filtered: boolean;
  onClear: () => void;
  onAdd: () => void;
}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.backgroundStart, colors.backgroundEnd]}
        style={styles.card}
      >
        <LinearGradient
          colors={[colors.cardStart, colors.cardEnd]}
          style={styles.illustration}
        >
          <HealthIcon name="search-empty" size={32} />
        </LinearGradient>
        <Text style={styles.title}>
          {filtered ? 'A quiet day here.' : 'Your story starts here.'}
        </Text>
        <Text style={styles.body}>
          {filtered
            ? 'No records on this date. Try another day or add an entry.'
            : 'Add your first health record to start your daily story.'}
        </Text>
      </LinearGradient>
      {filtered ? (
        <>
          <PrimaryButton title="View all records" variant="tonal" onPress={onClear} />
          <GhostButton title="Add a record for this date" onPress={onAdd} />
        </>
      ) : (
        <PrimaryButton title="Add a Record" onPress={onAdd} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: {
    minHeight: 260,
    borderRadius: 16,
    padding: 24,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
