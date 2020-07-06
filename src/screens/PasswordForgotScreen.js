//----IMPORTS----//
//React
import React, { useEffect, useState, useContext } from 'react';
//React native
import { View } from 'react-native';
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
import { SimpleInput } from "../components/inputs";
import { PasswordResetModal, NetworkErrorModal } from "../components/modals";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/password-forgot-screen';
import { app_styles } from '../styles/app_styles';



//----COMPONENT----//
const PasswordForgotScreen = ({ navigation }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const { state: { validationErrors, networkError, user }, clearValidationErrors, requestPasswordReset, setValidationErrors, clearNetworkError, clearAllValidationsErrors } = useContext(AuthContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: null,
        type: 'code'
    });
    const [showPasswordChangedModal, setShowPasswordChangedModal] = useState(false);



    //Hooks and Methods
    useEffect(() => {
        if (user.email) {
            setFormData({ ...formData, email: user.email });
        }

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


    const submitForm = async () => {
        try {
            if (!formData.email) {
                setValidationErrors({ email: translator.translate(language, "Поле не може бути порожнім!") });
                return;
            }
            setIsDataLoading(true);

            let form = new FormData();
            for (let key in formData) {
                form.append([key], formData[key])
            }

            await requestPasswordReset(form);

            setIsDataLoading(false);
            setShowPasswordChangedModal(true);          
        } catch (error) {
            setIsDataLoading(false);
        }
    }



    const handlePasswordChangedModalClosing = () => {
        setShowPasswordChangedModal(false);
        navigation.navigate('LogIn');
    }




    //Template
    return (
        <>
            <SafeView>
                <Header
                    backAllowed
                    navigation={navigation}
                    title={translator.translate(language, "Відновлення пароля")}
                    noIcons
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
                                    <Spacer spaceHeight={120} />
                                    <SimpleInput
                                        callback={handleInputs}
                                        error={validationErrors.email}
                                        placeholder={translator.translate(language, "Електронна пошта")}
                                        clearError={clearValidationErrors}
                                        value={formData.email}
                                        name="email"
                                    />
                                    <Spacer spaceHeight={30} />
                                    <ButtonPrimary
                                        title={translator.translate(language, "Відправити")}
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
                </View>

                {/* Modal */}
                <PasswordResetModal
                    isOpened={showPasswordChangedModal}
                    closeCallback={handlePasswordChangedModalClosing}
                />
            </SafeView>
        </>
    );
}



//----EXPORT----//
export default PasswordForgotScreen;