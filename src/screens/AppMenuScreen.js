//----IMPORTS----//
//React
import React, {useContext} from 'react';
//React native
import {View, Text} from 'react-native';
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as AuthContext} from "../context/AuthContext";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//Componetns
import Header from "../components/shared/Header";
import {SafeView, Block, Spacer, VerticalSpacer} from "../components/shared";
import {ButtonSimpleLink} from "../components/buttons";
import UserInfoBlock from "../components/auth/UserInfoBlock";
import LanguageSwitchersBlock from "../components/shared/LanguageSwitchersBlock";
import {NetworkErrorModal} from "../components/modals"
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/app-menu-screen';
import {app_styles} from "../styles/app_styles";


//----COMPONENT----//
const AppMenuScreen = ({navigation}) => {
    //Data and State
    const {state: {language, scales}} = useContext(AppSettingsContext);
    const {state: {isLoggedIn, unreadNotifications, networkError}, logout, getUserNotifications, clearNetworkError} = useContext(AuthContext);


    //Template
    return (
        <>
            <SafeView>
                <NavigationEvents
                    onWillFocus={() => getUserNotifications()}
                />
                <Header
                    appMenu
                    backAllowed
                    navigation={navigation}
                    noIcons
                />
                <View style={styles(scales).body}>
                    {
                        !networkError
                            ? (
                                <>
                                    <Spacer spaceHeight={30}/>
                                    {/* User Info Block */}
                                    <Block>
                                        <UserInfoBlock navigation={navigation}/>
                                    </Block>

                                    <View style={[styles(scales).content_container, {
                                        justifyContent: isLoggedIn ? 'center' : 'flex-start',
                                        paddingTop: isLoggedIn ? 0 : Math.round(scales.heightScale * 60)
                                    }]}>
                                        <Block>
                                            {/* Menu List */}
                                            <View style={styles(scales).menu_li}>
                                                {
                                                    isLoggedIn
                                                        ?
                                                        (
                                                            <>
                                                                <Spacer spaceHeight={10}/>
                                                                <ButtonSimpleLink
                                                                    title={translator.translate(language, "Історія замовлень")}
                                                                    callback={() => navigation.navigate('OrdersHistory')}
                                                                    medium
                                                                    nounderline
                                                                />
                                                                <Spacer spaceHeight={10}/>
                                                                <ButtonSimpleLink
                                                                    title={translator.translate(language, "Повідомлення")}
                                                                    callback={() => navigation.navigate('Notifications')}
                                                                    medium
                                                                    nounderline
                                                                    unreadNotifications={unreadNotifications}
                                                                />
                                                            </>
                                                        )
                                                        : null
                                                }
                                                <Spacer spaceHeight={10}/>
                                                <ButtonSimpleLink
                                                    title={translator.translate(language, "Новини")}
                                                    callback={() => navigation.navigate('News')}
                                                    medium
                                                    nounderline
                                                />
                                                <Spacer spaceHeight={10}/>
                                                <ButtonSimpleLink
                                                    title={translator.translate(language, "Про Emma Pizza")}
                                                    callback={() => navigation.navigate('Restaurant')}
                                                    medium
                                                    nounderline
                                                />
                                                <Spacer spaceHeight={10}/>
                                                <ButtonSimpleLink
                                                    title={translator.translate(language, "Положення і умови")}
                                                    callback={() => navigation.navigate('TermsAndConditions')}
                                                    medium
                                                    nounderline
                                                />
                                                <Spacer spaceHeight={10}/>
                                                <ButtonSimpleLink
                                                    title={translator.translate(language, "Контакти")}
                                                    callback={() => navigation.navigate('Contacts')}
                                                    medium
                                                    nounderline
                                                />
                                                <Spacer spaceHeight={30}/>
                                                {
                                                    isLoggedIn
                                                        ? <ButtonSimpleLink
                                                            title={translator.translate(language, "Вихід")}
                                                            callback={logout}
                                                            medium
                                                            nounderline
                                                        />
                                                        : null
                                                }
                                            </View>
                                        </Block>
                                    </View>

                                    {/* Language switcher */}
                                    <View style={styles(scales).language_switcher}>
                                        {/*<Block>*/}
                                            <LanguageSwitchersBlock/>
                                        {/*</Block>*/}
                                    </View>
                                    <View style={app_styles(scales).row_center}>
                                        <Text
                                            style={styles(scales).made}>{translator.translate(language, 'Розроблено в')}</Text>
                                        <VerticalSpacer spaceWidth={8}/>
                                        <IcoMoonIcon
                                            style={styles(scales).icon_devseonet}
                                            color={app_styles(scales).colors.text.light_grey}
                                            size={Math.round(scales.widthScale * 24)}
                                            name="devseonet"
                                        />
                                    </View>
                                    <Spacer spaceHeight={10}/>
                                </>
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
export default AppMenuScreen;
