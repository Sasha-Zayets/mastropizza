//----IMPORTS----//
//React
import React, {useContext} from 'react';
//React native
import {View, ActivityIndicator, Text, ImageBackground, StatusBar} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
//Components
import {SafeView, Spacer, VerticalSpacer} from "./index";
//Styles
import {app_styles} from '../../styles/app_styles';
import styles from '../../styles/components/shared/init-app-loading-indicator';
import {NavigationEvents} from "react-navigation";


//----COMPONENT----//
const InitAppLoadingIndicator = () => {
    //Data and State
    const {state: {scales}} = useContext(AppSettingsContext);

    //Template
    return (
        <>
            <StatusBar backgroundColor={app_styles(scales).colors.app.blue} barStyle="light-content"/>
            <SafeView>
                <ImageBackground
                    source={require("../../../assets/splash.png")}
                    style={styles(scales).main_container}
                >
                    <View style={app_styles(scales).row_center}>
                        <ActivityIndicator color={app_styles(scales).colors.app.white} size="small"/>
                        <VerticalSpacer spaceWidth={7}/>
                        <Text style={styles(scales).note}>Loading...</Text>
                    </View>
                    <Spacer spaceHeight={40}/>
                </ImageBackground>
            </SafeView>
        </>

    );
}


//----EXPORT----//
export default InitAppLoadingIndicator;