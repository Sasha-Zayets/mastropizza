//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text, Image, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
import { Context as AuthContext } from "../../context/AuthContext";
//Components
import { Spacer, VerticalSpacer } from "../shared";
import { LoyaltyProgrammModal } from "../modals";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Localization
import translator from "../../translator/translator";
//Styles
import styles from '../../styles/components/auth/user-info-block';
import { app_styles } from '../../styles/app_styles';





//----COMPONENT----//
const UserInfoBlock = ({ navigation }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);
    const { state: { user, isLoggedIn } } = useContext(AuthContext);


    //Hooks and Methods
    const userHasDefaultAvatar = () => {
        return user.avatar && user.avatar.includes('placeholder.png');
    }

    const reformatUserPhone = (value) => {
        let cleanedPhone = value.replace(/[^0-9]+/g, '');
        let formatedNumber = "+" + cleanedPhone.substring(0, 3) + " " + cleanedPhone.substring(3, 5) + " " + cleanedPhone.substring(5, 8) + " " + cleanedPhone.substring(8, 10) + " " + cleanedPhone.substring(10, 12);
        return formatedNumber;
    }


    //Template
    return (
        <>
            <View style={styles(scales).container}>
                {
                    user.avatar && isLoggedIn && !userHasDefaultAvatar()
                        ? <Image
                            source={{ uri: user.avatar }}
                            style={styles(scales).avatar}
                        />
                        : (
                            <View style={styles(scales).avatar_container}>
                                <IcoMoonIcon name="user" color={isLoggedIn ? app_styles(scales).colors.app.blue : app_styles(scales).colors.text.grey} size={Math.round(scales.widthScale * 30)} />
                            </View>
                        )
                }
                <View style={{ flex: 1 }}>
                    {
                        isLoggedIn
                            ? (
                                <View style={styles(scales).info_container}>
                                    <View style={app_styles(scales).row_between}>
                                        <View style={{flex: 1}}>
                                            {
                                                user.name
                                                    ? (
                                                        <View>
                                                            <Text style={styles(scales).user_name}>{user.name}</Text>
                                                        </View>
                                                    )
                                                    : <Text style={styles(scales).no_info}>-</Text>
                                            }
                                            <View>
                                                {
                                                    user.email
                                                    ? <Text style={styles(scales).user_info}>{user.email}</Text>
                                                    : null
                                                }
                                                {
                                                    user.phone 
                                                    ? <Text style={styles(scales).user_info}>{reformatUserPhone(user.phone)}</Text>
                                                    : null
                                                }
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} activeOpacity={.7}>
                                            <IcoMoonIcon name="art-and-design" color={app_styles(scales).colors.text.primary} size={Math.round(scales.widthScale * 18)} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                            : (
                                <View style={styles(scales).info_container}>
                                    <View style={app_styles(scales).row_start}>
                                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')} activeOpacity={.7}>
                                            <Text style={styles(scales).li_text}>{translator.translate(language, "Вхід")}</Text>
                                        </TouchableOpacity>
                                        <VerticalSpacer spaceWidth={8} />
                                        <Text style={styles(scales).li_text_separator}>/</Text>
                                        <VerticalSpacer spaceWidth={8} />
                                        <TouchableOpacity onPress={() => navigation.navigate('Registration')} activeOpacity={.7}>
                                            <Text style={styles(scales).li_text}>{translator.translate(language, "Реєстрація")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Spacer spaceHeight={5} />
                                    <Text style={styles(scales).note}>{translator.translate(language, "Зареєструйтесь або увійдіть для зручності користування додатком")}</Text>
                                </View>
                            )
                    }
                </View>
            </View>
        </>
    );
}



//----EXPORT----//
export default UserInfoBlock