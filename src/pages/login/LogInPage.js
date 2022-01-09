import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import LogInLayout from "./logInLayout/LogInLayout";
import { UserMailContext } from "../../context/userMailProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInPage = () => {
  const navigation = useNavigation()
  const {setEmail} = useContext(UserMailContext)

  const handleNavigateSingIn = () => {
    navigation.navigate("SingInPage")
  }

  const handleLogIn = async ({ email, password }) => {
    try {
      if (email && password) {
        await auth().signInWithEmailAndPassword(email, password)
        setEmail(email)
        AsyncStorage.setItem('@EMAIL', email)
      } else {
        return Alert.alert("olmadı")
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return Alert.alert('User not found!');
      }
      if (error.code === 'auth/invalid-email') {
        return Alert.alert('That email address is invalid!');
      }
      if (password.length < 6) {
        return Alert.alert('Password length must be at least 6');
      }
      else {
        return Alert.alert('Password is wrong');
      }
    }
  }

  return (
    <LogInLayout onSubmit={handleLogIn} navigateSingIn={handleNavigateSingIn} />
  )
}

export default LogInPage