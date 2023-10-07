import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TEXT_STYLES } from "../assets/fonts";
import { HeaderComponent, RadioButtonComponent } from "../components";
import { db, getDBConnection } from "../model/OpenLibraryDB";
import { RootStackParams } from "../stack/RootStackScreen";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import SQLite from "react-native-sqlite-storage";
import Feather from "react-native-vector-icons/Feather";

type Props = NativeStackScreenProps<RootStackParams, "Login">;

interface BookProp {
  handleDeleteItem?: () => void;
  data: {
    name: string;
    image: string;
  };
  handleEditItem?: () => void;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();

  const USER_LEVEL: string[] = ["Admin", "Non Admin"];
  const [listBooks, setListBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("Admin");

  const createTableUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS userlevel " +
          "userlevel " +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT);"
      );
    });
  };

  const handleGetUsers = (user: string) => {
    navigation.navigate("Books", {
      user: user,
    });

    // console.log("gg");
  };
  useEffect(() => {
    createTableUser();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddNewBook = () => {
    console.log("add new book");
  };

  const handleInsertNewUsers = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql("INSERT INTO users (username) VALUES (?)", [
          "Non Admin",
        ]);
      });
      Alert.alert("new user");
    } catch (error) {
      console.log("error");
    }
  };

  const handleLoginAs = () => {
    navigation.navigate("Create");
  };
  const handleUserLevel = (user: string) => {
    console.log(user);
    setUser(user);
  };
  return (
    <View style={styles.flex}>
      <HeaderComponent title="Login As" onPress={handleBack} />
      <ScrollView
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View>
          <RadioButtonComponent
            answer={USER_LEVEL}
            handleAnswerChecked={handleUserLevel}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => handleGetUsers(user)}>
        <View style={styles.btnSave}>
          <Text style={TEXT_STYLES.text500}>{"Login"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#fff",
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

export default LoginScreen;
