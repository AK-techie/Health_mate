import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../../components/PrimaryButton';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <LinearGradient
      colors={[colors.backgroundStart, colors.backgroundEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Image
              source={require('../../../assets/images/healthmate-logo.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="HealthMate logo"
            />

            <Image
              source={require('../../../assets/images/welcome-illustration.png')}
              style={styles.illustration}
              resizeMode="contain"
              accessibilityLabel="A heart with a heartbeat and a caring hand"
            />

            <View style={styles.copy}>
              <Text style={styles.heading}>
                {'A little better health style,\nevery day.'}
              </Text>
              <Text style={styles.description}>
                Your steps, hydration and daily activity — all in one peaceful place.
              </Text>
            </View>

            <View
              style={styles.dots}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <View style={styles.activeDot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

            <PrimaryButton
              title="Get Started"
              onPress={() => navigation.replace('Home')}
            />

            <Text style={styles.tagline}>EVERYDAY, BETTER LIFE & BETTER BREATH</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: 345,
    alignSelf: 'center',
    gap: 20,
  },
  logo: {
    width: 180,
    height: 72,
  },
  illustration: {
    width: '100%',
    aspectRatio: 345 / 282,
  },
  copy: {
    gap: 14,
  },
  heading: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 43,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 325,
  },
  dots: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 24,
    height: 5,
    borderRadius: 99,
    backgroundColor: colors.primary,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    backgroundColor: colors.inactiveDot,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
  },
});
