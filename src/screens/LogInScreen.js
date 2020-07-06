//----IMPORTS----//
//React
import React, { useEffect, useState, useContext } from 'react';
//React native
import { View, Alert, Image } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
import { Context as AuthContext } from "../context/AuthContext";
//Expo
import * as Facebook from 'expo-facebook';
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, Spacer } from "../components/shared";
import { ButtonPrimary, ButtonFacebook, ButtonSimpleLink } from "../components/buttons";
import { PhoneInput, PasswordInput } from "../components/inputs";
import { NetworkErrorModal } from "../components/modals";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/log-in-screen';
import { app_styles } from '../styles/app_styles';



//----COMPONENT----//
const LogInScreen = ({ navigation }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);
    const { state: { validationErrors, networkError }, clearValidationErrors, setCustomerData, setValidationErrors, clearNetworkError, login, facebookLogin, clearAllValidationsErrors } = useContext(AuthContext);
    const [isLoginProcess, setIsLoginProcess] = useState(false);
    const [isFacebookLoginProcess, setIsFacebookLoginProcess] = useState(false);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);


    //Hooks and Methods
    useEffect(() => {

        return () => {
            clearAllValidationsErrors()
        }
    }, []);


    /*Customer input handler*/
    const handlePhoneInput = (value) => {
        autocompletePhone(value)
    }


    /*For formating phone number according to design*/
    const autocompletePhone = (value) => {
        if (value !== null && value.length <= 5) {
            setCustomerPhone("+380 ");
        } else {
            if (value === null) {
                setCustomerPhone(null);
                return;
            }
            if (value.length <= 17) {
                refactorCurrentPhoneValue(value, [7, 11, 14], " ");
            } else if (value.length > 17) {
                refactorCurrentPhoneValue(value, [7, 11, 14], " ");
                let phoneNumber = phone.substring(0, 17);
                setCustomerPhone(phoneNumber);
            }
        }
    }

    /*Used in handlePhoneInput method*/
    const refactorCurrentPhoneValue = (value, charPositions, symbol) => {
        let splitedVal = value.split("");

        for (let i = 0; i < charPositions.length; i++) {
            if (
                splitedVal[charPositions[i]] &&
                splitedVal[charPositions[i]] !== symbol
            ) {
                let phoneNumber = phone.substring(0, charPositions[i]) + symbol + phone.substring(charPositions[i]) + value.substr(-1, 1);
                setCustomerPhone(phoneNumber);
                return;
            } else {
                setCustomerPhone(value);
            }
        }
    }

    /*For avoiding code dublication*/
    const setCustomerPhone = (value) => {
        setPhone(value);
    }

    const handlePasswordInput = (name, value) => {
        setPassword(value);
    }

    const submitForm = async () => {
        try {
            setIsLoginProcess(true)
            let formData = {
                phone,
                password
            }

            if (hasEmptyFields(formData)) {
                setIsLoginProcess(false)
                return;
            }

            let cleanedPhone = phone.replace(/\s/g, '');
            let form = new FormData();
            form.append('phone', cleanedPhone);
            form.append('password', password);

            await login(form);
            setIsLoginProcess(false);
        } catch (error) {
            setIsLoginProcess(false);
        }
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

    //Facebook login
    const loginWithFacebook = async () => {
        setIsFacebookLoginProcess(true)
        try {
            await Facebook.initializeAsync("668596570367881");

            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync("668596570367881", {
                permissions: ["public_profile", "email"]
            });
            if (type === "success") {
                try {
                    let form = new FormData();
                    form.append('token', token);
                    await facebookLogin(form)
                } catch (error) {
                    Alert.alert("Помилка!", "Помилка авторизації через Facebook");
                }
            } else {
                Alert.alert("Помилка!", "Помилка авторизації через Facebook");
            }
        } catch ({ message }) {
            Alert.alert("Помилка!", `Помилка авторизації через Facebook ${message}`);
        } finally {
            setIsFacebookLoginProcess(false)
        }
    }





    //Template
    return (
        <>
            <SafeView>
                <Header
                    title={translator.translate(language, "Вхід")}
                    backAllowed
                    navigation={navigation}
                    noIcons
                    appMenu
                />
                <View style={styles(scales).body}>
                    {
                        !networkError
                            ? (
                                <Block>
                                    <Spacer spaceHeight={15} />
                                    <View style={styles(scales).logo_container}>
                                        <IcoMoonIcon
                                            name={"logo_emma"}
                                            size={Math.round(scales.widthScale * 75)}
                                            color={app_styles(scales).colors.app.blue}
                                        />
                                    </View>
                                    <Spacer spaceHeight={45} />
                                    <PhoneInput
                                        callback={handlePhoneInput}
                                        clearError={clearValidationErrors}
                                        value={phone}
                                        name="phone"
                                        error={validationErrors.phone}
                                        placeholder={translator.translate(language, "Телефон")}
                                    />
                                    <Spacer spaceHeight={25} />
                                    <PasswordInput
                                        callback={handlePasswordInput}
                                        placeholder={translator.translate(language, "Пароль")}
                                        clearError={clearValidationErrors}
                                        value={password}
                                        error={validationErrors.password}
                                        name="password"
                                    />
                                    <Spacer spaceHeight={30} />
                                    <ButtonPrimary
                                        title={translator.translate(language, "Увійти")}
                                        color={app_styles(scales).colors.app.blue}
                                        isDataLoading={isLoginProcess}
                                        callback={submitForm}
                                    />
                                    <Spacer spaceHeight={20} />
                                    <ButtonFacebook
                                        title={translator.translate(language, "Вхід через Facebook")}
                                        color="#4167B2"
                                        isDataLoading={isFacebookLoginProcess}
                                        callback={loginWithFacebook}
                                    />
                                    <Spacer spaceHeight={60} />
                                    <View style={styles(scales).links_container}>
                                        <ButtonSimpleLink
                                            title={translator.translate(language, "Зареєструватися")}
                                            callback={() => navigation.navigate('Registration')}
                                        />
                                        <Spacer spaceHeight={20} />
                                        <ButtonSimpleLink
                                            title={translator.translate(language, "Забули пароль?")}
                                            callback={() => navigation.navigate('PasswordForgot')}
                                        />
                                    </View>
                                </Block>
                            )
                            : <NetworkErrorModal
                                isOpened={networkError}
                                closeCallback={clearNetworkError}
                            />
                    }
                </View>
            </SafeView>
        </>
    );
}



//----EXPORT----//
export default LogInScreen;