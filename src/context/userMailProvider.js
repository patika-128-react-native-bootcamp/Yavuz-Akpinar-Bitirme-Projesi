import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const UserMailContext = createContext()

const UserMailProvider = ({children}) => {
  const [email, setEmail] = useState("")

  const getUserEmail = async () => {
    try {
      const response = await AsyncStorage.getItem('@EMAIL')
      return response && setEmail(response)
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  useEffect(() => {
    getUserEmail()
  }, [])

  return(
    <UserMailContext.Provider value={{email, setEmail}}>
      {children}
    </UserMailContext.Provider>
  )

}

export default UserMailProvider