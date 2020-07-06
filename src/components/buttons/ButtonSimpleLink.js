//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { Text, TouchableOpacity, View } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/buttons/button-simple-link";
import { app_styles } from '../../styles/app_styles.js';




//----COMPONENT----//
const ButtonSimpleLink = ({ title, callback, medium, nounderline, unreadNotifications }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);


    //Methods and Hooks
    const defineTitleExtraStyles = () => {
        return {
            borderBottomWidth: nounderline ? 0 : Math.round(scales.widthScale * 1),
            borderBottomColor: nounderline ? null : '#E5E5E5',
            fontFamily: medium ? app_styles(scales).fonts.weight.medium : app_styles(scales).fonts.weight.bold,
        }
    }


    //Template
    return (
        <TouchableOpacity style={styles(scales).button} onPress={callback} activeOpacity={.7}>
            <Text style={[styles(scales).title, defineTitleExtraStyles()]}>{title}</Text>
            {
                unreadNotifications
                    ? (
                        <View style={styles(scales).nots_num_cont}>
                            <Text style={styles(scales).nots_number}>
                                {unreadNotifications}
                            </Text>
                        </View>
                    )
                    : null
            }
        </TouchableOpacity>
    );
}




//----EXPORT----//
export default ButtonSimpleLink;