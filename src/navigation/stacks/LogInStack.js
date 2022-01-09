import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';

import LogInPage from "../../pages/login/LogInPage";
import SingInPage from "../../pages/singin/SingInPage";
import DrawerStack from "./DrawerStack";
import routes from "../routes";

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
            <Stack.Screen options={{ headerShown: false }} name={routes.DRAWERSTACK} component={DrawerStack} />

          </>
        ) : (
          <>
            <Stack.Screen name={routes.LOGIN} component={LogInPage} />
            <Stack.Screen name={routes.SINGIN} component={SingInPage} />
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default LogInStack