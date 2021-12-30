import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import SingInLayout from "./singInLayout/SingInLayout";

const SingInPage = () => {
  const navigation = useNavigation()

  const handleNavigateGoBack = () => {
    navigation.goBack()
  }
  const handleSingIn = ({ email, password, passwordagain }) => {
    if (email && password) {
      if (password !== passwordagain) {
        Alert.alert("Paswords are not same")
        return;
      }
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('User account created, now you can log in')
          handleNavigateGoBack()
        }).catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          if (password.length < 6) {
            Alert.alert('Password length must be at least 6');
          }
        })
    } else {
      Alert.alert('Please write your info')
    }
  }

  return (
    <SingInLayout onSubmit={handleSingIn} navigateGoBack={handleNavigateGoBack} />
  )
}

export default SingInPage