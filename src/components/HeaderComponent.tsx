import { useTheme } from "@react-navigation/native";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TEXT_STYLES } from "../assets/fonts";

interface Props {
  onPress?: () => void;
  title: string;
}

const HeaderComponent = ({ title, onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        paddingTop: Platform.OS == "android" ? 10 : 70,
        paddingHorizontal: 15,
        paddingBottom: 20,
        backgroundColor: "#007AFF",
      }}
    >
      <Text
        style={[
          TEXT_STYLES.text600,
          {
            color: "#fff",
            textAlign: "center",
          },
        ]}
      >
        {title}
      </Text>

      <TouchableOpacity
        onPress={onPress}
        style={{
          position: "absolute",
          top: 67,
          left: 15,
        }}
      >
        <AntDesign size={30} color="#fff" name="arrowleft" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
