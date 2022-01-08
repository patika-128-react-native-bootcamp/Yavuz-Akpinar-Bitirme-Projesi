import { Dimensions, StyleSheet } from "react-native";

const styles = {
  default: StyleSheet.create({
    container: {
      backgroundColor: "orange",
      margin: 10,
      marginTop: 20,
      alignItems: "center",
      padding: 5,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "center"
    },
    title: {
      fontSize: 25,
      color: "white",
    }
  }),
  outline: StyleSheet.create({
    container: {
      backgroundColor: "white",
      margin: 10,
      alignItems: "center",
      padding: 5,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "center"
    },
    title: {
      fontSize: 25,
      color: "orange",
    }
  }),
  startButton: StyleSheet.create({
    container: {
      backgroundColor: "orange",
      margin: 10,
      alignItems: "center",
      paddingBottom: 10,
      paddingTop: 10,
      paddingRight: 30,
      paddingLeft: 30,
      borderRadius: 50,
      flexDirection: "row"
    },
    title: {
      fontSize: 25,
      color: "white"
    }
  }),
  profilePageButton: StyleSheet.create({
    container: {
      backgroundColor: "orange",
      margin: 10,
      alignItems: "center",
      paddingBottom: 20,
      borderRadius: 10,
      height: Dimensions.get("screen").height / 10,
      width: Dimensions.get("screen").width / 4,
      justifyContent: "center"
    },
    title: {
      fontSize: 15,
      color: "teal"
    }
  }),
}
export default styles