//----IMPORTS----//
//React
import React, { useContext, useState } from 'react';
//React native
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { Spacer } from '../shared';
//Styles
import styles from "../../styles/components/inputs/password-input";
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const PasswordInput = ({ value, placeholder, error, clearError, callback, name }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);
    const [secured, setSecured] = useState(true);
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
                    secureTextEntry={secured}
                    onBlur={() => setIsFocused(false)}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles(scales).secure_button_container, { borderBottomWidth: Math.round(scales.widthScale * 1), borderBottomColor: isFocused ? app_styles(scales).colors.app.blue : app_styles(scales).colors.text.light_grey }]}
                    onPress={() => setSecured(!secured)}
                >
                    <IcoMoonIcon
                        name={secured ? 'crossed-eye' : 'eye'}
                        color={isFocused ? app_styles(scales).colors.app.blue : app_styles(scales).colors.text.light_grey}
                        size={Math.round(scales.widthScale * 20)}
                    />
                </TouchableOpacity>
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
export default PasswordInput;
