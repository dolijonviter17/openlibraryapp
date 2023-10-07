import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { TEXT_STYLES } from "../assets/fonts";
import { SelectedGender } from "../components";
import { GuestProps } from "../model/GuestModel";

interface InputProps {
  handleDeleteItem?: () => void;
  selectGender: (gender: string) => void;
  handleInputName: (name: string) => void;
  data: GuestProps;
}

const InputPenumpangBaru = ({
  handleDeleteItem,
  selectGender,
  handleInputName,
  data,
}: InputProps) => {
  const { colors } = useTheme();
  const [name, setName] = useState(data.name);

  const onSelect = (gender: string) => {
    selectGender(gender);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <SelectedGender defaultButtonText={data.gender} onSelect={onSelect} />
      <View
        style={{
          height: 45,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#eee",
          width: "65%",
        }}
      >
        <TextInput
          placeholder="Input Name"
          value={name}
          onChangeText={(e) => {
            setName(e);
            handleInputName(e);
          }}
          style={[
            TEXT_STYLES.text500,
            { flex: 1, color: "#818896", paddingLeft: 20 },
          ]}
        />
      </View>

      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather size={30} color="red" name="trash" />
      </TouchableOpacity>
    </View>
  );
};

export default InputPenumpangBaru;
