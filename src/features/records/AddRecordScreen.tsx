import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../navigation/types';
import RecordForm from './components/RecordForm';
import useRecordForm from './hooks/useRecordForm';

type Props = NativeStackScreenProps<RootStackParamList, 'AddRecord'>;

export default function AddRecordScreen({ navigation, route }: Props) {
  const form = useRecordForm(route.params?.date, () => {
    if (navigation.isFocused()) navigation.goBack();
  });
  return <RecordForm form={form} onBack={() => navigation.goBack()} />;
}
