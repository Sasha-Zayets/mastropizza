//Imports
import createDataContext from "./createDataContext";
import { Dimensions, AsyncStorage, PixelRatio } from 'react-native';
//Navigation
import { navigate } from "../_navigationRefs";
//Api
import axiosWithErrorHandler from "../services/axiosWithErrorHandler";
//Language detector
import { languages } from "../_language";
//Helpers
import { prepareLanguageToHttpRequest } from "../helpers/helpers";
//Global vars
import { BASE_URL, APP_VERSION } from "../different/global_vars";
//Localization
import translator from "../translator/translator";




//Reducer
const settingsReducer = (state, action) => {
    switch (action.type) {
        case 'setLanguage':
            return { ...state, language: action.payload, albums: [], album: {}, deliveryCities: [], serviceInfo: {} };
        case 'setSettings':
            return { ...state, settingsNetworkError: false, isDataFetching: false, appSettings: action.payload.settings, contacts: action.payload.contacts, homeCityId: action.payload.home_city_id };
        case 'clearSettingsNetworkError':
            return { ...state, settingsNetworkError: false, isDataFetching: false }
        case 'clearDeliveryCitiesSettingsNetworkError':
            return { ...state, deliveryCitiesSettingsNetworkError: false, isDataFetching: false }
        case 'setSettingsNetworkError':
            return { ...state, settingsNetworkError: action.payload, isDataFetching: false }
        case 'getDeliveryCities':
            return { ...state, settingsNetworkError: false, isDataFetching: false, deliveryCities: action.payload }
        case 'getRestaurant':
            return { ...state, settingsNetworkError: false, isDataFetching: false, restaurant: action.payload.restaurant, restaurantMetaData: { ...state.restaurantMetaData, language: action.payload.language } }
        case 'getEmmaPizzaRestaurant':
            return {
                ...state,
                settingsNetworkError: false,
                emmaPizzaRestaurant: action.payload.restaurant,
                emmaPizzaRestaurantMetaData: { ...state.emmaPizzaRestaurantMetaData, language: action.payload.language }
            }
        case 'clearRestaurant':
            return { ...state, restaurant: {} }
        case 'setIsDataFetching':
            return { ...state, isDataFetching: true }
        default:
            return { ...state }
    }
};




//Calculations
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const widthScale = SCREEN_WIDTH / 375;
const heightScale = SCREEN_HEIGHT / 667;

let deviceFontScale = PixelRatio.getFontScale();

const fontScale = (deviceFontScale > 1) ? widthScale / deviceFontScale : widthScale;

const SCALES = {
    widthScale: widthScale > 1.15 ? 1.15 : widthScale,
    heightScale: heightScale,
    fontScale: fontScale
}



//Actions
const clearSettingsNetworkError = dispatch => () => {
    dispatch({ type: 'clearSettingsNetworkError' });
}

const clearDeliveryCitiesSettingsNetworkError = dispatch => () => {
    dispatch({ type: 'clearDeliveryCitiesSettingsNetworkError' });
}

const setLanguage = dispatch => async (language, fromSettings = false) => {
    await AsyncStorage.setItem('language', language);
    languages.current = language;
    dispatch({ type: 'setLanguage', payload: language });
    if (fromSettings) {
        navigate('Start')
    }
}


const getDeliveryCities = dispatch => async () => {
    try {
        dispatch({ type: 'setIsDataFetching' });
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/order/cities?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithErrorHandler.get(url);

        if (response) {
            let cities = response.data.data;
                cities.push({
                    id: 0,
                    name: translator.translate(language, 'Інший населений пункт')
                });
            dispatch({ type: 'getDeliveryCities', payload: cities });
            return cities;
        }
    } catch (err) {
        console.log('ksksk')
        dispatch({ type: 'setSettingsNetworkError', payload: true });
    }
}


const getRestaurant = dispatch => async (page_id) => {
    try {
        dispatch({ type: 'setIsDataFetching' });
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/restaurant/restaurant?lang=${lang}&version=${APP_VERSION}&restaurant_id=${page_id}`;
        const response = await axiosWithErrorHandler.get(url);

        if (response) {
            let restaurant = response.data.data;
            dispatch({ type: 'getRestaurant', payload: { restaurant, language } });
            return restaurant;
        }
    } catch (err) {
        dispatch({ type: 'setSettingsNetworkError', payload: true });
    }
}


const getEmmaPizzaRestaurant = dispatch => async () => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/restaurant/restaurant-emma-pizza?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithErrorHandler.get(url);

        if (response) {
            let restaurant = response.data.data;
                restaurant.page_data = response.data.page_data || null;
            dispatch({ type: 'getEmmaPizzaRestaurant', payload: { restaurant, language } });
            return restaurant;
        }
    } catch (err) {
        dispatch({ type: 'setSettingsNetworkError', payload: true });
    }
}



const clearRestaurant = dispatch => () => {
    dispatch({ type: 'clearRestaurant' })
}


const getAppSettings = dispatch => async () => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/setting/settings?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithErrorHandler.get(url);

        if (response) {
            let settings = response.data.data || null;
            let contacts = settings.contacts;

            let home_city_id = settings.orderDefaultCityId ? parseInt(settings.orderDefaultCityId) : 0;

            if (settings && contacts) {
                dispatch({ type: 'setSettings', payload: { settings, contacts, home_city_id } });
                return settings;
            }
            return false;
        }
    } catch (err) {
        dispatch({ type: 'setSettingsNetworkError', payload: true });
    }
}


const setSettingsNetworkError = dispatch => () => {
    dispatch({ type: 'setSettingsNetworkError', payload: true })
}



//Export
export const { Provider, Context } = createDataContext(
    settingsReducer,
    {
        clearSettingsNetworkError,
        clearDeliveryCitiesSettingsNetworkError,
        setLanguage,
        getDeliveryCities,
        getRestaurant,
        clearRestaurant,
        getAppSettings,
        setSettingsNetworkError,
        getEmmaPizzaRestaurant
    },
    {
        appSettings: {},
        contacts: {},
        homeCityId: null,
        deliveryCities: [],
        scales: SCALES,
        settingsNetworkError: false,
        deliveryCitiesSettingsNetworkError: false,
        isDataFetching: false,
        language: languages.current,
        screen_width: SCREEN_WIDTH,
        restaurant: {},
        restaurantMetaData: {
            language: null
        },
        apiVersion: APP_VERSION,
        emmaPizzaRestaurant: {},
        emmaPizzaRestaurantMetaData: {
            language: null
        }
    }
);
