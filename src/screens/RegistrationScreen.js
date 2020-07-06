//----IMPORTS----//
//React
import React, { useEffect, useState, useContext } from 'react';
//React native
import { View, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
import { Context as AuthContext } from "../context/AuthContext";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, Spacer } from "../components/shared";
import { ButtonPrimary } from "../components/buttons";
import { PhoneInput, PasswordInput, SimpleInput, PromoInput } from "../components/inputs";
import { NetworkErrorModal } from "../components/modals";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/registration-screen';
import { app_styles } from '../styles/app_styles';



//----COMPONENT----//
const RegistrationScreen = ({ navigation }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const { state: { validationErrors, customerData, networkError }, clearValidationErrors, setCustomerData, registerUser, setValidationErrors, clearNetworkError, clearAllValidationsErrors } = useContext(AuthContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [phone, setPhone] = useState(null);


    //Hooks and Methods
    useEffect(() => {
        setPhone(customerData.phone);

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
                setCustomerPhone(null)
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
        setCustomerData('phone', value)
    }

    const submitForm = async () => {
        try {
            setIsDataLoading(true)
            let newUserData = JSON.parse(JSON.stringify(customerData));

            let formData = {
                phone: newUserData.phone,
                password: newUserData.password,
                email: newUserData.email,
                // ref_promo_code: newUserData.promo_code
            }

            if (hasEmptyFields(formData, ['ref_promo_code'])) {
                setIsLoginProcess(false)
                return;
            }

            formData.phone = newUserData.phone.replace(/\s/g, '');

            let form = new FormData();
            for (let key in formData) {
                form.append(key, formData[key])
            }
            await registerUser(form);
            setIsDataLoading(false);
        } catch (error) {
            setIsDataLoading(false);
        }
    }

    /*Validation on empty fields*/
    const hasEmptyFields = (data, notRequired) => {
        let errors = {};
        for (let key in data) {
            if (notRequired.includes(key)) continue;
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




    //Template
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <SafeView>
                <Header
                    backAllowed
                    navigation={navigation}
                    title={translator.translate(language, "Реєстрація")}
                    noIcons
                />
                <View style={styles(scales).body}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps={'always'}>
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
                                            error={validationErrors.phone}
                                            name="phone"
                                            placeholder={translator.translate(language, "Телефон")}
                                        />
                                        <Spacer spaceHeight={25} />
                                        <PasswordInput
                                            callback={setCustomerData}
                                            placeholder={translator.translate(language, "Пароль")}
                                            clearError={clearValidationErrors}
                                            value={customerData.password}
                                            error={validationErrors.password}
                                            name="password"
                                        />
                                        <Spacer spaceHeight={25} />
                                        <SimpleInput
                                            callback={setCustomerData}
                                            placeholder={translator.translate(language, "Електронна пошта")}
                                            clearError={clearValidationErrors}
                                            value={customerData.email}
                                            error={validationErrors.email}
                                            name="email"
                                        />
                                        <Spacer spaceHeight={30} />
                                        <ButtonPrimary
                                            title={translator.translate(language, "Зареєструватися")}
                                            color={app_styles(scales).colors.app.blue}
                                            isDataLoading={isDataLoading}
                                            callback={submitForm}
                                        />
                                    </Block>
                                )
                                : <NetworkErrorModal
                                    isOpened={networkError}
                                    closeCallback={clearNetworkError}
                                />
                        }
                    </ScrollView>
                </View>
            </SafeView>
        </KeyboardAvoidingView>
    );
}



//----EXPORT----//
export default RegistrationScreen;