//----IMPORTS----//
//React
import React, { useState, useContext } from 'react';
//React native
import { View, Linking, Platform, Text } from 'react-native';
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, Spacer } from "../components/shared";
import { ButtonPrimary } from "../components/buttons";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/update-app-screen';
import { app_styles } from '../styles/app_styles';



//----COMPONENT----//
const UpdateAppScreen = ({ navigation }) => {
    //Data and State
    const { state: { scales, language, appSettings } } = useContext(AppSettingsContext);
    const [message, setMessage] = useState(navigation.getParam("message"))

    //Hooks and Methods
    const handleUpdatePress = () => {
        let androindLink = appSettings.mobileAppAndroid || null;
        let iosLink = appSettings.mobileAppIOS || null;

        const URL =
            Platform.OS === "ios"
                ? iosLink
                : androindLink;

        if (!URL) return;
        Linking.openURL(URL);
    }



    //Template
    return (
        <>
            <SafeView>
                <View style={styles(scales).body}>
                    <IcoMoonIcon name="sad" color={app_styles(scales).app_red} size={Math.round(scales.widthScale * 80)} />
                    <Block>
                        <Spacer spaceHeight={24} />
                        <Text style={styles(scales).title}>Oooopppsss!</Text>
                        <Spacer spaceHeight={6} />
                        <Text style={styles(scales).note}>{message}</Text>
                        <Spacer spaceHeight={30} />
                        <ButtonPrimary
                            title={translator.translate(language, "Оновити")}
                            color={app_styles(scales).colors.app.blue}
                            callback={handleUpdatePress}
                        />
                    </Block>
                </View>
            </SafeView>
        </>
    );
}



//----EXPORT----//
export default UpdateAppScreen;