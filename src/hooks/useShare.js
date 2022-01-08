import { Alert } from "react-native";
import Share from "react-native-share";

const useShare = async ({distance, time, speed, location}) => {
  const shareOptions = {
    title:"Compleated my run for today !",
    message: `Compleated my run for today !
    Total distance : ${distance}
    Total time : ${time}
    Avarage speed : ${speed}
    Location : ${location}`
  }
  try {
    const shareResponse = await Share.open(shareOptions);
  } catch (error) {
    Alert.alert(error.message)
  }
}

export default useShare