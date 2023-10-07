import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { RootStackParams } from "../stack/RootStackScreen";
import { useTheme } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TEXT_STYLES } from "../assets/fonts";
import Feather from "react-native-vector-icons/Feather";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface GenderProps {
  onSelect: (selectedItem: any, index: number) => void;
  defaultButtonText?: string;
}

const SelectedGender = ({
  onSelect,
  defaultButtonText = "Mr",
}: GenderProps) => {
  const { colors } = useTheme();
  const Genders: string[] = ["Mr", "Mrs"];

  return (
    <SelectDropdown
      defaultButtonText={defaultButtonText}
      data={Genders}
      buttonStyle={{
        width: 80,
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 40,
        borderWidth: 1,
        borderColor: "#eee",
      }}
      buttonTextStyle={{
        fontSize: 12,
        textAlign: "left",
        fontWeight: "700",
        color: "black",
      }}
      rowTextStyle={{
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
        color: "black",
      }}
      // rowStyle={{alignItems : ''}}
      dropdownStyle={{
        backgroundColor: colors.border,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,

        // height: 50,
      }}
      onSelect={onSelect}
      renderDropdownIcon={(isOpened) => {
        return (
          <FontAwesome
            name={isOpened ? "chevron-up" : "chevron-down"}
            color="black"
            size={18}
          />
        );
      }}
      dropdownIconPosition="right"
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
};

export default SelectedGender;
