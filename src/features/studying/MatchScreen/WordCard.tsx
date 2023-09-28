import { cn } from "@src/util";
import React from "react";
import { Pressable } from "react-native";
import { Text } from "react-native-paper";
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";

type WordCardProps = {
  word: string;
  selected: boolean;
  flipped: number;
  incorrect: boolean;
  onPress: (word: string) => void;
};

export const WordCard = ({ word, selected, flipped, incorrect, onPress }: WordCardProps) => {
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(flipped, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, [flipped]);

  const handlePress = () => {
    onPress(word);
  };

  return (
    <Pressable className="w-1/4 h-1/5 items-center" onPress={handlePress}>
      <Animated.View
        className={cn(
          "transition-all items-center justify-center backface-hidden bg-surface w-5/6 h-5/6 border-2 border-transparent rounded",
          {
            "border-error": incorrect,
            "border-primary": selected,
          },
        )}
        style={frontAnimatedStyle}
      >
        <Text variant="bodySmall">{word}</Text>
      </Animated.View>
    </Pressable>
  );
};
