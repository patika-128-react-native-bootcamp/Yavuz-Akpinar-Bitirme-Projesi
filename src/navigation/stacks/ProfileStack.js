import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ActivityHistoryPage from "../../pages/activityHistory/ActivityHistoryPage";
import LeaderboardPage from "../../pages/leaderboard/LeaderboardPage";
import NewActivityPage from "../../pages/newActivity/NewActivityPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import routes from "../routes";
import Icon from "react-native-vector-icons/MaterialIcons"

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
       options={{ 
        drawerIcon: ({ color, size }) => (
        <Icon name="account-circle" size={size} color={color} />
        ) 
      }}
        name={routes.PROFILE} 
        component={ProfilePage}/>
      <Stack.Screen name={routes.ACTIVITYHISTORY} component={ActivityHistoryPage}/>
      <Stack.Screen name={routes.LEADERBOARD} component={LeaderboardPage}/>
      <Stack.Screen options={{headerShown:false}} name={routes.NEWACTIVITY} component={NewActivityPage}/>
    </Stack.Navigator>
  )
}

export default ProfileStack