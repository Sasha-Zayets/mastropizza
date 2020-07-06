//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { Text, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/buttons/button-clear-cart";




//----COMPONENT----//
const ButtonClearCart = ({ title, callback }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);

    //Template
    return (
        <TouchableOpacity style={styles(scales).button} onPress={callback}>
            <Text style={styles(scales).title}>{title}</Text>
        </TouchableOpacity>
    );
}




//----EXPORT----//
export default ButtonClearCart;