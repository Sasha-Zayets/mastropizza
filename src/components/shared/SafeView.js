//----IMPORTS---//
//React
import React, {useContext} from 'react';
//React native
import { StyleSheet, Platform, View, StatusBar } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Safe area view
import SafeAreaView from 'react-native-safe-area-view';
//Status bar height
import { getStatusBarHeight } from 'react-native-status-bar-height';
//Styles
import { app_styles } from "../../styles/app_styles";



//---COMPONENT---//
const SafeView = ({ children }) => {
  //Data and State
  const { state: { language, scales } } = useContext(AppSettingsContext);

  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;


  const StatusBarPlaceHolder = ()=> {
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: app_styles(scales).colors.app.orange
        }}>
            <StatusBar
                barStyle="light-content"
            />
        </View>
    );
}
  
  return (
    <SafeAreaView style={styles.AndroidSafeArea} forceInset={{ top: Platform.OS === 'android' ? 'always' : 'never' }}>
      <StatusBarPlaceHolder/>
      {children}
    </SafeAreaView>
  );
}


//----STYLES----//
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
  }
});



//---EXPORT---//
export default SafeView;