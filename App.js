import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

import Player from "./src/components/Player";
import Home from "./src/scenes/Home";
import Categories from "./src/scenes/Categories";
import RecentPlayed from "./src/scenes/RecentPlayed";
import RadioProvider from "./src/context/RadioContext";
import Settings from "./src/scenes/Settings";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="RecentPlayed" component={RecentPlayed} />
      </Stack.Navigator>
    );
  }

  return (
    <RadioProvider>
      <SafeAreaProvider style={styles.container} >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "home") {
                  iconName = focused ? "home" : "home";
                } else if (route.name === "search") {
                  iconName = focused ? "search1" : "search1";
                }

                return <AntDesign name={iconName} size={size} color={color} />;
              },
              tabBarPressColor: "rgba(0,0,0,0)",
              tabBarItemStyle: {
                width: 70,
                alignSelf: "center",
                height: 45,
              },
              tabBarStyle: {
                height: 80,
                justifyContent: "space-between",
                borderTopColor: "#212121",
                backgroundColor: "#212121",
              },
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "#858386",
            })}
          >
            <Tab.Screen name="home" component={HomeStack} />
            <Tab.Screen name="search" component={Categories} />
          </Tab.Navigator>
        </NavigationContainer>
         <Player /> 
      </SafeAreaProvider>
    </RadioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  input: {
    marginTop: 15,
    marginHorizontal: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 100,
    height: 60,
    marginBottom: 25,
    opacity: 5,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
});
