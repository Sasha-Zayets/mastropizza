//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/buttons/button-facebook";
import { app_styles } from '../../styles/app_styles.js';




//----COMPONENT----//
const ButtonPrimary = ({ title, callback, color, isDataLoading }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);

    //Template
    return (
        <TouchableOpacity style={[styles(scales).button, {backgroundColor: color}]} onPress={callback}>
            {
                isDataLoading
                    ? <ActivityIndicator size="small" color={app_styles(scales).colors.app.white} />
                    : (
                        <View style={styles(scales).inner_container}>
                            <Image 
                                source={require("../../../assets/images/facebook.png")}
                                style={styles(scales).logo}
                            />
                            <Text style={styles(scales).title}>{title}</Text>
                        </View>
                    )
            }
        </TouchableOpacity>
    );
}




//----EXPORT----//
export default ButtonPrimary;