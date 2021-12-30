import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const LogInPage = () => {
  const [logInData, setLogInData] = useState({email:"", password: ""})
  const navigation = useNavigation()

  const handleMail = ({mail}) => {
    setLogInData({...logInData, email:mail})
  }
  const handlePassword = ({password}) => {
    setLogInData({...logInData, password:password})
  }
  const handleNavigateSingIn = () => {
    navigation.navigate("SingInPage")
  }
  const handleNavigateLogIn = () => {
    navigation.navigate("DrawerStack")
  }

  return(
    <SafeAreaView>
      <Input 
        placeholder="E-mail"
        onChangeText={handleMail}/>
      <Input 
       placeholder="Password"
       onChangeText={handlePassword}/>
       <Button 
        onPress={handleNavigateLogIn}
        title="LogIn"/>
       <Button
        onPress={handleNavigateSingIn} 
        theme="outline"
        title="SingIn"/>
    </SafeAreaView>
  )
}

export default LogInPage