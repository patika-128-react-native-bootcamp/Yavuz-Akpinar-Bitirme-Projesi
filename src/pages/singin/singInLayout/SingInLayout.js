import React from "react";
import { SafeAreaView, View } from "react-native";
import { Formik } from "formik"
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";


const SingInLayout = ({ onSubmit, navigateGoBack }) => {
  return (
    <SafeAreaView>
      <Formik
        initialValues={{ email: '', password: '', passwordagain: '' }}
        onSubmit={onSubmit}>
        {({ handleSubmit, values, handleChange }) => (
          <View>
            <Input
              title="E-mail"
              placeholder="E-mail"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            <Input
              title="Password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              textEntry={true}
            />
            <Input
              title="Password Again"
              placeholder="Password Again"
              value={values.passwordagain}
              onChangeText={handleChange('passwordagain')}
              textEntry={true}
            />
            <Button
              onPress={handleSubmit}
              title="SingIn"
            />
          </View>
        )}
      </Formik>
      <Button
        onPress={navigateGoBack}
        theme="outline"
        title="Back"
      />
    </SafeAreaView>
  )
}

export default SingInLayout