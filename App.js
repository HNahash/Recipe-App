import "react-native-gesture-handler";
import React from "react";

import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/CustomNavigation";
import "react-native-gesture-handler";

function App() {
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />
      </SafeAreaView>

      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
