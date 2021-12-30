import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LogInPage from "../../pages/login/LogInPage";
import SingInPage from "../../pages/singin/SingInPage";
import DrawerStack from "./DrawerStack";

const Stack = createNativeStackNavigator()

const LogInStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="LogInPage" component={LogInPage}/>
      <Stack.Screen name="SingInPage" component={SingInPage}/>
      <Stack.Screen name='DrawerStack' component={DrawerStack} />
    </Stack.Navigator>
  )
}

export default LogInStack