import firestore from '@react-native-firebase/firestore';
import moment from "moment"


const useFirestoreSendData = async (email, startLocation, firestoreData, chartTime, watchLocation, weatherData) => {

  const runningData = {
    AvarageSpeed: firestoreData.avarageSpeed ? firestoreData.avarageSpeed : 1,
    TotalDistance: firestoreData.totalDistance ? firestoreData.totalDistance : 1,
    TotalTime: chartTime ? chartTime.length : 1,
    StartLocation: {
      Latitude: startLocation ? startLocation.latitude : 1,
      longitude: startLocation ? startLocation.longitude : 1
    },
    watchLocation: watchLocation ? watchLocation : 1,
    date: moment().utcOffset('+03').format('YYYY-MM-DD hh:mm:ss a'),
    location: weatherData.name,
    FinishLocation: watchLocation && watchLocation[watchLocation.length - 1]

  }
  try {
    await firestore().collection(`.RunningData`).doc(`${email}`).collection(`${email}`).add(runningData)
  } catch (error) {
    console.log(error)
  }
  try {
    firestore().collection('TotalDistance').add({
      user: email,
      TotalDistance: firestoreData.totalDistance ? firestoreData.totalDistance : 1
    })
  } catch (error) {
    console.log(error)
  }

}

export default useFirestoreSendData