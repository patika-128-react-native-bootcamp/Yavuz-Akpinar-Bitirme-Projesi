import React from "react";
import {useNavigation} from '@react-navigation/native'
import { SafeAreaView, Text, View } from "react-native";
import Button from "../../components/button/Button";
import titles from "../../components/sources/titles.json"
import auth from "@react-native-firebase/auth"
import routes from "../../navigation/routes";


const ProfilePage = () => {
  const navigation = useNavigation()
  

  return(
    <SafeAreaView>
      <Text>
        Profile Page
      </Text>
      {titles.map((title, index) => {
          return(
            <View key={index}>
              <Button iconName="add_circle" iconSize={20} iconColor={"white"} title={title} onPress={() => navigation.navigate(routes.NEWACTIVITY)}/>
            </View>
          )
          })
      }
      <Button title="Log Out" onPress={() => auth().signOut()}/>
    </SafeAreaView>
  )
}

export default ProfilePage