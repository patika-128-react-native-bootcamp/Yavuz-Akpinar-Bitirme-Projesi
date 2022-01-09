import React, {useContext} from "react";
import { useNavigation } from '@react-navigation/native'
import { Image, SafeAreaView, Text, View } from "react-native";
import auth from "@react-native-firebase/auth"
import routes from "../../navigation/routes";

import Button from "../../components/button/Button";
import useFetchFirestoreData from "../../hooks/useFetchFirestoreData";
import styles from "./ProfilePageStyles";
import { UserMailContext } from "../../context/userMailProvider";

const ProfilePage = () => {
  const navigation = useNavigation()
  const { firestoreData } = useFetchFirestoreData()
  const {email} = useContext(UserMailContext)

  const distance = firestoreData.reduce((a, b) => (a + b.TotalDistance), 0) /1000
  const time = firestoreData.reduce((a, b) => (a + b.TotalTime), 0)

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.topContainer}>
        <Image 
          source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}}
          style={styles.image}></Image>
        <Text style={styles.user}>User: {email}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonView}>
          <View style={styles.buttonInnerView}>
            <Button
              theme="profilePageButton"
              iconName="add-circle"
              iconSize={40}
              iconColor={"white"}
              onPress={() => navigation.navigate(routes.NEWACTIVITY)} />
            <Text>New Activity</Text>
          </View>
          <View style={styles.buttonInnerView}>
            <Button
              theme="profilePageButton"
              iconName="leaderboard"
              iconSize={40}
              iconColor={"white"}
              onPress={() => navigation.navigate(routes.LEADERBOARD)} />
            <Text>Leaderboard</Text>
          </View>
          <View style={styles.buttonInnerView}>
            <Button
              theme="profilePageButton"
              iconName="history"
              iconSize={40}
              iconColor={"white"}
              onPress={() => navigation.navigate(routes.ACTIVITYHISTORY)} />
            <Text>Activity History</Text>
          </View>
        </View>
        <View style={styles.infoView}>
          <View style={styles.infoInnerView}>
            <Text style={styles.title}>Total Distance so far</Text>
            <Text style={styles.info}>{distance.toFixed(2)} km</Text>
          </View>
          <View style={styles.infoInnerView}>
            <Text style={styles.title}>Total time for run</Text>
            <Text style={styles.info}>{time} minutes</Text>
          </View>
          <View style={styles.infoInnerView}>
            <Text style={styles.title}>Total run </Text>
            <Text style={styles.info}>{firestoreData.length}</Text>
          </View>
          <Button title="Log Out" onPress={() => auth().signOut()} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfilePage