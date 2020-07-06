//----IMPORTS----//
//React
import React, { useContext, useState } from "react";
//React native
import { View, Text, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React-native-vector-icons package
//Styles
import styles from "../../styles/components/buttons/button-select";




//----COMPONENT----//
const ButtonRadio = ({ callback, value, isSelected, title }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);
    

    //Template
    return (
        <TouchableOpacity onPress={() => callback(value)} style={styles(scales, isSelected).btn} activeOpacity={.8}>
            <Text style={styles(scales, isSelected).title}>{title}</Text>
        </TouchableOpacity>
    );
}





//----EXPORT----//
export default ButtonRadio;