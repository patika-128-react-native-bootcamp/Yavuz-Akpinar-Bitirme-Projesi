import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import LogInPage from "../../pages/login/LogInPage";
import SingInPage from "../../pages/singin/SingInPage";
import DrawerStack from "./DrawerStack";
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator()

const LogInStack = () => {
  const [isSignedIn, setIsSignedIn] = useState(null)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setIsSignedIn)
    return subscriber
  }, [])

  return (
    <Stack.Navigator>
      {
        !!isSignedIn ? (
          <>
            <Stack.Screen options={{headerShown:false}} name='DrawerStack' component={DrawerStack} />

          </>
        ) : (
          <>
            <Stack.Screen name="LogInPage" component={LogInPage} />
            <Stack.Screen name="SingInPage" component={SingInPage} />
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default LogInStack