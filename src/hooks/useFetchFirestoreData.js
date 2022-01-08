import React, { useContext, useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { UserMailContext } from "../context/userMailProvider"

const useFetchFirestoreData = () => {
  const [firestoreData, setFirestoreData] = useState([])
  const [firestoreDataAll, setFirestoreDataAll] = useState([])
  const {email} = useContext(UserMailContext)
  const fetchData = async () => {
    try {
      const response = await firestore().collection(`.RunningData`).doc(`${email}`).collection(`${email}`).get()
      setFirestoreData(response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
      const responseLeaderboard = await firestore().collection(`TotalDistance`).get()
      setFirestoreDataAll(responseLeaderboard.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { firestoreData, firestoreDataAll }
}


export default useFetchFirestoreData
