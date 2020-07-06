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
import styles from "../../styles/components/buttons/button-toggler";
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const ButtonToggler = ({ callback, isActive }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);

    //Template
    return (
        <TouchableOpacity 
            style={[styles(scales).button, { backgroundColor: isActive ? app_styles(scales).colors.app.green : app_styles(scales).colors.text.light_grey }]}
            onPress={callback}
            activeOpacity={1}
        >
            <View style={[
                    styles(scales).inner, 
                    { 
                        backgroundColor: app_styles(scales).colors.app.white,
                        left: isActive ? Math.round(scales.widthScale * 19) : Math.round(scales.widthScale * 3), 
                    }
                ]}
            />
        </TouchableOpacity>
    );
}




//----EXPORT----//
export default ButtonToggler;