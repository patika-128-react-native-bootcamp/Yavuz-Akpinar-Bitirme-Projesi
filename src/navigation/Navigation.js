import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import ProfilePage from '../pages/profile/ProfilePage';
import NewActivityPage from '../pages/newActivity/NewActivityPage';
import ActivityHistoryPage from '../pages/activityHistory/ActivityHistoryPage';
import LeaderboardPage from '../pages/leaderboard/LeaderboardPage';
import ProfileStack from './ProfileStack';


const Drawer = createDrawerNavigator()

const Navigation = () => {
  return(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='ProfileStack' component={ProfileStack}/>
        <Drawer.Screen name='NewActivity' component={NewActivityPage}/>
        <Drawer.Screen name='ActivityHistory' component={ActivityHistoryPage}/>
        <Drawer.Screen name='Leaderboard' component={LeaderboardPage}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
