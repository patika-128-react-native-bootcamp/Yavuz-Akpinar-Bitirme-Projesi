import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import ActivityHistoryPage from "../../pages/activityHistory/ActivityHistoryPage";
import LeaderboardPage from "../../pages/leaderboard/LeaderboardPage";
import NewActivityPage from "../../pages/newActivity/NewActivityPage";
import ProfileStack from "./ProfileStack";


const Drawer = createDrawerNavigator()

const DrawerStack = () => {
  return(
      <Drawer.Navigator screenOptions={{headerShown:false}}>
        <Drawer.Screen name='Profile Page' component={ProfileStack}/>
        <Drawer.Screen name='New Activity' component={NewActivityPage}/>
        <Drawer.Screen name='Activity History' component={ActivityHistoryPage}/>
        <Drawer.Screen name='Leaderboard' component={LeaderboardPage}/>
      </Drawer.Navigator>
  )
}

export default DrawerStack