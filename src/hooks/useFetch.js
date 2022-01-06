import axios from "axios"
import React, {useEffect, useState} from "react"
import { Alert } from "react-native"



const useFetch = (lat1, lat2, lon1, lon2) => {
        const R = 6371e3; 
        const φ1 = lat1 * Math.PI / 180 
        const φ2 = lat2 * Math.PI / 180
        const Δφ = (lat2 - lat1) * Math.PI / 180
        const Δλ = (lon1 - lon2) * Math.PI / 180
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c 
    return {d}
}

  

export default useFetch