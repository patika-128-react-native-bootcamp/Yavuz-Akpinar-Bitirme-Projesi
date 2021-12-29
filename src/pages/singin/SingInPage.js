import React from "react";
import { SafeAreaView, Text } from "react-native";

const SingInPage = () => {
  return (
    <SafeAreaView>
      <Input
        placeholder="E-mail"
        onChangeText={handleMail} />
      <Input
        placeholder="Password"
        onChangeText={handlePassword} />
      <Input
        placeholder="Password Again"
        onChangeText={handlePassword} />
      <Button title="LogIn" />
      <Button
        theme="outline"
        title="SingIn" />
    </SafeAreaView>
  )
}

export default SingInPage