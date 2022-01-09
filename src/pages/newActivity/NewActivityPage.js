import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../context/locationProvider";
import useDistanceCalculation from "../../hooks/useDistanceCalculation";
import NewActivityLayout from "./layout/NewActivityLayout";
import useShare from "../../hooks/useShare";
import { UserMailContext } from "../../context/userMailProvider";
import useFirestoreSendData from "../../hooks/useFirestoreSendData";

let interval = null;

const NewActivityPage = () => {
  const [isActive, setIsActive] = useState()
  const [watchLocation, setWatchLocation] = useState([])
  const [finishLocation, setFinishLocation] = useState()
  const [distanceBetweenLocations, setDistanceBetweenLocations] = useState([])
  const [distancePerMinute, setDistancePerMinute] = useState([])
  const [chartTime, setChartTime] = useState([])
  const [firestoreData, setFirestoreData] = useState({
    totalDistance: 0,
    avarageSpeed: 0
  });
  const { weatherData, startLocation } = useContext(LocationContext)
  const { email } = useContext(UserMailContext)

  const sum = (a, b) => a + b

  const handleAvarageSpeedTotalDistance = () => {
    setFirestoreData({
      totalDistance: distanceBetweenLocations.length >= 1 ? distanceBetweenLocations.reduce(sum) : 0,
      avarageSpeed: firestoreData.totalDistance && firestoreData.totalDistance / chartTime[chartTime.length - 1]
    })
  }

  const handleStart = () => {
    setIsActive(1)
    interval = setInterval(function (counter) {
      return function () {
        chartTime.push(counter++);
        setChartTime([counter, ...chartTime])
        setDistancePerMinute([])
      };
    }(0), 20000);
  }

  useEffect(() => {
    handleDistance(), handleAvarageSpeedTotalDistance()
  }, [chartTime])

  const handleFinish = () => {
    setFinishLocation(watchLocation[watchLocation.length - 1])
    clearInterval(interval)
    setIsActive()
    useFirestoreSendData(email, startLocation, firestoreData, chartTime, watchLocation, weatherData)
    useShare({
      distance: firestoreData.totalDistance.toFixed(2),
      time: chartTime.length,
      speed: firestoreData.avarageSpeed.toFixed(2),
      location: weatherData.name
    })
  }

  const handleClear = () => {
    setIsActive()
    setFinishLocation()
    setWatchLocation([])
    setDistanceBetweenLocations([])
    setDistancePerMinute([])
    setChartTime([])
  }

  const handleDistance = () => {
    if (distancePerMinute.length >= 2) {
      const { d } = useDistanceCalculation(
        distancePerMinute[0].latitude,
        distancePerMinute[distancePerMinute.length - 1].latitude,
        distancePerMinute[0].longitude,
        distancePerMinute[distancePerMinute.length - 1].longitude)
      setDistanceBetweenLocations([d, ...distanceBetweenLocations])
    }
  }

  // I needed two states for the same data because i am using one of them for the calculating distance per minute and for calculations it must return to zero point after one minute.Other one for the polyyline 
  const handleUserTracking = (e) => {
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
      chartTime={chartTime}
    />
  )
}

export default NewActivityPage