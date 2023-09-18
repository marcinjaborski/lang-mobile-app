import { FlashcardsScreenProps } from "@src/features/studying";
import { tailwindColors } from "@src/util";
import { Pressable } from "react-native";
import { Text } from "react-native-paper";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { twMerge } from "tailwind-merge";

export const FlashcardsScreen = ({ route }: FlashcardsScreenProps) => {
  const studySet = route.params.studySet;
  const spin = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const onReverse = () => {
    spin.value = spin.value === 0 ? 1 : 0;
  };

  const sharedStyle = "absolute w-3/4 h-1/2 bg-surface backface-hidden items-center justify-center rounded-2xl";

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Swiper activeDotColor={tailwindColors.primary}>
        {studySet.expand.terms?.map((term) => (
          <Pressable className="w-full h-full items-center justify-center -mt-10" key={term.id} onPress={onReverse}>
            <Animated.View className={twMerge(sharedStyle)} style={frontAnimatedStyle}>
              <Text variant="displaySmall">{term?.base}</Text>
            </Animated.View>
            <Animated.View className={twMerge(sharedStyle)} style={backAnimatedStyle}>
              <Text variant="displaySmall">{term?.translation}</Text>
            </Animated.View>
          </Pressable>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};
