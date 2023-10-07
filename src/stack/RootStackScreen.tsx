/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  PaymentDetailScreen,
  TambahDataTamuScreen,
  ListBooksScreen,
  CreateNewBookScreen,
  EditBookScreen,
  LoginScreen,
  DetailBookScreen,
} from "../screens";

export type RootStackParams = {
  // QTI
  Books: { user: string };
  Tambah: undefined;
  Detail: { book: any };
  Create: undefined;
  Edit: { book: any };
  Login: undefined;

  // books
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Books" component={ListBooksScreen} />
      <RootStack.Screen name="Detail" component={DetailBookScreen} />
      <RootStack.Screen name="Create" component={CreateNewBookScreen} />
      <RootStack.Screen name="Edit" component={EditBookScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
