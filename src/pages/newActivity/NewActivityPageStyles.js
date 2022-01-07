import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
  outerContainer:{
    flex:1,
  },
  mapView:{
    flex:3
  },
  container:{
    flex:3,
    borderTopLeftRadius:30,
    backgroundColor:"white",
    borderTopRightRadius:30,
  },
  generalInfoView:{
    padding:10,
    flex:1,
    flexDirection:"row",
    backgroundColor:"black"
  },
  buttonView:{
     flexDirection: "row", 
     justifyContent: "space-around" ,
     borderBottomWidth:1,
     flex:1,
     backgroundColor:"black"
  },
  text:{
    fontSize:20,
    fontWeight:"700",
    color:"white"
  },
  weatherView:{
    padding:20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    backgroundColor: "#e26a00",
               

  },
  distanceView:{
    justifyContent:"space-between",
    borderBottomWidth:1,
    padding:10,
    paddingLeft:30,
    paddingRight:30,
    alignItems:"center"
  },
  innerContainer:{
    flexDirection:"row"
  }
})

export default styles