import { StyleSheet } from "react-native";

const styles = {
  default : StyleSheet.create({
    container:{
      backgroundColor:"teal",
      margin:10,
      alignItems:"center",
      padding:5,
      borderRadius:10
    },
    title:{
      fontSize:25
    }
}),
  outline: StyleSheet.create({
    container:{
      backgroundColor:"silver",
      margin:10,
      alignItems:"center",
      padding:5,
      borderRadius:10
    },
    title:{
      fontSize:25,
      color:"teal"
    }
  })
}
export default styles