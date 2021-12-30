import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import auth from '@react-native-firebase/auth';

const LogInLayout = ({onSubmit, navigateSingIn}) => {
  return(
    <SafeAreaView>
      <Formik initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
      >
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
              onChangeText={handleChange('password')}
              textEntry={true} />
            <Button
              onPress={handleSubmit}
              title="LogIn" />
          </View>
        )}
      </Formik>
      <Button
        onPress={navigateSingIn}
        theme="outline"
        title="SingIn" />
    </SafeAreaView>
  )
}

export default LogInLayout