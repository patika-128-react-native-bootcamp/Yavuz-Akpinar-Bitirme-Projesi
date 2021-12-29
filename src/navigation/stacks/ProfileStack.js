import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ActivityHistoryPage from "../../pages/activityHistory/ActivityHistoryPage";
import LeaderboardPage from "../../pages/leaderboard/LeaderboardPage";
import NewActivityPage from "../../pages/newActivity/NewActivityPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import routes from "../routes";

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name={routes.PROFILE} component={ProfilePage}/>
      <Stack.Screen name={routes.ACTIVITYHISTORY} component={ActivityHistoryPage}/>
      <Stack.Screen name={routes.LEADERBOARD} component={LeaderboardPage}/>
      <Stack.Screen name={routes.NEWACTIVITY} component={NewActivityPage}/>
    </Stack.Navigator>
  )
}

export default ProfileStack