//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { TouchableOpacity, Text, View } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, Spacer, VerticalSpacer } from "../components/shared";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/terms-and-conditions-screen';
import { app_styles } from '../styles/app_styles';



//----COMPONENT----//
const TermsAndConditionsScreen = ({ navigation }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);
    

    //Template
    return (

        <SafeView>
            <Header
                title={translator.translate(language, "Положення і умови")}
                backAllowed
                navigation={navigation}
                noIcons
            />
            <View style={styles(scales).body}>
                <Block>
                    <Spacer spaceHeight={15} />
                    <TouchableOpacity style={app_styles(scales).row_start} onPress={() => navigation.navigate('TermsAndConditionsPage', {page: 'public_offer'})} activeOpacity={.7}>
                        <IcoMoonIcon name="paper" color={app_styles(scales).colors.app.blue} size={Math.round(scales.widthScale * 22)} />
                        <VerticalSpacer spaceWidth={10} />
                        <Text style={styles(scales).text}>{translator.translate(language, "Договір публічної оферти")}</Text>
                    </TouchableOpacity>
                    <Spacer spaceHeight={15} />
                    <TouchableOpacity style={app_styles(scales).row_start} onPress={() => navigation.navigate('TermsAndConditionsPage', {page: 'privacy_policy'})} activeOpacity={.7}>
                        <IcoMoonIcon name="paper" color={app_styles(scales).colors.app.blue} size={Math.round(scales.widthScale * 22)} />
                        <VerticalSpacer spaceWidth={10} />
                        <Text style={styles(scales).text}>{translator.translate(language, "Політика конфіденційності")}</Text>
                    </TouchableOpacity>
                </Block>
            </View>
        </SafeView>
    );
}

//----EXPORT----//
export default TermsAndConditionsScreen;