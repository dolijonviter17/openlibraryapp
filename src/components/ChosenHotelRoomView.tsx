import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TEXT_STYLES } from "../assets/fonts";
import { getDateTime } from "../utils/Utilities";

const ChosenHotelRoomView = ({ data }: any) => {
  // console.log("data.images[0].thumbnaildata.images[0].thumbnail", data.images);

  return (
    <View style={styles.container}>
      <Text style={styles.textDetailPesanan}>Detail Pesanan</Text>
      {/* hotel detail */}
      <View style={styles.detailHotelContainer}>
        <Image
          resizeMode="contain"
          style={{ width: 80, height: 80, marginRight: 20 }}
          source={{
            uri: data.images[0].thumbnail,
          }}
        />
        <View>
          <Text style={styles.textHotelName}>{data.hotel_name}</Text>
          <Text style={styles.textDetailHotel}>{data.room_name}</Text>
          <Text
            style={styles.textDetailHotel}
          >{`${data.facilities[0]} - ${data.facilities[1]}  - ${data.facilities[3]}`}</Text>
        </View>
      </View>
      {/* hotel detail */}

      {/* Schedule plan */}

      <View
        style={{
          paddingTop: 15,
        }}
      >
        <View style={styles.scheduleContainer}>
          <Text style={styles.textLabel}>Check In</Text>
          <Text style={styles.textContent}>{getDateTime(data.check_in)}</Text>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.textLabel}>Check In</Text>
          <Text style={styles.textContent}>{getDateTime(data.check_out)}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.textRefund}>
          <FontAwesome5 size={15} color="orange" name="sync-alt" />
          {"   Dapat direfund jika dibatalkan"}
        </Text>
      </TouchableOpacity>
      {/* Schedule plan */}
    </View>
  );
};

export default ChosenHotelRoomView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  textDetailPesanan: {
    ...TEXT_STYLES.text600,
    color: "#333",
    fontSize: 18,
  },

  detailHotelContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 15,
    // minHeight: 150,
  },

  textHotelName: {
    ...TEXT_STYLES.text500,
    color: "#007AFF",
    paddingBottom: 5,
  },
  textDetailHotel: {
    ...TEXT_STYLES.text200,
    color: "#333",
    paddingBottom: 5,
  },

  scheduleContainer: {
    // paddingVertical: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  textLabel: {
    ...TEXT_STYLES.text700,
    color: "#333",
    fontSize: 14,
  },

  textContent: {
    ...TEXT_STYLES.text400,
    fontSize: 14,
  },

  textRefund: {
    ...TEXT_STYLES.text400,

    color: "orange",
    paddingTop: 15,
    textAlign: "right",

    //   textDecorationLine: "underline",
  },
});

// https://parseapi.back4app.com/classes/hotel/oF1yBSSlZH
// X-Parse-Application-Id : 5bKP3JX6zXWqpXMmI6tImTdZxDh59kb6IGVGlHHF
// X-Parse-REST-API-Key : ovP2x3YltGJsu1t9RM6FpDNgU5n2hnQSAhatLxIq

// https://parseapi.back4app.com/classes/hotel/bVonXoSUHK
// X-Parse-Application-Id : Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3
// X-Parse-REST-API-Key : 4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy
