import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outerContainer:{
    flex:3,
    backgroundColor:"black"
  },
  buttonView:{
    flexDirection:"row",
    flex:2,
    paddingLeft:20,
    borderBottomWidth:1,
    borderRadius:10
  },
  bottomContainer:{
    flex:2,
    backgroundColor:"white",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  topContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    height: Dimensions.get("screen").height /5,
    width: Dimensions.get("screen").width /2.5,
    borderRadius: 90,
    backgroundColor:"orange"
  },
  infoView:{
    flex:5
  },
  buttonInnerView:{
    justifyContent:"center",
    alignItems:"center"
  },
  infoInnerView:{
    borderBottomWidth:1,
    padding:10,
    borderRadius:10
  },
  title:{
    fontSize:25,
    textAlign:"center",
    fontStyle:"italic"
  },
  info:{
    fontSize:25,
    textAlign:"center",
    paddingTop:5,
    fontWeight:"900"
  }
})

export default styles