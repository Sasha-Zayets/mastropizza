//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/buttons/button-modal";




//----COMPONENT----//
const ButtonModal = ({ title, callback, color }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);

    //Template
    return (
        <TouchableOpacity style={[styles(scales).button, { backgroundColor: color }]} onPress={() => callback()} activeOpacity={.7}>
            <Text style={styles(scales).title}>{title}</Text>
        </TouchableOpacity>
    );
}




//----EXPORT----//
export default ButtonModal;