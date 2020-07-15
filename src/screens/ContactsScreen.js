//----IMPORTS----//
//React
import React, {useContext, useState, useEffect} from 'react';
//React native
import {View, ScrollView, Text, Animated, Easing, TouchableOpacity, Linking, AsyncStorage} from 'react-native';
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
import ContactsCard from "../components/shared/ContactsCard";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//Localization
import translator from "../translator/translator";
//Helpers
import {prepareLanguageToHttpRequest, notEmptyString} from "../helpers/helpers";
//Styles
import styles from '../styles/screens/contacts-screen';
import {app_styles} from "../styles/app_styles";
import {APP_VERSION, BASE_URL} from "../different/global_vars";
import axiosWithErrorHandler from "../services/axiosWithErrorHandler";


//----COMPONENT----//
const ContactsScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language, emmaPizzaRestaurant, emmaPizzaRestaurantMetaData, settingsNetworkError, screen_width, contacts}, getEmmaPizzaRestaurant, clearSettingsNetworkError} = useContext(AppSettingsContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(Math.round(scales.heightScale * 270)));
    const [extendedCard, setExtendedCard] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        loadDataRestoraund();
    }, []);

    const loadDataRestoraund = async () => {
        try {
            const language = language || await AsyncStorage.getItem('language');
            const lang = prepareLanguageToHttpRequest(language);

            const url = `${BASE_URL}/restaurant/restaurants?lang=${lang}`;
            const response = await axiosWithErrorHandler.get(url);

            const totalInfo = []

            response.data.data.restaurants.forEach((item) => {
               getInfoRestaurant(item.id, lang)
                   .then((data) => {
                       totalInfo.push(data);
                   });
            });

            setRestaurants(totalInfo);
        } finally {
            setIsDataLoading(false)
        }
    }

    const getInfoRestaurant = async (id, lang) => {
        const getUrl = `${BASE_URL}/restaurant/restaurant?lang=${lang}&restaurant_id=${id}`
        const { data } = await axiosWithErrorHandler.get(getUrl);
        return data.data;
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



    const sendEmail = () => {
        let address = contacts.email;
        if (!notEmptyString(address)) return;
        let link = `mailto: ${contacts.email}`
        return Linking.openURL(link)
    }

    console.log(settingsNetworkError)
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
                                                <View style={styles(scales).container}>
                                                    {
                                                        restaurants.map((restaurant, index) => {
                                                            return (
                                                                <ContactsCard
                                                                    key={index}
                                                                    restaurant={restaurant}
                                                                    style={styles(scales).contacts_card}/>
                                                            )
                                                        })
                                                    }
                                                </View>
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
