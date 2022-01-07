import { Dimensions, StyleSheet } from "react-native";

const styles = {
  default : StyleSheet.create({
    container:{
      backgroundColor:"teal",
      margin:10,
      marginTop:20,
      alignItems:"center",
      padding:5,
      borderRadius:10,
      flexDirection:"row"
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
      borderRadius:10,
      flexDirection:"row"
    },
    title:{
      fontSize:25,
      color:"teal"
    }
  }),
  startButton: StyleSheet.create({
    container:{
      backgroundColor:"darkorange",
      margin:10,
      alignItems:"center",
      paddingBottom:10,
      paddingTop:10,
      paddingRight:30,
      paddingLeft:30,
      borderRadius:10,
      flexDirection:"row"
    },
    title:{
      fontSize:25,
      color:"teal"
    }
  }),
  profilePageButton:StyleSheet.create({
    container:{
      backgroundColor:"darkorange",
      margin:10,
      alignItems:"center",
      paddingBottom:20,
      borderRadius:10,
      height: Dimensions.get("screen").height/10,
      width: Dimensions.get("screen").width/4,
      justifyContent:"center"
    },
    title:{
      fontSize:15,
      color:"teal"
    }
  }),
}
export default styles