import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const LogInPage = () => {
  const navigation = useNavigation()

  const handleNavigateSingIn = () => {
    navigation.navigate("SingInPage")
  }
  const handleNavigateLogIn = () => {
    navigation.navigate("DrawerStack")
  }

  return (
    <SafeAreaView>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={handleNavigateLogIn}>
        {({ values, handleSubmit, handleChange }) => (

          <View>
            <Input
              value={values.email}
              title="User Name"
              placeholder="E-mail"
              onChangeText={handleChange('email')} />
            <Input
              value={values.password}
              title="Password"
              placeholder="Password"
              onChangeText={handleChange('password')} />
            <Button
              onPress={handleSubmit}
              title="LogIn" />
          </View>
        )}
      </Formik>

      <Button
        onPress={handleNavigateSingIn}
        theme="outline"
        title="SingIn" />
    </SafeAreaView>
  )
}

export default LogInPage