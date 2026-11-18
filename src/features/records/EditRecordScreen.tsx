import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../navigation/types';
import RecordForm from './components/RecordForm';
import useRecordForm from './hooks/useRecordForm';

type Props = NativeStackScreenProps<RootStackParamList, 'EditRecord'>;

export default function EditRecordScreen({ navigation, route }: Props) {
  const form = useRecordForm(
    undefined,
    () => {
      if (navigation.isFocused()) navigation.goBack();
    },
    route.params.recordId,
  );
  return <RecordForm form={form} onBack={() => navigation.goBack()} />;
}
