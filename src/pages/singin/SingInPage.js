import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native";


const SingInPage = () => {
  const navigation = useNavigation()

  const handleNavigateGoBack = () => {
    navigation.goBack()
  }


  return (
    <SafeAreaView>
      <Formik
        initialValues={{ name: '', surname: '', email: '', password: '', passwordagain: '' }}
        onSubmit={() => {
          navigation.navigate('LogInPage')
          console.log("a")
        }}>
        {({ handleSubmit, values, handleChange }) => (
          <View>
            <Input
              title="Name"
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
            />
            <Input
              title="surname"
              placeholder="Surname"
              value={values.surname}
              onChangeText={handleChange('surname')}
            />
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
            />
            <Input
              title="Password Again"
              placeholder="Password Again"
              value={values.passwordagain}
              onChangeText={handleChange('passwordagain')}
            />
            <Button
              onPress={handleSubmit}
              title="LogIn" />
          </View>
        )}
      </Formik>
      <Button
        onPress={handleNavigateGoBack}
        theme="outline"
        title="Back" />
    </SafeAreaView>
  )
}

export default SingInPage