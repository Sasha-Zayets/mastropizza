//----IMPORTS----//
//React
import React, {useContext, useState, useEffect} from 'react';
//React native
import {View, Text, TouchableOpacity, Linking} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as AuthContext} from "../context/AuthContext";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from "../../selection.json";

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Moment
import moment from "moment";
import 'moment/locale/uk';
import 'moment/locale/ru';
//Helpers
import { prepareLanguageToHttpRequest } from "../helpers/helpers";
//Componetns
import Header from "../components/shared/Header";
import {SafeView, Block, Spacer, VerticalSpacer} from "../components/shared";
import {ButtonOrder} from "../components/buttons";
//Styles
import styles from '../styles/screens/read-notification-screen';
import {app_styles} from '../styles/app_styles';
//Localization
import translator from '../translator/translator';



//----COMPONENT----//
const ReadNotificationScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language, contacts}} = useContext(AppSettingsContext);
    const {state: {networkError, notification}, clearNetworkError, clearNotification, setNetworkError, getNotification} = useContext(AuthContext);

    //Hooks and Methods
    useEffect(() => {
        return () => {
            handleBlur();
        }
    }, [language]);


    const handleFocus = () => {
        if (!notification) {
            let id = navigation.getParam('notificationId');
            let status = navigation.getParam('notificationStatus');
            if (!id || !status) return setNetworkError()
            getNotification(id, status)
        }
    }

    const handleBlur = () => {
        if (networkError) {
            clearNetworkError()
        }
        clearNotification();
    }


    const transformUnixTime = (time) => {
        const lang = prepareLanguageToHttpRequest(language);
        moment.locale(lang);
        return moment(parseInt(time) * 1000).format('DD MMMM YYYY HH:mm');
    }


    const callManager = () => {
        if (!contacts.phone) return;

        let cleanedPhoneNumber = contacts.phone.replace(/\D||\s/g, "");

        if (cleanedPhoneNumber.indexOf('38') === 0) {
            cleanedPhoneNumber = cleanedPhoneNumber.substring(2);
        }
        const link = Platform.OS === 'ios' ? `tel://+38${cleanedPhoneNumber}` : `tel:+38${cleanedPhoneNumber}`;
        Linking.openURL(link)
    }


    //Template
    return (
        <>
            <SafeView>
                <NavigationEvents
                    onWillFocus={() => handleFocus()}
                />
                <Header
                    title={translator.translate(language, "Повідомлення")}
                    backAllowed
                    navigation={navigation}
                    noIcons
                />
                <View style={styles(scales).body}>
                    {
                        notification
                            ? (
                                <Block>
                                    <Spacer spaceHeight={20}/>
                                    <View>
                                        {
                                            notification.status
                                                ? (
                                                    <>
                                                        <View>
                                                            <Text style={styles(scales).title_bold}>{notification.title}</Text>
                                                        </View>
                                                        <Spacer spaceHeight={20}/>
                                                    </>
                                                )
                                                : null
                                        }
                                        <View style={styles(scales).row}>
                                            <View style={styles(scales).icon_container}>
                                                <IcoMoonIcon
                                                    name="date"
                                                    color={app_styles(scales).colors.text.primary}
                                                    size={Math.round(scales.widthScale * 18)}
                                                />
                                            </View>
                                            <Text style={styles(scales).title}>{transformUnixTime(notification.date)}</Text>
                                        </View>                                        
                                        <Spacer spaceHeight={5}/>
                                        <View style={styles(scales).row}>
                                            <View style={styles(scales).icon_container}>
                                                <IcoMoonIcon
                                                    name="bell1"
                                                    color={app_styles(scales).colors.text.primary}
                                                    size={Math.round(scales.widthScale * 18)}
                                                />
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text style={styles(scales).title}>{notification.text}</Text>
                                            </View>
                                        </View>
                                        {
                                            notification.status
                                                ? (
                                                    <>
                                                        <Spacer spaceHeight={40}/>
                                                        <View style={[styles(scales).row, styles(scales).button_container]}>
                                                            <ButtonOrder
                                                                title={translator.translate(language, "З'єднатися з менеджером")}
                                                                callback={callManager}
                                                                icon
                                                                iconName="phone-volume"
                                                                iconSize={18}
                                                                color={app_styles(scales).colors.app.blue}
                                                                noStretch
                                                            />
                                                        </View>
                                                    </>
                                                )
                                                : null
                                        }
                                    </View>
                                </Block>
                            )
                            : null
                    }
                </View>
            </SafeView>
        </>
    );
}


//----EXPORT----//
export default ReadNotificationScreen;