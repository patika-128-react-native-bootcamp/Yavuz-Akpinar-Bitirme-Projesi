import React from "react";
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, Text, View } from "react-native";
import Button from "../../components/button/Button";
import titles from "../../components/sources/titles.json"
import auth from "@react-native-firebase/auth"
import routes from "../../navigation/routes";


const ProfilePage = () => {
  const navigation = useNavigation()


  return (
    <SafeAreaView>
      <Text>
        Profile Page
      </Text>
      <View>
        <Button 
          iconName="add-circle" 
          iconSize={20} 
          iconColor={"white"} 
          title="New Activity" 
          onPress={() => navigation.navigate(routes.NEWACTIVITY)} />
        <Button 
          iconName="leaderboard" 
          iconSize={20} 
          iconColor={"white"} 
          title="Leaderboard" 
          onPress={() => navigation.navigate(routes.NEWACTIVITY)} />
        <Button 
          iconName="history" 
          iconSize={20} 
          iconColor={"white"} 
          title="Activity History" 
          onPress={() => navigation.navigate(routes.NEWACTIVITY)} />
      </View>

      <Button title="Log Out" onPress={() => auth().signOut()} />
    </SafeAreaView>
  )
}

export default ProfilePage