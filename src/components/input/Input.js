import React from "react";
import { TextInput } from "react-native";
import styles from "./InputStyles";

const Input = ({placeholder,onChangeText,value}) => {
  return(
    <TextInput
      style={styles.container}
      placeholder={placeholder} 
      onChangeText={onChangeText}
      value={value}/>
  )
}

export default Input