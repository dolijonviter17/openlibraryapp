import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TEXT_STYLES } from "../assets/fonts";
import {
  ChosenHotelDetailView,
  ChosenHotelRoomView,
  HeaderComponent,
} from "../components";
import { RootStackParams } from "../stack/RootStackScreen";

type Props = NativeStackScreenProps<RootStackParams, "Detail">;

const PaymentDetailScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);

  const [chosenHotelRoom, setChosenHotelRoom] = useState({});
  //   const [chosenHotelDetail, setChosenHotelDetail] = useState({});

  const getDataHotel = async () => {
    try {
      await axios
        .get(
          "https://parseapi.back4app.com/classes/hotel/bVonXoSUHK",

          {
            headers: {
              "X-Parse-Application-Id":
                "Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3",
              "X-Parse-REST-API-Key":
                "4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy",
            },
          }
        )
        .then((res) => {
          const {
            chosen_hotel_room,
            chosen_hotel_detail,
            chosen_hotel_params,
            chosen_hotel_prices,
          } = res.data.chosen_hotel.data.get_chosen_hotel;
          console.log("chosen_hotel_room", chosen_hotel_room);

          setChosenHotelRoom({
            ...chosen_hotel_room,
            ...chosen_hotel_detail,
            ...chosen_hotel_params,
            ...chosen_hotel_prices,
          });
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataHotel();
  }, []);

  //   console.log(countOfPassenger);

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.background, paddingBottom: 25 }}
    >
      <HeaderComponent title="Payment Details" />
      <View style={styles.flowContainer}>
        <View style={styles.stepContainer}>
          <Text>1</Text>
        </View>
        <Text style={styles.textDetail}>{"   Detail Pesanan"}</Text>
      </View>
      <View style={styles.lineStyle} />
      <ScrollView style={styles.scrollView}>
        {!loading && (
          <>
            <ChosenHotelRoomView data={chosenHotelRoom} />
            <View
              style={{
                height: 2,
                marginVertical: 20,
                backgroundColor: "#eee",
              }}
            />

            <ChosenHotelDetailView data={chosenHotelRoom} />
            <TouchableOpacity onPress={() => navigation.navigate("Tambah")}>
              <Text style={styles.textBtn}>Ubah data tamu</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PaymentDetailScreen;

const styles = StyleSheet.create({
  textBtn: {
    ...TEXT_STYLES.text200,
    marginRight: 20,
    color: "#2B8FEB",
    textAlign: "right",
    textDecorationLine: "underline",
  },
  flowContainer: {
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  stepContainer: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#2B8FEB",
  },

  textDetail: {
    ...TEXT_STYLES.text600,
    color: "#333",
    fontSize: 13,
  },
  lineStyle: {
    height: 2,
    backgroundColor: "#eee",
  },
  scrollView: {
    paddingHorizontal: 10,
  },
});
// https://parseapi.back4app.com/classes/hotel/oF1yBSSlZH
// X-Parse-Application-Id : 5bKP3JX6zXWqpXMmI6tImTdZxDh59kb6IGVGlHHF
// X-Parse-REST-API-Key : ovP2x3YltGJsu1t9RM6FpDNgU5n2hnQSAhatLxIq

// https://parseapi.back4app.com/classes/hotel/bVonXoSUHK
// X-Parse-Application-Id : Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3
// X-Parse-REST-API-Key : 4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy
