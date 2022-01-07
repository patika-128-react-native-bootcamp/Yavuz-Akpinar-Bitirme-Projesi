import { Formik } from "formik";
import React from "react";
import { SafeAreaView, View } from "react-native";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import styles from "./LogInLayoutStyles";
import Icon from "react-native-vector-icons/MaterialIcons"

const LogInLayout = ({ onSubmit, navigateSingIn }) => {
  return (
    <SafeAreaView style={styles.outercontainer}>
      <View style={styles.topContainer}>
        <Icon name="directions-walk" size={150} color="white"></Icon>
      </View>
      <View style={styles.bottomContainer}>
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
      </View>
    </SafeAreaView>
  )
}

export default LogInLayout