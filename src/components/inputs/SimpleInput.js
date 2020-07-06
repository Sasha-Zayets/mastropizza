//----IMPORTS----//
//React
import React, { useContext, useState, useEffect } from 'react';
//React native
import { Text, View, TextInput } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { Spacer } from '../shared';
//Styles
import styles from "../../styles/components/inputs/simple-input";
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const SimpleInput = ({ value, placeholder, error, clearError, callback, name, number }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);
    const [isFocused, setIsFocused] = useState(false);


    //Hooks and Methods
    const arrangeFocus = () => {
        clearError(name);
        setIsFocused(true);
    }

    const handleInput = (value) => {
        callback(name, value)
    }

    

    //Template
    return (
        <View style={styles(scales).main_container}>
            <View style={styles(scales).input_container}>
                <TextInput
                    style={[styles(scales).input, { borderBottomWidth: Math.round(scales.widthScale * 1), borderBottomColor: isFocused ? app_styles(scales).colors.app.blue : app_styles(scales).colors.text.light_grey }]}
                    placeholderTextColor={app_styles(scales).colors.text.light_grey}
                    placeholder={placeholder}
                    autocapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => handleInput(value)}
                    value={value}
                    onFocus={arrangeFocus}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={number ? "phone-pad" : "default"}
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
export default SimpleInput;
