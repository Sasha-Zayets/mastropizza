//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { Spacer, VerticalSpacer } from "../shared";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Helpers
import {prepareLanguageToHttpRequest} from "../../helpers/helpers";
//Moment
import moment from "moment";
import 'moment/locale/uk';
import 'moment/locale/ru';
//Styles
import styles from '../../styles/components/notifications/notification-card';
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const NotificationCard = ({ notification, navigation }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);


    //Hooks and Methods
   const transformUnixTime = (time) => {
       const lang = prepareLanguageToHttpRequest(language);
       moment.locale(lang);
       return moment(parseInt(time) * 1000).format('DD MMMM YYYY HH:mm');
    }

    const getColor = () => notification.read === 0 ? app_styles(scales).colors.text.primary : app_styles(scales).colors.text.light_grey


    //Template
    return (
        <TouchableOpacity style={styles(scales).container} onPress={() => navigation.navigate('ReadNotification', {'notificationId': notification.id, 'notificationStatus': String(notification.read)})} activeOpacity={.8}>
            <View style={styles(scales).body_container}>
                <View style={styles(scales).row}>
                    <IcoMoonIcon
                        name="date"
                        color={getColor()}
                        size={Math.round(scales.widthScale * 18)}
                    />
                    <VerticalSpacer spaceWidth={8} />
                    <Text style={[styles(scales).title, {color: getColor()}]}>{transformUnixTime(notification.date)}</Text>
                </View>
                <Spacer spaceHeight={8} />
                <View style={styles(scales).row}>
                    <IcoMoonIcon
                        name="bell1"
                        color={getColor()}
                        size={Math.round(scales.widthScale * 18)}
                    />
                    <VerticalSpacer spaceWidth={8} />
                    <View style={{flex: 1}}>
                        <Text style={[styles(scales).title, {color: getColor()}]}>{notification.title}</Text>
                    </View>
                </View>
            </View>
            <View style={styles(scales).read_more}>
                <IcoMoonIcon
                    name="arrow-right"
                    color="#7b7a7a"
                    size={Math.round(scales.widthScale * 15)}
                />
            </View>
        </TouchableOpacity>
    );
}



//----EXPORT----//
export default NotificationCard