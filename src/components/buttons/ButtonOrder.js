//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/buttons/button-order";
import { app_styles } from '../../styles/app_styles.js';




//----COMPONENT----//
const ButtonOrder = ({ title, callback, icon, iconName, iconSize, color, isDataLoading, noStretch = false }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);

    //Template
    return (
        <TouchableOpacity style={[styles(scales).button, { backgroundColor: color, alignSelf: noStretch ? 'center' : 'stretch', paddingHorizontal: noStretch ? Math.round(scales.widthScale * 20) : null }]} onPress={callback} activeOpacity={.7}>
            {
                isDataLoading
                    ? <ActivityIndicator size="small" color={app_styles(scales).colors.app.white} />
                    : (
                        <>
                            {
                                icon
                                    ? (
                                        <View style={styles(scales).icon_container}>
                                            <IcoMoonIcon
                                                name={iconName}
                                                color={app_styles(scales).colors.app.white}
                                                size={iconSize}
                                            />
                                        </View>
                                    )
                                    : null
                            }
                            <Text style={styles(scales).title}>{title}</Text>
                        </>
                    )
            }
        </TouchableOpacity>
    );
}




//----EXPORT----//
export default ButtonOrder;