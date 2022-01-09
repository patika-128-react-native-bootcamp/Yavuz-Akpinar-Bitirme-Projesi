import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outercontainer:{
    flex:1,
  },
  topContainer:{
    flex:1,
    backgroundColor:"orange",
    borderBottomLeftRadius:100,
    justifyContent:"center",
    alignItems:"center"
  },
  bottomContainer:{
    flex:2,
    justifyContent:"flex-end"
  }
})

export default styles