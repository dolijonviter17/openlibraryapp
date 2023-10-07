import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TEXT_STYLES } from "../assets/fonts";
import { HeaderComponent } from "../components";
import { db, getDBConnection } from "../model/OpenLibraryDB";
import { RootStackParams } from "../stack/RootStackScreen";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import SQLite from "react-native-sqlite-storage";
type Props = NativeStackScreenProps<RootStackParams, "Edit">;

interface BookProp {
  name: string;
  image: string;
}

const BookItemView = ({ data }: any) => {
  const img_url = "http://openlibrary.org/";
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          height: 120,
          width: 90,
          backgroundColor: "#333",
          borderRadius: 20,
        }}
      />
      <Text>{data.name}</Text>
    </View>
  );
};

const EditBookScreen: React.FC<Props> = ({ navigation, route }) => {
  const { book } = route.params;
  const { colors } = useTheme();

  const checkConnection = async () => {
    await getDBConnection();
  };

  const [listBooks, setListBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputBook, setInputBook] = useState({
    ...book,
    seed_count: book.seed_count.toString(),
  });

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

          console.log("books", books);
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
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  //   console.log(dataGuest);

  const createBooksDB = async (db: SQLiteDatabase) => {
    let query =
      "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, full_url VARCHAR, name VARCHAR, seed_count INTEGER, url VARCHAR, last_update DATE)";
    let databook = [
      {
        id: 1,
        url: "/people/digital_s/lists/OL227024L",
        full_url: "/people/digital_s/lists/OL227024L/Test_List_2",
        name: "Test List 2",
        seed_count: 2,
        last_update: "2022-08-11T05:04:45.298586",
      },
      {
        id: 2,
        url: "/people/digital_s/lists/OL227023L",
        full_url: "/people/digital_s/lists/OL227023L/Test_List_1",
        name: "Test List 1",
        seed_count: 2,
        last_update: "2022-11-15T01:48:06.250994",
      },
    ];

    await db.executeSql(
      query,
      [],
      (result) => {
        console.log("Table created successfully");
        // console.log(result.rows.item);
      },
      (error) => {
        console.log("Create table error", error);
      }
    );
  };

  const insertBook = async () => {
    try {
      let sql = "INSERT INTO books (email, name) VALUES (?, ?)";
      const db = await getDBConnection();
      await db.transaction((tx) => {
        tx.executeSql("SELECT * FROM books", [], (tx, results) => {
          console.log("Query completed");
          var len = results.rows.length;
          console.log(len);
        });
      });
      // console.log("results", results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBook = async (book: any) => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "UPDATE books SET name = ?, seed_count = ?, last_update = ? where id = ?",
          [book.name, book.seed_count, Date(), book.id]
        );
      });
      Alert.alert("update book added");
    } catch (error) {
      console.log("error");
    }
  };

  const saveTable = async () => {
    try {
      const db = await getDBConnection();
      createBooksDB(db);
      Alert.alert("sussecc");
    } catch (error) {
      Alert.alert("failed");
    }
  };

  //  const createTable = async (db: SQLiteDatabase) => {
  //   // create table if not exists
  //   const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
  //         value TEXT NOT NULL
  //     );`;

  //   await db.executeSql(query);
  // };

  const handleAddNewBook = () => {
    console.log("add new book");
  };
  return (
    <View style={styles.flex}>
      <HeaderComponent title="Edit Book" onPress={handleBack} />
      <ScrollView
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View>
          <View
            style={{
              height: 45,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#eee",
              width: "90%",
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            <TextInput
              placeholder="Input Book"
              value={inputBook.name}
              onChangeText={(e) => {
                setInputBook({
                  ...inputBook,
                  name: e,
                });
              }}
              style={[
                TEXT_STYLES.text500,
                { flex: 1, color: "#818896", paddingLeft: 20 },
              ]}
            />
          </View>
          <View
            style={{
              height: 45,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#eee",
              width: "90%",
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            <TextInput
              placeholder="Input Seed"
              value={inputBook.seed_count}
              onChangeText={(e) => {
                setInputBook({
                  ...inputBook,
                  seed_count: e,
                });
              }}
              style={[
                TEXT_STYLES.text500,
                { flex: 1, color: "#818896", paddingLeft: 20 },
              ]}
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => handleUpdateBook(inputBook)}>
        <View style={styles.btnSave}>
          <Text style={TEXT_STYLES.text500}>{"Update Books"}</Text>
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

export default EditBookScreen;
