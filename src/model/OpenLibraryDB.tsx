import SQLite from "react-native-sqlite-storage";

// SQLite.openDatabase({
//     name : 'openlibrary_db',
//     location : 'default'
// }, () => {
//     console.log('database connected');
// },error => console.log('database error', error))
export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: "openlibrary.db", location: "default" });
};

export const db = SQLite.openDatabase(
  {
    name: "openlibrary.db",
    location: "default",
  },
  () => console.log("success"),
  (error) => {
    console.log(error);
  }
);
// " +
//             inputBook.full_url +
//             ", " +
//             inputBook.name +
//             ", " +
//             inputBook.seed_count +
//             ", " +
//             inputBook.url +
//             ", " +
//             inputBook.last_update +
//             "
