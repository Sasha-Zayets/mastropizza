//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { Text, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Translator
import translator from "../../translator/translator";
//Styles
import styles from "../../styles/components/buttons/button-read-more-toggler";
import { app_styles } from "../../styles/app_styles";




//----COMPONENT----//
const ButtonReadMoreToggler = ({ isActive, callback }) => {
    //Date and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    



    //Hooks and Methods
    const getButtonExtraStyles = () => {
        return {
            borderColor: !isActive ? app_styles(scales).colors.app.blue : app_styles(scales).colors.text.grey
        }
    }

    const getTitleExtraStyles = () => {
        return {
            color: !isActive ? app_styles(scales).colors.app.blue : app_styles(scales).colors.text.grey
        }
    }



    //Template
    return (
        <TouchableOpacity style={[styles(scales).button, getButtonExtraStyles()]} onPress={callback} activeOpacity={0.8}>
            <Text style={[styles(scales).title, getTitleExtraStyles()]}>{ !isActive ? translator.translate(language, "Детальніше") : translator.translate(language, "Згорнути") }</Text>
        </TouchableOpacity>
    );
}




//----EXPORT----//
export default ButtonReadMoreToggler;