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
            <StatusBar backgroundColor={app_styles(scales).colors.app.orange} barStyle="light-content"/>
            <SafeView>
                <View style={{
                    height: '100%',
                    backgroundColor: app_styles(scales).colors.app.orange,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ImageBackground
                        source={require("../../../assets/logo.png")}
                        style={styles(scales).main_container}
                    />
                    <Spacer spaceHeight={40}/>
                    <View style={app_styles(scales).row_center}>
                        <ActivityIndicator color={app_styles(scales).colors.app.white} size="small"/>
                        <VerticalSpacer spaceWidth={7}/>
                        <Text style={styles(scales).note}>Loading...</Text>
                    </View>
                </View>
            </SafeView>
        </>

    );
}


//----EXPORT----//
export default InitAppLoadingIndicator;