import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "orange"
  },
  mapView: {
    flex: 3
  },
  container: {
    flex: 3,
    backgroundColor: "black",
  },
  generalInfoView: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
    borderBottomLeftRadius: 100
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    flex: 0.75,
    backgroundColor: "black"
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  weatherView: {
    padding: 20,
    borderTopRightRadius: 100,
    backgroundColor: "orange",
  },
  distanceView: {
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row"
  },
  tempreture:{
    padding:20
  },
  wind:{
    padding:20
  },
  skyInfoView:{
    padding: 20
  },
  chartBarConfig: {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "black",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "silver"
    }
  },
  chartBarStyle: {
  },
  
})

export default styles