import React from 'react';
import Navigation from './navigation/Navigation';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return(
    <Navigation></Navigation>
  )
}

export default App