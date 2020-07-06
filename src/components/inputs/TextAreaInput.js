//----IMPORTS----//
//React
import React, { useContext, useState } from 'react';
//React native
import { Text, View, TextInput, Platform } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { Spacer } from '../shared';
//Styles
import styles from "../../styles/components/inputs/textarea-input";
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const TextAreaInput = ({ value, placeholder, error, clearError, callback, name, onMakeOrder }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);


    //Hooks and Methods
    const arrangeFocus = () => {
        if(error){
            clearError(name);
        }
    }

    const handleInput = (value) => {
        callback(name, value)
    }



    const extraInputStyles = () => {
        return { 
            borderWidth: Math.round(scales.widthScale * 1), 
            borderColor: value ? app_styles(scales).colors.text.primary : app_styles(scales).colors.text.light_grey,
            color: value ? app_styles(scales).colors.text.primary : app_styles(scales).colors.text.light_grey,
            fontSize: onMakeOrder ? Math.round(scales.fontScale * 16) : Math.round(scales.fontScale * 12)
        }
    }

    const extraPlaceholderStyles = () => {
        return {
            fontSize: onMakeOrder ? Math.round(scales.fontScale * 16) : Math.round(scales.fontScale * 12)
        }
    }




    //Template
    return (
        <View style={styles(scales).main_container}>
            <View style={styles(scales).input_container}>
                <TextInput
                    style={[styles(scales).input, extraInputStyles()]}
                    placeholderTextColor={app_styles(scales).colors.text.light_grey}
                    placeholderStyle={[styles(scales).placeholder_style, extraPlaceholderStyles()]}
                    placeholder={placeholder}
                    autocapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => handleInput(value)}
                    value={value}
                    onFocus={() => arrangeFocus(name)}
                    multiline={true}
                    numberOfLines={Platform.OS === 'ios' ? null : (onMakeOrder ? Math.round(scales.heightScale * 4) : Math.round(scales.heightScale * 5))}
                    minHeight={Platform.OS === 'ios' ? Math.round(scales.heightScale * (40 * 4)) : null}
                />
            </View>
            {
                error ?
                    (
                        <>
                            <Spacer spaceHeight={5} />
                            <View>
                                <Text style={styles(scales).error_text}>{error}</Text>
                            </View>
                        </>
                    )
                    : null
            }
        </View>
    )
}


//----EXPORT----//
export default TextAreaInput;
