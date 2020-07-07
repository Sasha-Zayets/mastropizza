//----IMPORTS----//
//React
import React, { useContext, useState } from "react";
//React native
import { View, Text, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React-native-vector-icons package
//Styles
import styles from "../../styles/components/buttons/button-radio";
import { app_styles } from "../../styles/app_styles";




//----COMPONENT----//
const ButtonRadio = ({ callback, value, isSelected, label }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);
    

    //Template
    return (
        <TouchableOpacity onPress={() => callback(value)} style={styles(scales).btn_group} activeOpacity={.7}>
            <View style={[styles(scales).outer_container, {borderColor: isSelected ? app_styles(scales).colors.app.orange : "#CCCCCC"}]}>
                {
                    isSelected ? <View style={styles(scales).inner_container}></View> : null
                }
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={[styles(scales).label, {color: isSelected ? app_styles(scales).colors.text.black : app_styles(scales).colors.app.light_black}]}>{ label }</Text>
            </View>    
        </TouchableOpacity>
    );

}





//----EXPORT----//
export default ButtonRadio;