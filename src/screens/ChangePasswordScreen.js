//----IMPORTS----//
//React
import React, { useState, useContext, useEffect } from 'react';
//React native
import { View, KeyboardAvoidingView, ScrollView, } from 'react-native';
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
import { Context as AuthContext } from "../context/AuthContext";
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, Spacer } from "../components/shared";
import { ButtonPrimary } from "../components/buttons";
import { PasswordInput } from "../components/inputs";
import { PasswordChangedModal, NetworkErrorModal } from "../components/modals";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/change-password-screen';
import { app_styles } from '../styles/app_styles';



//----COMPONENT----//
const ChangePasswordScreen = ({ navigation }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);
    const { state: { validationErrors, networkError }, clearValidationErrors, setValidationErrors, clearNetworkError, changePassword, clearAllValidationsErrors } = useContext(AuthContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showPasswordChangedModal, setShowPasswordChangedModal] = useState(false);
    const [formData, setFormData] = useState({
        old_password: null,
        new_password: null,
        password_repeat: null
    });



    //Hooks and Methods
    useEffect(() => {
        const listener = navigation.addListener('didBlur', () => {
            clearAllValidationsErrors()
        });

        return () => {
            listener.remove()
        }
    }, []);

    const handleInputs = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }


    const formSubmit = async () => {
        try {
            setIsDataLoading(true)
            if (hasEmptyFields(formData)) {
                setIsDataLoading(false);
                return;
            }

            if (!passwordsMatch()) {
                setIsDataLoading(false);
                return;
            }

            let form = new FormData();
            for (let key in formData) {
                form.append([key], formData[key])
            }

            await changePassword(form);
            setIsDataLoading(false)
            setShowPasswordChangedModal(true)
        } catch (error) {
            setIsDataLoading(false);
            setFormData({ ...formData, old_password: null });
        }
    }

    

    const handlePasswordChangedModalClosing = () => {
        setShowPasswordChangedModal(false);
        navigation.goBack();
    }


    const passwordsMatch = () => {
        if (formData.new_password !== formData.password_repeat) {
            setValidationErrors({
                password_repeat: translator.translate(language, "Паролі не співпадають!")
            })
            return false;
        }
        return true;
    }


    const hasEmptyFields = (data) => {
        let errors = {};
        for (let key in data) {
            if (!data[key]) {
                errors[key] = translator.translate(language, "Поле не може бути порожнім!")
            };
        }
        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return true;
        }
        return false;
    }



    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
                <SafeView>
                    <Header
                        title={translator.translate(language, "Зміна пароля")}
                        backAllowed
                        navigation={navigation}
                        noIcons
                    />
                    <View style={styles(scales).body}>
                        {
                            !networkError
                                ? (
                                    <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps={'always'}>
                                        <Block>
                                            <Spacer spaceHeight={15} />
                                            <View style={styles(scales).logo_container}>
                                                <IcoMoonIcon
                                                    name={"logo"}
                                                    size={Math.round(scales.widthScale * 75)}
                                                    color={app_styles(scales).colors.app.black}
                                                />
                                            </View>
                                            <Spacer spaceHeight={45} />
                                            <PasswordInput
                                                callback={handleInputs}
                                                placeholder={translator.translate(language, "Пароль")}
                                                clearError={clearValidationErrors}
                                                value={formData.old_password}
                                                name="old_password"
                                                error={validationErrors.old_password}
                                            />
                                            <Spacer spaceHeight={25} />
                                            <PasswordInput
                                                callback={handleInputs}
                                                placeholder={translator.translate(language, "Новий пароль")}
                                                clearError={clearValidationErrors}
                                                value={formData.new_password}
                                                name="new_password"
                                                error={validationErrors.new_password}
                                            />
                                            <Spacer spaceHeight={25} />
                                            <PasswordInput
                                                callback={handleInputs}
                                                placeholder={translator.translate(language, "Підтвердіть новий пароль")}
                                                clearError={clearValidationErrors}
                                                value={formData.password_repeat}
                                                error={validationErrors.password_repeat}
                                                name="password_repeat"
                                            />
                                            <Spacer spaceHeight={30} />
                                            <ButtonPrimary
                                                title={translator.translate(language, "Змінити пароль")}
                                                color={app_styles(scales).colors.app.orange}
                                                isDataLoading={isDataLoading}
                                                callback={formSubmit}
                                            />
                                        </Block>
                                    </ScrollView>
                                )
                                : <NetworkErrorModal
                                    isOpened={networkError}
                                    closeCallback={clearNetworkError}
                                />
                        }
                    </View>
                </SafeView>
            </KeyboardAvoidingView>
            {/* Modal */}
            <PasswordChangedModal
                isOpened={showPasswordChangedModal}
                closeCallback={handlePasswordChangedModalClosing}
            />
        </>

    );
}



//----EXPORT----//
export default ChangePasswordScreen;