import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ResolveAuthScreen from "../screens/ResolveAuthScreen";
import AccountScreen from "../screens/AccountScreen";
import SigninScreen from "../screens/SigninScreen";
import SignUpScreen from "../screens/SignupScreen";
import TrackCreateScreen from "../screens/TrackCreateScreen";
import TrackDetailScreen from "../screens/TrackDetailScreen";
import TrackListScreen from "../screens/TrackListScreen";
import { Ionicons } from "@expo/vector-icons";

import { Context as AuthContext } from "../context/AuthContext";
import { Suspense, useContext } from "react";

const loginFlowStack = createNativeStackNavigator();
const trackListStack = createNativeStackNavigator();
const mainFlowBottomTabNavigator = createBottomTabNavigator();

const TrackListStackNavigator = () => {
  return (
    <trackListStack.Navigator>
      <trackListStack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{
          title: "Tracks",
        }}
      />
      <trackListStack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </trackListStack.Navigator>
  );
};

const RootNavigator = () => {
  const { state } = useContext(AuthContext);
  if (state.isLoading) {
    return <ResolveAuthScreen />;
  }

  if (!state.token) {
    return (
      <loginFlowStack.Navigator>
        <loginFlowStack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <loginFlowStack.Screen
          name="Signin"
          component={SigninScreen}
          options={{
            headerShown: false,
          }}
        />
      </loginFlowStack.Navigator>
    );
  }

  return (
    <mainFlowBottomTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Tracks":
              iconName = focused ? "map" : "map-outline";
              break;
            case "Add Track":
              iconName = focused ? "add" : "add-outline";
              break;
            case "Account":
              iconName = focused ? "settings" : "settings-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <mainFlowBottomTabNavigator.Screen
        name="Tracks"
        component={TrackListStackNavigator}
        options={{ headerShown: false }}
      />
      <mainFlowBottomTabNavigator.Screen
        name="Add Track"
        component={TrackCreateScreen}
        options={{ headerShown: false }}
      />
      <mainFlowBottomTabNavigator.Screen
        name="Account"
        component={AccountScreen}
      />
    </mainFlowBottomTabNavigator.Navigator>
  );
};

export default RootNavigator;
