import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
  outerContainer:{
    flex:1,
    backgroundColor:"black"
  },
  mapView:{
    flex:0.5
  },
  container:{
    flex:1
  },
  generalInfoView:{
    padding:10,
    backgroundColor:"powderblue",
    margin:10,
    borderRadius:15
  },
  buttonView:{
     flexDirection: "row", 
     justifyContent: "space-around" 
  },
  text:{
    fontSize:20,
    fontWeight:"700"
  },
  weatherView:{
    padding:10,
    backgroundColor:"sandybrown",
    margin:10,
    borderRadius:15
  },
  distanceView:{
    flexDirection:"row",
    justifyContent:"space-between",
    borderBottomWidth:1,
    padding:10,
    paddingLeft:30,
    paddingRight:30,
    alignItems:"center"
  }
})

export default styles