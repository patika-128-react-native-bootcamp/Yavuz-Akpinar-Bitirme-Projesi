import React from "react"
import { TouchableOpacity, Text } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from "./Buttonstyle"

const Button = ({ title, onPress, theme = "default", disabled, iconColor, iconName, iconSize }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles[theme].container}
      onPress={onPress}>
      <Text style={styles[theme].title}>{title}</Text>
      <Icon name={iconName} size={iconSize} color={iconColor}></Icon>
    </TouchableOpacity>
  )
}

export default Button