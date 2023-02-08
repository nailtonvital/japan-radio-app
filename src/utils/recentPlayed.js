import AsyncStorage from "@react-native-async-storage/async-storage";

const getRadios = async () => {
  try {
    const radios = await AsyncStorage.getItem("radios");
    
    return JSON.parse(radios);
  } catch (error) {
    console.log(error);
  }
};

const removeRadios = async () => {
  try {
    await AsyncStorage.removeItem("radios");
  } catch (error) {
    console.log(error);
  }
};

const setRecentPlayed = async (radioName, stationTitle, stationImage, stationUrl) => {
  try {
    let radio = {
      radio: radioName,
      name: stationTitle,
      img: stationImage,
      url: stationUrl
    };
    AsyncStorage.getItem("radios").then((radios) => {
      const c = radios ? JSON.parse(radios) : [];
      c.push(radio);
      AsyncStorage.setItem("radios", JSON.stringify(c));
    });
  } catch (e) {
    console.log(e);
  }
};

export {setRecentPlayed, getRadios, removeRadios}