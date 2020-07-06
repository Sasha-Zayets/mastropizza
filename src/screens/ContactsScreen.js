//----IMPORTS----//
//React
import React, {useContext, useState, useEffect} from 'react';
//React native
import {View, ScrollView, Text, Animated, Easing, TouchableOpacity, Linking} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Componetns
import Header from "../components/shared/Header";
import {SafeView, Block, Spacer, DataLoadingIndicator, HorizontalDivider, VerticalSpacer} from "../components/shared";
import {NetworkErrorModal} from "../components/modals";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//Localization
import translator from "../translator/translator";
//Helpers
import {prepareLanguageToHttpRequest, notEmptyString} from "../helpers/helpers";
//Styles
import styles from '../styles/screens/contacts-screen';
import {app_styles} from "../styles/app_styles";


//----COMPONENT----//
const ContactsScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language, emmaPizzaRestaurant, emmaPizzaRestaurantMetaData, settingsNetworkError, screen_width, contacts}, getEmmaPizzaRestaurant, clearSettingsNetworkError} = useContext(AppSettingsContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(Math.round(scales.heightScale * 270)));
    const [extendedCard, setExtendedCard] = useState(false);


    //Hooks and Methods
    const widenPhoto = () => {
        Animated.timing(animatedHeight, {
            toValue: Math.round(scales.widthScale * 110),
            duration: 300,
            easing: Easing.linear
        }).start();
    }


    const shortenPhoto = () => {
        Animated.timing(animatedHeight, {
            toValue: Math.round(scales.widthScale * 270),
            duration: 300,
            easing: Easing.linear
        }).start();
    }


    const toggleHeight = () => {
        if (extendedCard) {
            shortenPhoto();
        } else {
            widenPhoto();
        }
        setExtendedCard(!extendedCard)
    }


    const getArrowPosition = () => {
        return !extendedCard ? "180deg" : "0deg";
    }

    const handleFocus = async () => {
        if (!Object.keys(emmaPizzaRestaurant).length || emmaPizzaRestaurantMetaData.language !== language) {
            await getRestaurant();
        }
    }

    const getRestaurant = async () => {
        setIsDataLoading(true);
        await getEmmaPizzaRestaurant();
        setIsDataLoading(false);
    }

    const makeCall = () => {
        let cleanedPhoneNumber = emmaPizzaRestaurant.phone.replace(/\D||\s/g, "");

        if (cleanedPhoneNumber.indexOf('38') === 0) {
            cleanedPhoneNumber = cleanedPhoneNumber.substring(2);
        }
        const link = Platform.OS === 'ios' ? `tel://+38${cleanedPhoneNumber}` : `tel:+38${cleanedPhoneNumber}`;
        Linking.openURL(link)
    }

    const sendEmail = () => {
        let address = contacts.email;
        if (!notEmptyString(address)) return;
        let link = `mailto: ${contacts.email}`
        return Linking.openURL(link)
    }

    const openMap = () => {
        let link = emmaPizzaRestaurant.gmap;
        return notEmptyString(link) ? Linking.openURL(link.trim()) : false;
    }

    const hasAtLeLeastOneSocial = () => {
        return notEmptyString(emmaPizzaRestaurant.facebook)
            || notEmptyString(emmaPizzaRestaurant.instagram)
            || notEmptyString(emmaPizzaRestaurant.youtube)
            || notEmptyString(emmaPizzaRestaurant.tripadvisor)
    }


    const handleLink = async (link, type) => {
        if (type === 'instagram') {
            let urlParts = link.split('/');
            let username = urlParts[urlParts.length - 1];
            let url = `instagram://user?username=${username}`;
            try {
                await Linking.openURL(url)
            } catch (err) {
                await Linking.openURL(link.trim())
            }
        } else if (type === 'youtube') {
            let urlParts = link.split('/');
            let chanelName = urlParts[urlParts.length - 1];
            let url = `youtube://chanel=${chanelName}`;
            try {
                await Linking.openURL(url)
            } catch (err) {
                await Linking.openURL(link.trim())
            }
        } else {
            await Linking.openURL(link.trim())
        }
    }




    //Template
    return (
        <>
            <SafeView>
                <NavigationEvents
                    onWillFocus={handleFocus}
                />
                <Header
                    backAllowed
                    navigation={navigation}
                    title={translator.translate(language, "Контакти")}
                    noIcons
                />
                <View style={styles(scales).body}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        keyboardShouldPersistTaps={'always'}
                        contentContainerStyle={{paddingBottom: Math.round(scales.heightScale * 20), flexGrow: 1}}
                    >
                        {
                            !isDataLoading
                                ? (
                                    !settingsNetworkError
                                        ? (
                                            <>
                                                {
                                                    Object.keys(emmaPizzaRestaurant).length
                                                        ? (
                                                            <>
                                                                {/* IMAGE */}
                                                                <View style={{paddingBottom: Math.round(scales.widthScale * 25)}}>
                                                                    <HorizontalDivider height={1}
                                                                                       color={app_styles(scales).colors.text.light_grey}/>
                                                                    <Animated.View style={{
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'flex-start',
                                                                        height: animatedHeight,
                                                                    }}>
                                                                        <Animated.Image
                                                                            source={{uri: emmaPizzaRestaurant.image}}
                                                                            style={{
                                                                                width: screen_width,
                                                                                height: animatedHeight,
                                                                                resizeMode: 'cover'
                                                                            }}
                                                                        />
                                                                    </Animated.View>
                                                                    <HorizontalDivider height={1}
                                                                                       color={app_styles(scales).colors.text.light_grey}/>
                                                                    {/* Switcher */}
                                                                    <TouchableOpacity onPress={toggleHeight}
                                                                                      style={styles(scales).toggler_btn}
                                                                                      activeOpacity={.9}>
                                                                        <IcoMoonIcon
                                                                            style={{transform: [{rotate: getArrowPosition()}]}}
                                                                            name="arrow_downward"
                                                                            color={app_styles(scales).colors.text.primary}
                                                                            size={Math.round(scales.widthScale * 18)}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View>
                                                                {/* Contacts */}
                                                                <Block>
                                                                    <View style={app_styles(scales).row_start}>
                                                                        <Text
                                                                            style={styles(scales).title}>{emmaPizzaRestaurant.title}</Text>
                                                                    </View>
                                                                    {
                                                                        notEmptyString(emmaPizzaRestaurant.schedule)
                                                                            ? (
                                                                                <>
                                                                                    <Spacer spaceHeight={14}/>
                                                                                    <View style={app_styles(scales).row_start}>
                                                                                        <View style={styles(scales).icon_container}>
                                                                                            <IcoMoonIcon name="wall-clock"
                                                                                                         color={app_styles(scales).colors.app.light_black}
                                                                                                         size={Math.round(scales.widthScale * 18)}/>
                                                                                        </View>
                                                                                        <View>
                                                                                            <Text
                                                                                                style={styles(scales).text}>{emmaPizzaRestaurant.schedule}</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </>
                                                                            )
                                                                            : null
                                                                    }
                                                                    {
                                                                        notEmptyString(emmaPizzaRestaurant.address)
                                                                            ? (
                                                                                <>
                                                                                    <Spacer spaceHeight={14}/>
                                                                                    <View style={app_styles(scales).row_start}>
                                                                                        <View style={styles(scales).icon_container}>
                                                                                            <IcoMoonIcon name="pin"
                                                                                                         color={app_styles(scales).colors.app.light_black}
                                                                                                         size={Math.round(scales.widthScale * 19)}/>
                                                                                        </View>
                                                                                        <TouchableOpacity onPress={openMap}
                                                                                                          activeOpacity={.7}>
                                                                                            <Text
                                                                                                style={styles(scales).text}>{emmaPizzaRestaurant.address}</Text>
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </>
                                                                            )
                                                                            : null
                                                                    }
                                                                    {
                                                                        notEmptyString(emmaPizzaRestaurant.phone)
                                                                            ? (
                                                                                <>
                                                                                    <Spacer spaceHeight={14}/>
                                                                                    <View style={app_styles(scales).row_start}>
                                                                                        <View style={styles(scales).icon_container}>
                                                                                            <IcoMoonIcon name="phone-alt"
                                                                                                         color={app_styles(scales).colors.app.light_black}
                                                                                                         size={Math.round(scales.widthScale * 18)}/>
                                                                                        </View>
                                                                                        <TouchableOpacity onPress={makeCall}
                                                                                                          activeOpacity={.7}>
                                                                                            <Text
                                                                                                style={styles(scales).text}>{emmaPizzaRestaurant.phone}</Text>
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </>
                                                                            )
                                                                            : null
                                                                    }
                                                                    {
                                                                        notEmptyString(contacts.email)
                                                                            ? (
                                                                                <>
                                                                                    <Spacer spaceHeight={14}/>
                                                                                    <View style={app_styles(scales).row_start}>
                                                                                        <View style={styles(scales).icon_container}>
                                                                                            <IcoMoonIcon name="envelope"
                                                                                                         color={app_styles(scales).colors.app.light_black}
                                                                                                         size={Math.round(scales.widthScale * 18)}/>
                                                                                        </View>
                                                                                        <TouchableOpacity onPress={sendEmail}
                                                                                                          activeOpacity={.7}>
                                                                                            <Text
                                                                                                style={styles(scales).text}>{contacts.email}</Text>
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </>
                                                                            )
                                                                            : null
                                                                    }
                                                                    {
                                                                        hasAtLeLeastOneSocial()
                                                                            ? (
                                                                                <>
                                                                                    <Spacer spaceHeight={30}/>
                                                                                    <View style={app_styles(scales).row_start}>
                                                                                        <Text
                                                                                            style={styles(scales).sub_title}>{translator.translate(language, 'Ми в соц. мережах')}</Text>
                                                                                    </View>
                                                                                    <Spacer spaceHeight={10}/>
                                                                                    <View style={app_styles(scales).row_start}>
                                                                                        {
                                                                                            notEmptyString(emmaPizzaRestaurant.facebook)
                                                                                                ? (
                                                                                                    <>
                                                                                                        <TouchableOpacity
                                                                                                            style={styles(scales).social_btn}
                                                                                                            onPress={() => handleLink(emmaPizzaRestaurant.facebook, 'facebook')}
                                                                                                            activeOpacity={.8}
                                                                                                        >
                                                                                                            <IcoMoonIcon
                                                                                                                name="facebook-app-logo"
                                                                                                                color={app_styles(scales).colors.text.grey}
                                                                                                                size={30}
                                                                                                            />
                                                                                                        </TouchableOpacity>
                                                                                                        <VerticalSpacer spaceWidth={12} />
                                                                                                    </>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            notEmptyString(emmaPizzaRestaurant.instagram)
                                                                                                ? (
                                                                                                    <>
                                                                                                        <TouchableOpacity
                                                                                                            style={styles(scales).social_btn}
                                                                                                            onPress={() => handleLink(emmaPizzaRestaurant.instagram, 'inastagram')}
                                                                                                            activeOpacity={.8}
                                                                                                        >
                                                                                                            <IcoMoonIcon
                                                                                                                name="social-media"
                                                                                                                color={app_styles(scales).colors.text.grey}
                                                                                                                size={30}
                                                                                                            />
                                                                                                        </TouchableOpacity>
                                                                                                        <VerticalSpacer spaceWidth={12} />
                                                                                                    </>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            notEmptyString(emmaPizzaRestaurant.youtube)
                                                                                                ? (
                                                                                                    <>
                                                                                                        <TouchableOpacity
                                                                                                            style={styles(scales).social_btn}
                                                                                                            onPress={() => handleLink(emmaPizzaRestaurant.youtube, 'youtube')}
                                                                                                            activeOpacity={.8}
                                                                                                        >
                                                                                                            <IcoMoonIcon
                                                                                                                name="youtube"
                                                                                                                color={app_styles(scales).colors.text.grey}
                                                                                                                size={30}
                                                                                                            />
                                                                                                        </TouchableOpacity>
                                                                                                        <VerticalSpacer spaceWidth={12} />
                                                                                                    </>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            notEmptyString(emmaPizzaRestaurant.tripadvisor)
                                                                                                ? (
                                                                                                    <>
                                                                                                        <TouchableOpacity
                                                                                                            style={styles(scales).social_btn}
                                                                                                            onPress={() => handleLink(emmaPizzaRestaurant.tripadvisor, 'tripadvisor')}
                                                                                                            activeOpacity={.8}
                                                                                                        >
                                                                                                            <IcoMoonIcon
                                                                                                                name="tripadvisor-seeklogocom"
                                                                                                                color={app_styles(scales).colors.text.grey}
                                                                                                                size={30}
                                                                                                            />
                                                                                                        </TouchableOpacity>
                                                                                                    </>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                    </View>
                                                                                </>
                                                                            )
                                                                            : null
                                                                    }
                                                                </Block>

                                                            </>
                                                        )
                                                        : null
                                                }
                                            </>
                                        )
                                        : <NetworkErrorModal
                                            isOpened={settingsNetworkError}
                                            closeCallback={clearSettingsNetworkError}
                                        />
                                )
                                : <DataLoadingIndicator/>
                        }
                    </ScrollView>
                </View>
            </SafeView>
        </>
    );
}


//----EXPORT----//
export default ContactsScreen;