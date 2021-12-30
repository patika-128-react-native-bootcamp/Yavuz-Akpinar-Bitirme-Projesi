import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../../components/button/Button";
import titles from "../../components/sources/titles.json"
import auth from "@react-native-firebase/auth"


const ProfilePage = () => {
  return(
    <SafeAreaView>
      <Text>
        Profile Page
      </Text>
      {titles.map((title, index) => {
          return(
            <View key={index}>
              <Button title={title}/>
            </View>
          )
          })
      }
      <Button title="Log Out" onPress={() => auth().signOut()}/>
    </SafeAreaView>
  )
}

export default ProfilePage