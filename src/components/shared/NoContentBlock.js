//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { Spacer } from "../shared";
import { ButtonPrimary, ButtonOrder } from "../buttons";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Localization
import translator from "../../translator/translator";
//Styles
import styles from '../../styles/components/shared/no-content-block';
import { app_styles } from '../../styles/app_styles';





//----COMPONENT----//
const NoContentBlock = ({ navigation, title, note, toMainLink, toMenuLink, icon }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);




    //Template
    return (
        <View style={styles(scales).container}>
            <View style={styles(scales).content_container}>
                <IcoMoonIcon name={icon || "sad"} color={app_styles(scales).colors.text.grey} size={Math.round(scales.widthScale * 48)} />
                <Spacer spaceHeight={24} />
                <Text style={styles(scales).title}>{title}</Text>
                <Spacer spaceHeight={6} />
                <Text style={styles(scales).note}>{note}</Text>
                <Spacer spaceHeight={30} />
                {
                    toMainLink
                        ? <View style={styles(scales).btn_container}>
                            <ButtonOrder
                                color={app_styles(scales).colors.app.blue}
                                title={translator.translate(language, "На головний екран")}
                                callback={() => navigation.navigate('Menu')}
                            />
                        </View>
                        : null
                }
                {
                    toMenuLink
                        ? <View style={styles(scales).btn_container}>
                            <ButtonOrder
                                color={app_styles(scales).colors.app.blue}
                                title={translator.translate(language, "До меню")}
                                callback={() => navigation.navigate('Menu')}
                            />
                        </View>
                        : null
                }
            </View>
        </View>
    );
}



//----EXPORT----//
export default NoContentBlock