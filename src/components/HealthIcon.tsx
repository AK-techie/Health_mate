import { Image } from 'react-native';

const icons = {
  sun: require('../../assets/icons/sun.png'),
  flame: require('../../assets/icons/flame.png'),
  water: require('../../assets/icons/water.png'),
  leaf: require('../../assets/icons/leaf.png'),
  back: require('../../assets/icons/back.png'),
  search: require('../../assets/icons/search.png'),
  calendar: require('../../assets/icons/calendar.png'),
  home: require('../../assets/icons/home.png'),
  'home-active': require('../../assets/icons/home-active.png'),
  history: require('../../assets/icons/history.png'),
  'history-active': require('../../assets/icons/history-active.png'),
  edit: require('../../assets/icons/edit.png'),
  delete: require('../../assets/icons/delete.png'),
  'search-empty': require('../../assets/icons/search-empty.png'),
};

export type HealthIconName = keyof typeof icons;

export default function HealthIcon({
  name,
  size = 22,
}: {
  name: HealthIconName;
  size?: number;
}) {
  return (
    <Image
      source={icons[name]}
      style={{ width: size, height: size }}
      resizeMode="contain"
      accessible={false}
    />
  );
}
