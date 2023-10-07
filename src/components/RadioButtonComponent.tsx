import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
const { height, width } = Dimensions.get("window");

import { useTheme } from "@react-navigation/native";
interface Props {
  answer: string[];
  handleAnswerChecked: (answer: string) => void;
}
const RadioButtonComponent = ({ answer, handleAnswerChecked }: Props) => {
  const { colors } = useTheme();
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const handleCorrect = (value: string): void => {
    setCorrectAnswer(value);
    handleAnswerChecked(value);
  };
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {answer.map((item, key) => {
        return (
          <TouchableOpacity
            key={key}
            onPress={() => handleCorrect(item)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                height: 25,
                width: 25,
                borderRadius: 20,
                borderWidth: 4,
                borderColor: colors.border,
                marginRight: 10,
                padding: 10,
                backgroundColor:
                  correctAnswer === item ? colors.primary : "white",
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Montserrat-Medium",
                paddingBottom: 5,
                color: colors.text,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioButtonComponent;
