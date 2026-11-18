import { LinearGradient } from 'expo-linear-gradient';
import { Modal, ScrollView, StyleSheet, Text } from 'react-native';

import GhostButton from '../../../components/GhostButton';
import PrimaryButton from '../../../components/PrimaryButton';
import { colors } from '../../../theme/colors';
import { formatShortRecordDate } from '../../../utils/dates';
import type { HealthRecord } from '../types';

type DeleteRecordDialogProps = {
  record: HealthRecord | null;
  deleting: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteRecordDialog({
  record,
  deleting,
  error,
  onCancel,
  onConfirm,
}: DeleteRecordDialogProps) {
  return (
    <Modal
      visible={record !== null}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <LinearGradient
        colors={['rgba(19,104,62,0.38)', 'rgba(13,66,45,0.38)']}
        style={styles.screen}
      >
        <ScrollView
          contentContainerStyle={styles.overlay}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={[colors.backgroundStart, colors.backgroundEnd]}
            style={styles.dialog}
            accessibilityViewIsModal
          >
            <Text style={styles.title} accessibilityRole="header">
              Delete this record?
            </Text>
            <Text style={styles.body}>
              Your {record ? formatShortRecordDate(record.date) : ''} totals will be
              removed. This cannot be undone.
            </Text>
            {error && (
              <Text style={styles.error} accessibilityLiveRegion="polite">
                {error}
              </Text>
            )}
            <PrimaryButton
              title={deleting ? 'Deleting...' : 'Delete record'}
              variant="danger"
              onPress={onConfirm}
              disabled={deleting}
            />
            <GhostButton title="Keep record" onPress={onCancel} disabled={deleting} />
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  overlay: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  dialog: {
    width: '100%',
    maxWidth: 345,
    minHeight: 272,
    borderRadius: 24,
    padding: 24,
    gap: 16,
  },
  title: { fontSize: 28, lineHeight: 35, color: colors.text },
  body: { fontSize: 15, lineHeight: 22, color: colors.textSecondary },
  error: { fontSize: 14, lineHeight: 20, color: colors.error },
});
