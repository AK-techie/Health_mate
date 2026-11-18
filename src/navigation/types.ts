export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  AddRecord: { date?: string } | undefined;
  History: undefined;
  DailyRecord: { recordId: number };
  EditRecord: { recordId: number };
};
