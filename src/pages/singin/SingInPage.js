import React from "react";
import { SafeAreaView, Text } from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const SingInPage = () => {
  return (
    <SafeAreaView>
      <Input
        placeholder="E-mail"
         />
      <Input
        placeholder="Password"
       />
      <Input
        placeholder="Password Again"
        />
      <Button title="LogIn" />
      <Button
        theme="outline"
        title="SingIn" />
    </SafeAreaView>
  )
}

export default SingInPage