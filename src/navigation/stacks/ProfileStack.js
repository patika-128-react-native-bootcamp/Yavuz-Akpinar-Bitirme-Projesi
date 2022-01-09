import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ActivityHistoryPage from "../../pages/activityHistory/ActivityHistoryPage";
import LeaderboardPage from "../../pages/leaderboard/LeaderboardPage";
import NewActivityPage from "../../pages/newActivity/NewActivityPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import routes from "../routes";
import DetailPage from "../../pages/detailPage/DetailPage";

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfilePage} />
      <Stack.Screen
        name={routes.ACTIVITYHISTORY}
        component={ActivityHistoryPage} />
      <Stack.Screen
        name={routes.LEADERBOARD}
        component={LeaderboardPage} />
      <Stack.Screen
        name={routes.NEWACTIVITY}
        component={NewActivityPage} />
      <Stack.Screen
        name={routes.DETAILPAGE}
        component={DetailPage} />
    </Stack.Navigator>
  )
}

export default ProfileStack