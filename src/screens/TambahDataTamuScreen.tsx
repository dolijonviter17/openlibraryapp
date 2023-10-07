import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TEXT_STYLES } from "../assets/fonts";
import { HeaderComponent, InputPenumpangBaru } from "../components";
import {
  GuestProps,
  getGuestCollection,
  updateGuestCollection,
} from "../model/GuestModel";
import { RootStackParams } from "../stack/RootStackScreen";

type Props = NativeStackScreenProps<RootStackParams, "Tambah">;
const { colors } = useTheme();

const TambahDataTamuScreen: React.FC<Props> = ({
  route,
  navigation,
}: Props) => {
  const [dataPassenger, setDataPassenger] = useState<GuestProps>({
    id: 1,
    gender: "",
    name: "",
  });
  const [dataGuest, setDataGuest] = useState<GuestProps[]>([]);

  const fetchGuestCollection = async () => {
    try {
      const reqGuest = await getGuestCollection();
      setDataGuest(reqGuest);
      console.log("reqGuest", reqGuest);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGuestCollection();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const selectGender = (gender: string, key: number) => {
    dataGuest[key].gender = gender;
  };

  const handleInputName = (name: string, key: number) => {
    dataGuest[key].name = name;
  };
  const getPassengerItem = (data: GuestProps[]) => {
    return (
      <>
        {data.length > 0
          ? data.map((item, key) => (
              <InputPenumpangBaru
                data={item}
                selectGender={(gender) => selectGender(gender, key)}
                handleInputName={(name) => handleInputName(name, key)}
                handleDeleteItem={() => handleDeleteItem(data, item)}
              />
            ))
          : null}
      </>
    );
  };

  const handleDeleteItem = useCallback(
    async (arr: GuestProps[], item: GuestProps) => {
      const fill = arr.indexOf(item);
      if (fill > -1) {
        // only splice array when item is found
        arr.splice(fill, 1); // 2nd parameter means remove one item only
      }
      //   return dataGuest;
      setDataGuest([...arr]);
      await updateGuestCollection(arr);
    },
    [dataGuest, getPassengerItem(dataGuest)]
  );

  const handleAddedPassenger = useCallback(
    (data: GuestProps) => {
      setDataGuest([
        ...dataGuest,
        {
          id: dataGuest.length + 1,
          gender: "",
          name: "",
        },
      ]);
    },
    [dataGuest]
  );

  //   console.log(dataGuest);

  const handleAddGuest = async (data: GuestProps[]) => {
    console.log("datadata", data);

    await updateGuestCollection(data);
    Alert.alert("data berhasil disimpan");
    // navigation.goBack();
  };
  return (
    <View style={styles.flex}>
      <HeaderComponent title="Tambah Data Tamu" onPress={handleBack} />
      <ScrollView
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 20,
          }}
        >
          <Text style={[]}>Data Tamu</Text>

          {getPassengerItem(dataGuest)}

          <TouchableOpacity onPress={() => handleAddedPassenger(dataPassenger)}>
            <Text style={styles.textCreateInput}>
              <AntDesign size={15} color="orange" name="plus" />
              Tambah Data Tamu {dataGuest.length}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => handleAddGuest(dataGuest)}>
        <View style={styles.btnSave}>
          <Text style={TEXT_STYLES.text500}>{"Simpan"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TambahDataTamuScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 25,
  },
  btnSave: {
    height: 45,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#2B8FEB",
    alignItems: "center",
    justifyContent: "center",
  },
  textCreateInput: {
    ...TEXT_STYLES.text500,
    color: "orange",
    paddingTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  textTitle: {
    ...TEXT_STYLES.text600,
    color: "#007AFF",
  },
});

// https://parseapi.back4app.com/classes/hotel/oF1yBSSlZH
// X-Parse-Application-Id : 5bKP3JX6zXWqpXMmI6tImTdZxDh59kb6IGVGlHHF
// X-Parse-REST-API-Key : ovP2x3YltGJsu1t9RM6FpDNgU5n2hnQSAhatLxIq

// https://parseapi.back4app.com/classes/hotel/bVonXoSUHK
// X-Parse-Application-Id : Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3
// X-Parse-REST-API-Key : 4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy
