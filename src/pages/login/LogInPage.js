import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert} from "react-native";
import auth from '@react-native-firebase/auth';
import LogInLayout from "./logInLayout/LogInLayout";

const LogInPage = () => {

  const navigation = useNavigation()

  const handleNavigateSingIn = () => {
    navigation.navigate("SingInPage")
  }
  const handleNavigateDrawer = () => {
    navigation.navigate("DrawerStack")
  }
  const handleLogIn = ({email, password}) => {
    try {
      if(email && password) {
        auth().signInWithEmailAndPassword(email, password)
        Alert.alert("Giriş yaptınız")
      }else {
        Alert.alert("olmadı")
      } 
    } catch (error) {
      console.log("alert")
    }
    console.log(data)
  }

  return (
    <LogInLayout onSubmit={handleLogIn} navigateSingIn={handleNavigateSingIn}/>
  )
}

export default LogInPage