import React, {useEffect, useState} from "react"
import firestore from "@react-native-firebase/firestore"


const useFetchFirestoreData = () => {
  const [firestoreData, setFirestoreData] = useState([])
  const fetchData = async () => {
    try {
      const response = await firestore().collection('RunningData').get()
      setFirestoreData(response.docs.map((doc) => {
        return {...doc.data(), id:doc.id}
      }))
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchData()
  },[])

  return {firestoreData}

}

export default useFetchFirestoreData
