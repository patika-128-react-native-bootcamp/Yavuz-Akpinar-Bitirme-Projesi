import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons"

import ActivityHistoryPage from "../../pages/activityHistory/ActivityHistoryPage";
import LeaderboardPage from "../../pages/leaderboard/LeaderboardPage";
import NewActivityPage from "../../pages/newActivity/NewActivityPage";
import ProfileStack from "./ProfileStack";
import LocationProvider from "../../context/locationProvider";
import routes from "../routes";


const Drawer = createDrawerNavigator()

const DrawerStack = () => {
  return (
    <LocationProvider>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          options={{
            drawerActiveTintColor: "orange",
            headerPressColor: "orange",
            drawerIcon: ({ color, size }) => (
              <Icon name="account-circle" size={size} color={color} />
            )
          }}
          name={routes.PROFILESTACK}
          component={ProfileStack} />
        <Drawer.Screen
          options={{
            drawerActiveTintColor: "orange",
            headerPressColor: "orange",
            drawerIcon: ({ color, size }) => (
              <Icon name="add-circle-outline" size={size} color={color} />
            )
          }}
          name={routes.NEWACTIVITY}
          component={NewActivityPage} />
        <Drawer.Screen
          options={{
            drawerActiveTintColor: "orange",
            headerPressColor: "orange",
            drawerIcon: ({ color, size }) => (
              <Icon name="history" size={size} color={color} />
            )
          }}
          name={routes.ACTIVITYHISTORY}
          component={ActivityHistoryPage} />
        <Drawer.Screen
          options={{
            drawerActiveTintColor: "orange",
            headerPressColor: "orange",
            drawerIcon: ({ color, size }) => (
              <Icon name="leaderboard" size={size} color={color} />
            )
          }}
          name={routes.LEADERBOARD}
          component={LeaderboardPage} />
      </Drawer.Navigator>
    </LocationProvider>
  )
}

export default DrawerStack