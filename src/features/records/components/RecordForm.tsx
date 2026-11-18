import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HealthIcon from '../../../components/HealthIcon';
import GhostButton from '../../../components/GhostButton';
import PrimaryButton from '../../../components/PrimaryButton';
import ScreenBackground from '../../../components/ScreenBackground';
import { colors } from '../../../theme/colors';
import { formatRecordDate, parseDateKey } from '../../../utils/dates';
import RecordInput from './RecordInput';
import type { RecordFormState } from '../hooks/useRecordForm';

type RecordFormProps = { form: RecordFormState; onBack: () => void };

const FIELDS = [
  { name: 'steps', label: 'Steps walked', unit: 'steps', placeholder: 'Enter steps' },
  {
    name: 'calories',
    label: 'Calories burned',
    unit: 'kcal',
    placeholder: 'Enter calories',
  },
  { name: 'water', label: 'Water intake', unit: 'ml', placeholder: 'Enter water' },
] as const;

export default function RecordForm({ form, onBack }: RecordFormProps) {
  const [showPicker, setShowPicker] = useState(false);
  const {
    dateKey,
    values,
    errors,
    loading,
    saving,
    existing,
    editing,
    loadError,
    saveError,
    changeValue,
    changeDate: selectDate,
    retryLoad,
    handleSave: saveForm,
  } = form;

  function changeDate(event: DateTimePickerEvent, selectedDate?: Date) {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) selectDate(selectedDate);
  }

  function handleSave() {
    Keyboard.dismiss();
    void saveForm();
  }

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Pressable
                onPress={onBack}
                disabled={saving}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                style={styles.backButton}
              >
                <HealthIcon name="back" />
              </Pressable>
              <Text style={styles.headerTitle}>
                {editing ? 'Edit health record' : 'Add health record'}
              </Text>
            </View>
            <View style={styles.headingArea}>
              <Text style={styles.heading}>
                {editing ? 'A little fine-tuning.' : 'Every little bit counts.'}
              </Text>
              <Text style={styles.subtitle}>
                Your daily totals, all at your fingertips.
              </Text>
            </View>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setShowPicker(true);
              }}
              disabled={loading || saving}
              accessibilityRole="button"
              accessibilityLabel={`Choose record date. ${formatRecordDate(parseDateKey(dateKey) ?? new Date())}`}
              style={styles.dateButton}
            >
              <HealthIcon name="search" />
              <Text style={styles.dateText}>
                {formatRecordDate(parseDateKey(dateKey) ?? new Date())}
              </Text>
              <HealthIcon name="calendar" size={20} />
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={parseDateKey(dateKey) ?? new Date()}
                mode="date"
                maximumDate={new Date()}
                onChange={changeDate}
              />
            )}
            {loading ? (
              <ActivityIndicator color={colors.primary} style={styles.loader} />
            ) : (
              <View style={styles.fields}>
                {FIELDS.map((field) => (
                  <RecordInput
                    key={field.name}
                    label={field.label}
                    unit={field.unit}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChangeText={(value) => changeValue(field.name, value)}
                    error={errors[field.name]}
                    editable={!saving && !loadError}
                  />
                ))}
              </View>
            )}
            {existing && !editing && (
              <Text style={styles.note}>Existing totals loaded for this date.</Text>
            )}
            <Text style={styles.note}>
              {editing
                ? 'One record per day. When changing the date, choose a date without another record.'
                : 'One record per day. Saving an existing date replaces its daily totals.'}
            </Text>
            {loadError && (
              <View style={styles.errorArea}>
                <Text style={styles.error} accessibilityLiveRegion="polite">
                  {loadError}
                </Text>
                <PrimaryButton title="Try Again" onPress={retryLoad} />
              </View>
            )}
            {saveError && (
              <Text style={styles.error} accessibilityLiveRegion="polite">
                {saveError}
              </Text>
            )}
            <View style={styles.actions}>
              <PrimaryButton
                title={saving ? 'Saving...' : editing ? 'Update Record' : 'Save Record'}
                onPress={handleSave}
                disabled={loading || saving || loadError !== null}
              />
              {editing && (
                <GhostButton title="Cancel" onPress={onBack} disabled={saving} />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
  },
  content: { flexGrow: 1, width: '100%', maxWidth: 345, alignSelf: 'center', gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  headingArea: { gap: 4 },
  heading: { color: colors.text, fontSize: 28, lineHeight: 35 },
  subtitle: { color: colors.textSecondary, fontSize: 15, lineHeight: 22 },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    minHeight: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  dateText: { flex: 1, color: colors.textSecondary, fontSize: 15, lineHeight: 22 },
  fields: { gap: 12 },
  note: { color: colors.textSecondary, fontSize: 12, lineHeight: 17 },
  actions: { marginTop: 'auto', paddingTop: 16 },
  loader: { marginVertical: 32 },
  errorArea: { gap: 12 },
  error: { color: colors.error, fontSize: 14, lineHeight: 20 },
});
