import React from "react";
import { Text, TextInput, View } from "react-native";

import styles from "./InputStyles";

const Input = ({placeholder,onChangeText,value, title, textEntry}) => {
  return(
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.container}
        placeholder={placeholder} 
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={textEntry}/>
    </View>
  )
}

export default Input