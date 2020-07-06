//----IMPORTS----//
//React
import React, { useEffect, useState, useContext } from 'react';
//React native
import { View, Image, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
import { Context as AuthContext } from "../context/AuthContext";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Moment
import moment from "moment";
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, Spacer } from "../components/shared";
import { SimpleInput, PhoneInput, DatePikerInput } from "../components/inputs";
import { ButtonSimpleLink, ButtonPrimary } from "../components/buttons";
import { NetworkErrorModal } from "../components/modals";
//Global vars
import { AVATAR_BASE_URL } from "../different/global_vars";
//Helpers
import { checkIfDate } from "../helpers/helpers";
//Expo
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/profile-edit-screen';
import { app_styles } from '../styles/app_styles';


//----COMPONENT----//
const ProfileEditScreen = ({ navigation }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);
    const { state: { user, isLoggedIn, networkError, validationErrors }, clearValidationErrors, clearNetworkError, updateProfile, setValidationErrors, clearAllValidationsErrors } = useContext(AuthContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [newUserAvatar, setNewUserAvatar] = useState(null);


    //Hooks and Methods
    useEffect(() => {
        if (!Object.keys(userInfo).length) {            
            let userCopy = JSON.parse(JSON.stringify(user))
            if (userCopy.phone) {
                userCopy.phone = reformatUserPhone(userCopy.phone);
            }
            if (userCopy.birth_date) {
                userCopy.birth_date = checkIfDate(userCopy.birth_date) ? userCopy.birth_date : null
            } 
            
            setUserInfo(userCopy);  
        }
        const listener = navigation.addListener('didBlur', () => {
            clearAllValidationsErrors()
        });

        return () => {
            listener.remove()
        }
    }, []);





    const handleUserInfoChanges = (prop, value) => {
        setUserInfo({ ...userInfo, [prop]: value });
    }

    /*Customer input handler*/
    const handlePhoneInput = (value) => {
        autocompletePhone(value)
    }

    /*For formating phone number according to design*/
    const autocompletePhone = (value) => {
        if (value !== null && value.length <= 5) {
            setUserInfo({ ...userInfo, phone: "+380 " });
        } else {
            if (value === null) {
                setUserInfo({ ...userInfo, phone: null });
                return;
            }
            if (value.length <= 17) {
                refactorCurrentPhoneValue(value, [7, 11, 14], " ");
            } else if (value.length > 17) {
                refactorCurrentPhoneValue(value, [7, 11, 14], " ");
                let phoneNumber = userInfo.phone.substring(0, 17);
                setUserInfo({ ...userInfo, phone: phoneNumber });
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
                let phoneNumber = userInfo.phone.substring(0, charPositions[i]) + symbol + userInfo.phone.substring(charPositions[i]) + value.substr(-1, 1);
                setUserInfo({ ...userInfo, phone: phoneNumber });
                return;
            } else {
                setUserInfo({ ...userInfo, phone: value });
            }
        }
    }

    //Upload photo
    const uploadPhoto = async () => {
        if (validationErrors.avatar) {
            validationErrors.avatar = null;
        }

        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== "granted") {
                let message = translator.translate(language, "Для використання даної опції, нам потрібні дозволи для доступу до камери");
                Alert.alert(translator.translate(language, "Увага!"), message);
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                    base64: true
                });

                if (!result.cancelled) {
                    setNewUserAvatar(result.uri)
                }
            }
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                base64: true
            });

            if (!result.cancelled) {
                setNewUserAvatar(result.uri)
            }
        }

    }

    const formSubmit = async () => {
        try {
            setIsDataLoading(true)

            let necessaryFields = {
                phone: userInfo.phone,
                email: userInfo.email
            }

            if (hasEmptyFields(necessaryFields)) {
                setIsDataLoading(false);
                return;
            }

            let data = new FormData();
                data.append('email', userInfo.email)
                data.append('name', userInfo.name);

            if (userInfo.birth_date && isNaN(userInfo.birth_date)) {
                let birthday = transformDateToUnixTime(userInfo.birth_date)
                data.append('birth_date', birthday);
            } else {
                if(userInfo.birth_date){
                    data.append('birth_date', userInfo.birth_date);
                }
            }

            if (userInfo.phone) {
                let cleanedPhone = userInfo.phone.replace(/\s/g, '');
                data.append('phone', cleanedPhone);
            }

            if (newUserAvatar) {
                let localImageUri = newUserAvatar;
                let filename = localImageUri.split("/").pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                data.append("avatarFile", {
                    uri: localImageUri,
                    name: filename,
                    type
                });
            }

            await updateProfile(data)
            setIsDataLoading(false)
        } catch (error) {
            setIsDataLoading(false)
        }
    }

    const reformatUserPhone = (value) => {
        let cleanedPhone = value.replace(/[^0-9]+/g, '');
        let formatedNumber = "+" + cleanedPhone.substring(0, 3) + " " + cleanedPhone.substring(3, 5) + " " + cleanedPhone.substring(5, 8) + " " + cleanedPhone.substring(8, 10) + " " + cleanedPhone.substring(10, 12);
        return formatedNumber;
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

    const transformDateToUnixTime = (date) => {
        moment.locale("uk");
        let unixTime = (moment(date, "YYYY-MM-DD").valueOf()) / 1000;
        return unixTime;
    }

    const userHasDefaultAvatar = () => {
        return userInfo.avatar && userInfo.avatar.includes('placeholder.png');
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <SafeView>
                <Header
                    backAllowed
                    navigation={navigation}
                    title={translator.translate(language, "Профіль")}
                    noIcons
                />
                <View style={styles(scales).body}>
                    {
                        !networkError
                            ? (
                                <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps={'always'}>
                                    <Spacer spaceHeight={15} />
                                    {/* User Avatar Block */}
                                    <Block>
                                        <View style={app_styles(scales).row_start}>
                                            {
                                                (userInfo.avatar && !userHasDefaultAvatar()) || newUserAvatar
                                                    ? <Image
                                                        source={{ uri:  newUserAvatar || userInfo.avatar }}
                                                        style={styles(scales).avatar}
                                                    />
                                                    : (
                                                        <View style={styles(scales).avatar_container}>
                                                            <IcoMoonIcon name="user" color={isLoggedIn ? app_styles(scales).colors.app.blue : app_styles(scales).app_grey} size={Math.round(scales.widthScale * 30)} />
                                                        </View>
                                                    )
                                            }
                                            <ButtonSimpleLink
                                                medium
                                                nounderline
                                                callback={() => uploadPhoto()}
                                                title={user.avatar ? translator.translate(language, "Змінити фото") : translator.translate(language, "Додати фото")}
                                            />
                                        </View>
                                        {/* Form Block */}
                                        <Spacer spaceHeight={30} />
                                        <SimpleInput
                                            callback={handleUserInfoChanges}
                                            placeholder={translator.translate(language, "Ім'я")}
                                            clearError={clearValidationErrors}
                                            value={userInfo.name || null}
                                            name="name"
                                            error={validationErrors.name}
                                        />
                                        <Spacer spaceHeight={25} />
                                        <PhoneInput
                                            callback={handlePhoneInput}
                                            clearError={clearValidationErrors}
                                            value={userInfo.phone}
                                            name="phone"
                                            placeholder={translator.translate(language, "Телефон")}
                                            error={validationErrors.phone}
                                        />
                                        <Spacer spaceHeight={25} />
                                        <DatePikerInput
                                            placeholder={translator.translate(language, "Дата народження")}
                                            name="birth_date"
                                            callback={handleUserInfoChanges}
                                            clearError={clearValidationErrors}
                                            currentValue={userInfo.birth_date}
                                            error={validationErrors.birth_date}
                                        />
                                        <Spacer spaceHeight={25} />
                                        <SimpleInput
                                            callback={handleUserInfoChanges}
                                            placeholder="Email"
                                            clearError={clearValidationErrors}
                                            value={userInfo.email || null}
                                            name="email"
                                            error={validationErrors.email}
                                        />
                                        <Spacer spaceHeight={40} />
                                        {
                                            !user.facebook_id
                                                ? (
                                                    <>
                                                        <ButtonSimpleLink
                                                            medium
                                                            nounderline
                                                            callback={() => navigation.navigate('ChangePassword')}
                                                            title={translator.translate(language, "Змінити пароль")}
                                                        />
                                                        <Spacer spaceHeight={40}/>
                                                    </>
                                                )
                                                : null
                                        }
                                        <ButtonPrimary
                                            color={app_styles(scales).colors.app.blue}
                                            callback={formSubmit}
                                            title={translator.translate(language, "Зберегти")}
                                            isDataLoading={isDataLoading}
                                        />
                                        <Spacer spaceHeight={30} />
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
    );
}



//----EXPORT----//
export default ProfileEditScreen;