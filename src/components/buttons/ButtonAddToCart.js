//----IMPORTS----//
//React
import React, { useContext, useEffect } from 'react';
//React native
import { View, Text, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/buttons/button-add-to-cart";





//----COMPONENT----//
const ButtonAddToCart = ({ title, callback }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);

    
    //Template
    return (
        <View>
            <TouchableOpacity style={styles(scales).button} onPress={callback} activeOpacity={.7}>                
                <View style={styles(scales).title_container}>
                    <Text style={styles(scales).title}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}




//----EXPORT----//
export default ButtonAddToCart;