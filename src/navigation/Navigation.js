import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LogInStack from './stacks/LogInStack';
import UserMailProvider from '../context/userMailProvider';


const Navigation = () => {
  return (
    <UserMailProvider>
      <NavigationContainer>
        <LogInStack></LogInStack>
      </NavigationContainer>
    </UserMailProvider>
  )
}

export default Navigation
