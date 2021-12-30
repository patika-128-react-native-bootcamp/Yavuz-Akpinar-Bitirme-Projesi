import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import ProfilePage from '../pages/profile/ProfilePage';
import NewActivityPage from '../pages/newActivity/NewActivityPage';
import ActivityHistoryPage from '../pages/activityHistory/ActivityHistoryPage';
import LeaderboardPage from '../pages/leaderboard/LeaderboardPage';
import ProfileStack from './stacks/ProfileStack';
import LogInStack from './stacks/LogInStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Navigation = () => {
  return(
    <NavigationContainer>
      <LogInStack></LogInStack>
    </NavigationContainer>
  )
}

export default Navigation
