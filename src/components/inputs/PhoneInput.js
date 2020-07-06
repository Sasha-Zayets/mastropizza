//----IMPORTS----//
//React
import React, { useContext, useState} from 'react';
//React native
import { Text, View, TextInput } from 'react-native';
//Components
import { Spacer } from '../shared';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/inputs/phone-input";
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const PhoneInput = ({ value, placeholder, error, clearError, callback, name }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);
    const [isFocused, setIsFocused] = useState(false);

    //Hooks and Methods
    const arrangeFocus = () => {
        clearError(name);
        setIsFocused(true);
        if (!value) {
            handleInput("+380")
        }
    }


    const handleBlur = () => {
        setIsFocused(false);
        if (value.length < 6) {
            callback(null)
        }
    }


    const handleInput = (value) => {
        callback(value)
    }


    //Template
    return (
        <>
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
                    onBlur={handleBlur}
                    keyboardType="phone-pad"
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
        </>
    )
}


//----EXPORT----//
export default PhoneInput;
