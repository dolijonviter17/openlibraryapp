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
import { HeaderComponent } from "../components";
import { db, getDBConnection } from "../model/OpenLibraryDB";
import { RootStackParams } from "../stack/RootStackScreen";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import SQLite from "react-native-sqlite-storage";
import Feather from "react-native-vector-icons/Feather";

type Props = NativeStackScreenProps<RootStackParams, "Books">;

interface BookProp {
  handleDeleteItem?: () => void;
  data: {
    name: string;
    image: string;
  };
  user: string;
  handleEditItem?: () => void;
  handleDetail?: () => void;
}

const BookItemView = ({
  data,
  handleDeleteItem,
  handleEditItem,
  handleDetail,
  user,
}: BookProp) => {
  const img_url = "http://openlibrary.org/";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <TouchableOpacity onPress={handleDetail}>
        <Image
          resizeMode="contain"
          style={{ width: 80, height: 80, marginRight: 20 }}
          source={{
            uri: "https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg",
          }}
        />
      </TouchableOpacity>
      {/* <View
        style={{
          height: 120,
          width: 90,
          backgroundColor: "#333",
          borderRadius: 20,
        }}
      /> */}

      <View>
        <Text>{data.name}</Text>
        {user === "Admin" ? (
          <>
            <TouchableOpacity onPress={handleDeleteItem}>
              <Feather size={30} color="red" name="trash" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditItem}>
              <Feather size={30} color="blue" name="edit" />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
};

const ListBooksScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { user } = route.params;
  console.log(user);

  const checkConnection = async () => {
    await getDBConnection();
  };
  const [listBooks, setListBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const createTableBooks = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS books " +
          "books " +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, full_url TEXT, name TEXT, seed_count INTEGER, url TEXT, last_update DATE);"
      );
    });
  };

  const handleGetBooks = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql("SELECT * FROM books", [], (tx, results) => {
          console.log(results);
          const books: any = [];
          var length = results.rows.length;
          for (var i = 0; i < length; i++) {
            books.push(results.rows.item(i));
          }
          setListBooks(books);
        });
      });
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    createTableBooks();
    handleGetBooks();
    // checkConnection();
  }, [listBooks]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddNewBook = () => {
    console.log("add new book");
  };

  const handleDeleteItem = useCallback(
    async (book: any) => {
      try {
        setLoading(true);
        const db = await getDBConnection();
        await db.transaction((tx) => {
          tx.executeSql(`DELETE FROM books where id = ${book.id}`);
        });
        Alert.alert("book deleted");
        // console.log("results", results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [listBooks]
  );

  const handleEditItem = (data: any) => {
    navigation.push("Edit", {
      book: data,
    });
  };

  // export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  //   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  //   await db.executeSql(deleteQuery);
  // };

  const handleDetail = (data: any) => {
    navigation.push("Detail", {
      book: data,
    });
  };
  return (
    <View style={styles.flex}>
      <HeaderComponent title="List Books" onPress={handleBack} />
      <ScrollView
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View>
          {!loading && listBooks.length > 0
            ? listBooks.map((item, key) => (
                <BookItemView
                  user={user}
                  data={item}
                  handleDeleteItem={() => handleDeleteItem(item)}
                  handleEditItem={() => handleEditItem(item)}
                  handleDetail={() => handleDetail(item)}
                />
              ))
            : null}
        </View>
      </ScrollView>
      {user === "Admin" ? (
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <View style={styles.btnSave}>
            <Text style={TEXT_STYLES.text500}>{"Add New Books"}</Text>
          </View>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={styles.btnSave}>
          <Text style={TEXT_STYLES.text500}>{"Logout"}</Text>
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

export default ListBooksScreen;

// https://parseapi.back4app.com/classes/hotel/oF1yBSSlZH
// X-Parse-Application-Id : 5bKP3JX6zXWqpXMmI6tImTdZxDh59kb6IGVGlHHF
// X-Parse-REST-API-Key : ovP2x3YltGJsu1t9RM6FpDNgU5n2hnQSAhatLxIq

// https://parseapi.back4app.com/classes/hotel/bVonXoSUHK
// X-Parse-Application-Id : Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3
// X-Parse-REST-API-Key : 4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy
