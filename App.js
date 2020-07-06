//React
import React, { useState } from 'react';
//Expo
import { AppLoading } from 'expo';
//Fonts
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
//Navigation
import App from './src/navigation/AppNavigation';


//Component
export default function Application() {
  /*--DATA--*/
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  /*--METHODS--*/
  const loadResourcesAsync = async () => {
    await Promise.all([
      Font.loadAsync({
        'icomoon': require("./assets/fonts/icomoon.ttf"),
        'roboto-bold': require("./assets/fonts/Roboto-Bold.ttf"),
        'roboto-medium': require("./assets/fonts/Roboto-Medium.ttf"),
        'roboto-regular': require("./assets/fonts/Roboto-Regular.ttf"),
        'roboto-black': require("./assets/fonts/Roboto-Black.ttf"),
        'montserrat-semi-bold': require("./assets/fonts/Montserrat-SemiBold.ttf"),
        'montserrat-medium': require("./assets/fonts/Montserrat-Medium.ttf"),
        'montserrat-light': require("./assets/fonts/Montserrat-Light.ttf"),
        'montserrat-regular': require("./assets/fonts/Montserrat-Regular.ttf"),
        ...Ionicons.font
      }),
    ]);
  }

  const handleLoadingError = (error, setLoadingFailed) => {
    setLoadingFailed(true)
  }

  const handleFinishLoading = setLoadingComplete => {
    setLoadingComplete(true);
  }


  /*--TEMPLATE--*/
  if (isLoadingComplete) {
    return <App  />;
  } else {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

}


