import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    marginTop: 10,
    padding: 10,
    flexDirection: "row"
  },
  text: {
    fontSize: 15,
    padding: 5,
    fontWeight: "900",
    color: "white"
  },
  indexView: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    paddingRight: 10
  },
  textView: {
    paddingLeft: 20
  },
  index: {
    fontSize: 25,
    padding: 5,
    fontWeight: "900",
    color: "white"
  }
})

export default styles