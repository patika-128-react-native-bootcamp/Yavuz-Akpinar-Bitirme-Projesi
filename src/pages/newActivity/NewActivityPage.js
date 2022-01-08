import React, { useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { LocationContext } from "../../context/locationProvider";
import useFetch from "../../hooks/useFetch";
import NewActivityLayout from "./layout/NewActivityLayout";
import moment from "moment"
import useShare from "../../hooks/useShare";
import { UserMailContext } from "../../context/userMailProvider";

let interval = null;

const NewActivityPage = () => {
  const [isActive, setIsActive] = useState()
  const [watchLocation, setWatchLocation] = useState([])
  const [finishLocation, setFinishLocation] = useState()
  const [distanceBetweenLocations, setDistanceBetweenLocations] = useState([])
  const [distancePerMinute, setDistancePerMinute] = useState([])
  const [dt, setDt] = useState([])
  const [firestoreData, setFirestoreData] = useState({
    totalDistance: 0,
    avarageSpeed: 0
  });
  const { weatherData, startLocation} = useContext(LocationContext)
  const {email} = useContext(UserMailContext)
  console.log(email)

  const runningData = {
    AvarageSpeed: firestoreData.avarageSpeed ? firestoreData.avarageSpeed : 1,
    TotalDistance: firestoreData.totalDistance ? firestoreData.totalDistance : 1,
    TotalTime: dt ? dt.length : 1,
    StartLocation: {
      Latitude: startLocation ? startLocation.latitude : 1,
      longitude: startLocation ? startLocation.longitude : 1
    },
    watchLocation: watchLocation ? watchLocation : 1,
    date: moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'),
    location: weatherData.name,
    FinishLocation: watchLocation && watchLocation[watchLocation.length - 1]
  }

  const sum = (a, b) => a + b

  const handleAvarageSpeedTotalDistance = () => {
    setFirestoreData({
      totalDistance: distanceBetweenLocations.length >= 1 ? distanceBetweenLocations.reduce(sum) : 0,
      avarageSpeed: firestoreData.totalDistance / dt[dt.length - 1]
    })
  }

  const handleFiresoreData = async () => {
    try {
      await firestore().collection(`.RunningData`).doc(`${email}`).collection(`${email}`).add(runningData)
      
    } catch (error) {
      console.log(error)
    }
    try {
      firestore().collection('TotalDistance').add({
        user:email, 
        TotalDistance: firestoreData.totalDistance ? firestoreData.totalDistance : 1 })
    } catch (error) {
      console.log(error)
      
    }
  }

  const handleStart = () => {
    setIsActive(1)
    interval = setInterval(function (counter) {
      return function () {
        dt.push(counter++);
        setDt([counter, ...dt])
        console.log(dt)
        setDistancePerMinute([])
      };
    }(0), 20000);
  }

  useEffect(() => {
    handleDistance(), handleAvarageSpeedTotalDistance()
  }, [dt])

  const handleFinish = () => {
    setFinishLocation(watchLocation[watchLocation.length - 1])
    clearInterval(interval)
    handleFiresoreData()
    useShare({
      distance:firestoreData.totalDistance.toFixed(2),
      time : dt.length, 
      speed: firestoreData.avarageSpeed.toFixed(2),
      location: weatherData.name} )
  }

  const handleClear = () => {
    setIsActive()
    setFinishLocation()
    setWatchLocation([])
    setDistanceBetweenLocations([])
    setDistancePerMinute([])
    setDt([])
  }

  const handleDistance = () => {
    if (distancePerMinute.length >= 2) {
      const { d } = useFetch(
        distancePerMinute[0].latitude,
        distancePerMinute[distancePerMinute.length - 1].latitude,
        distancePerMinute[0].longitude,
        distancePerMinute[distancePerMinute.length - 1].longitude)
      setDistanceBetweenLocations([d, ...distanceBetweenLocations])
      console.log('bbbb', distanceBetweenLocations)
    }
  }

  // I needed two states for the same data because i am using one of them for the calculating distance per minute and for calculations it must return to zero point after one minute.Other one for the polyyline 
  const handleUserTracking = (e) => {
    console.log("aaaa", e.nativeEvent)
    console.log(distanceBetweenLocations)
    setWatchLocation([{
      time: e.nativeEvent.coordinate.timestamp,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    ...watchLocation])
    setDistancePerMinute([{
      time: e.nativeEvent.coordinate.timestamp,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    ...distancePerMinute])
  }

  return (
    <NewActivityLayout
      distanceBetweenLocations={distanceBetweenLocations}
      finishLocation={finishLocation}
      isActive={isActive}
      handleUserTracking={handleUserTracking}
      startLocation={startLocation}
      watchLocation={watchLocation}
      handleFinish={handleFinish}
      handleStart={handleStart}
      handleClear={handleClear}
      firestoreData={firestoreData}
      weatherData={weatherData}
      dt={dt}
    />
  )
}

export default NewActivityPage