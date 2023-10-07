import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TEXT_STYLES } from "../assets/fonts";
import { RadioButtonComponent } from "../components";
import { getGuestCollection } from "../model/GuestModel";

interface PassengerProps {
  id: number;
  gender: string;
  name: string;
}

const ChosenHotelDetailView = ({ data }: any) => {
  const DATA_PESAN: string[] = [
    "Saya memesan untuk sendiri",
    "Saya memesan untuk orang lain",
  ];

  const handleAnswerChecked = (data: string) => {
    console.log(data);
  };

  const [dataGuest, setDataGuest] = useState<PassengerProps[]>([]);

  const fetchGuestCollection = async () => {
    try {
      const reqGuest = await getGuestCollection();
      setDataGuest(reqGuest);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getNamaDepan = (gender: string) => {
    return gender === "Mr" ? "Tn. " : "Ny. ";
  };
  useEffect(() => {
    fetchGuestCollection();
  }, [dataGuest]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Detail Pesanan</Text>

      <View style={styles.containerDetailKamar}>
        <View>
          <Text style={styles.text500}>Jonviter Simbolon</Text>
          <Text style={styles.text200}>jonviter@gmail.com</Text>
          <Text style={styles.text200}>+62 8979971180</Text>
        </View>
        <TouchableOpacity style={styles.btnUbah}>
          <Text style={styles.textBtnUbah}>Ubah</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <RadioButtonComponent
          answer={DATA_PESAN}
          handleAnswerChecked={handleAnswerChecked}
        />
      </View>
      {/* Data Tamu */}
      <View
        style={{
          paddingTop: 20,
        }}
      >
        <Text style={styles.textDetailPesanan}>Data Tamu</Text>
        {dataGuest.length > 0
          ? dataGuest.map((item, key) => {
              return (
                <TouchableOpacity style={styles.tamuContainer}>
                  <MaterialIcons
                    style={{ paddingRight: 10 }}
                    size={35}
                    name={"person"}
                  />
                  <Text style={styles.textTamu}>{`${getNamaDepan(
                    item.gender
                  )}   ${item.name}`}</Text>
                </TouchableOpacity>
              );
            })
          : null}
      </View>

      {/* Data Tamu */}
    </View>
  );
};

export default ChosenHotelDetailView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  textTitle: {
    ...TEXT_STYLES.text600,
    color: "#333",
    fontSize: 18,
  },
  textTamu: {
    ...TEXT_STYLES.text700,

    color: "#333",
    fontSize: 14,
  },
  tamuContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 15,
    marginBottom: 10,
  },
  textDetailPesanan: {
    ...TEXT_STYLES.text600,
    color: "#333",
    fontSize: 18,
    paddingBottom: 15,
  },

  btnUbah: {
    position: "absolute",
    right: 15,
  },

  textBtnUbah: {
    ...TEXT_STYLES.text200,
    color: "#2B8FEB",
    textDecorationLine: "underline",
  },
  text200: {
    ...TEXT_STYLES.text200,
    color: "#333",
    paddingBottom: 5,
  },
  text500: {
    ...TEXT_STYLES.text500,
    color: "#333",
    paddingBottom: 5,
  },
  containerDetailKamar: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 15,
  },
});
