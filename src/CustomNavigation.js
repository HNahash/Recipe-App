import React from "react";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Recipes from "./Recipes";
import NestedScreen from "./NestedScreen";
import Favorite from "./Favorite";
import Profile from "./Profile";
import Login from "./Login";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native";
import { auth } from "../firebase";
import Register from "./Register";

const Tab = createBottomTabNavigator();
const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "RecipesStack") {
            iconName = "home";
            size = focused ? 25 : 20;
            color = focused ? "#006" : "#055";
          } else if (route.name === "FavoriteStack") {
            iconName = "bookmark";
            size = focused ? 25 : 20;
            color = focused ? "#006" : "#055";
          } else if (route.name === "ProfileStack") {
            iconName = "user";
            size = focused ? 25 : 20;
            color = focused ? "#006" : "#055";
          }
          return <FontAwsome5 name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name="RecipesStack"
        component={FirstScreenNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FavoriteStack"
        component={SecondScreenNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ThirdScreenNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = createStackNavigator();

// from Login/Registration to Recpies (home screen) to Nested Screen (Recipe detail)
const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{
          headerLeft: null,
        }}
      />
      <MainStack.Screen
        name="Register"
        component={Register}
        options={{
          headerLeft: null,
        }}
      />
      <MainStack.Screen
        name="Home"
        component={BottomTabsNavigator}
        options={{
          headerLeft: null,
        }}
      />
    </MainStack.Navigator>
  );
};
export { MainNavigator };

const FirstStackStack = createStackNavigator();
// from Favorite to Nested Screen (Recipe detail)
const FirstScreenNavigator = () => {
  const navigation = useNavigation();

  //* Sign Out Method
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <FirstStackStack.Navigator>
      <FirstStackStack.Screen
        name="Recipes"
        component={Recipes}
        options={{
          headerLeft: null,
          headerRight: () => (
            <Button
              onPress={handleSignOut}
              color="#0000ff"
              title={"Sign Out"}
            ></Button>
          ),
        }}
      />
      <FirstStackStack.Screen name="NestedScreen" component={NestedScreen} />
    </FirstStackStack.Navigator>
  );
};
export { FirstScreenNavigator };

const SecondScreenStack = createStackNavigator();
// from Favorite to Nested Screen (Recipe detail)
const SecondScreenNavigator = () => {
  return (
    <SecondScreenStack.Navigator>
      <SecondScreenStack.Screen name="Favorite" component={Favorite} />
      <SecondScreenStack.Screen name="NestedScreen" component={NestedScreen} />
    </SecondScreenStack.Navigator>
  );
};
export { SecondScreenNavigator };

const ThirdScreenStack = createStackNavigator();
// From profile to data
const ThirdScreenNavigator = () => {
  return (
    <ThirdScreenStack.Navigator>
      <ThirdScreenStack.Screen name="Profile" component={Profile} />
    </ThirdScreenStack.Navigator>
  );
};
export { ThirdScreenNavigator };
