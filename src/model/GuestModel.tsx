import AsyncStorage from "@react-native-async-storage/async-storage";

export interface GuestProps {
  id: number;
  gender: string;
  name: string;
}
const checkGuestStorage = async () => {
  const logindata: string | null = await AsyncStorage.getItem("@guest");
  return logindata;
};

const getGuestCollection = async () => {
  const check = await checkGuestStorage();
  if (check !== null) {
    const guest = JSON.parse(check as string);
    return guest;
  } else throw new Error("no data yet");
};

const updateGuestCollection = async (data: GuestProps[]) => {
  var jsonPars = JSON.stringify(data);
  await AsyncStorage.setItem("@guest", jsonPars);
};

export { checkGuestStorage, getGuestCollection, updateGuestCollection };
