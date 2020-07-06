//Imports
import createDataContext from "./createDataContext";
import {AsyncStorage, Platform} from 'react-native';
//Expo
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
//Navigation
import {navigate} from "../_navigationRefs";
//Api
import axiosWithToken from "../services/axiosWithToken";
import axiosWithErrorHandler from "../services/axiosWithErrorHandler";
//Helpers
import {prepareLanguageToHttpRequest} from "../helpers/helpers";
//Global vars
import {BASE_URL, APP_VERSION} from "../different/global_vars";


//Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            let redirectable = action.payload.redirectable;
            if (redirectable) {
                navigate(state.fromMakeOrder ? 'Cart' : 'AppMenu')
            }
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true,
                networkError: false,
                validationErrors: {},
                isDataLoading: false,
                fromMakeOrder: false
            };
        case 'updateUserInfo':
            navigate('AppMenu')
            return {
                ...state,
                user: action.payload.user,
                networkError: false,
                isDataFetching: false,
                validationErrors: {},
                isLoggedIn: true,
                fromMakeOrder: false
            }
        case 'logout':
            let newOrdersHistoryMeta = {
                language: null
            }
            return {
                ...state,
                user: {},
                isLoggedIn: false,
                last_order_address: {},
                ordersHistory: [],
                ordersHistoryMetaData: newOrdersHistoryMeta
            };
        case 'setNotifications':
            return {...state, notifications: action.payload.notifications, unreadNotifications: action.payload.unread}
        case 'getNotification':
            let needle;
            let newNotifications = state.notifications.map(item => {
                if (item.id === action.payload.id) {
                    item.read = 1;
                    needle = item;
                }
                return item;
            });
            let newUnred = action.payload.decrase ? state.unreadNotifications - 1 : state.unreadNotifications;
            return {...state, notification: needle, notifications: newNotifications, unreadNotifications: newUnred}
        case 'clearNotification':
            return {...state, notification: null}
        case 'updateUser':
            return {...state, user: {...state.user, [action.payload.field]: action.payload.value}}
        case 'updateNotificationsSettings':
            return {...state, user: {...state.user, ...action.payload}, isDataFetching: false, networkError: false}
        case 'writeOffBonuses':
            return {...state, user: {...state.user, bonuses: 0}}
        case 'setFromMakeOrder':
            return {...state, fromMakeOrder: action.payload}
        case 'setLastOrderAddress':
            return {...state, last_order_address: action.payload}
        case 'setCustomerData':
            return {...state, customerData: {...state.customerData, [action.payload.field]: action.payload.value}};
        case 'clearNetworkError':
            return {...state, networkError: false, isDataFetching: false, isOrdersHistoryRefreshing: false};
        case 'setDeviceId':
            return {...state, user: {...state.user, device_id: action.payload}}
        case 'setNetworkError':
            return {...state, networkError: action.payload, isDataFetching: false, isOrdersHistoryRefreshing: false}
        case 'setIsMoreDataLoading':
            return { ...state, isMoreDataLoading: true }
        case 'setIsDataFetching':
            return {...state, isDataFetching: true}
        case 'setValidationErrors':
            return {
                ...state,
                validationErrors: action.payload,
                networkError: false,
                isDataFetching: false,
                isDataLoading: false
            };
        case 'clearValidationErrors':
            return {...state, validationErrors: {...state.validationErrors, [action.payload]: null}};
        case 'clearAllValidationsErrors':
            return {...state, validationErrors: {}}
        default:
            return {...state}
    }
};


//Actions
/**
 * clear 'Some thing went wrong' :)
 */
const clearNetworkError = dispatch => () => {
    dispatch({type: 'clearNetworkError'});
}


const setNetworkError = dispatch => () => {
    dispatch({type: 'setNetworkError', payload: 'An error occured'})
}


/**
 * clear validation errors
 */
const clearValidationErrors = dispatch => (field) => {
    dispatch({type: 'clearValidationErrors', payload: field});
}


/**
 * set validation errors
 */
const setValidationErrors = dispatch => (errors) => {
    dispatch({type: 'setValidationErrors', payload: errors});
}


/**
 * set validation errors
 */
const setCustomerData = dispatch => (field, value) => {
    dispatch({type: 'setCustomerData', payload: {field, value}});
}


/*LOG IN*/
const login = dispatch => async (formData) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/login?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithErrorHandler.post(url, formData);

        if (response) {
            await authHandler(response, dispatch, 'login');
        }
    } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message) {
            let error = err.response.data.message;
            dispatch({type: 'setValidationErrors', payload: {password: error}});
        } else {
            dispatch({type: 'setNetworkError', payload: true});
        }
        throw new Error('Login failed');
    }
}


const changePassword = dispatch => async (formData) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/change-password?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithToken.post(url, formData);
        if (response && response.data && response.data.message) {
            let message = response.data.message;
            return message;
        }
        throw new Error('Password change failed');
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.errors) {
            let errors = error.response.data.errors;
            dispatch({type: 'setValidationErrors', payload: errors});
        } else {
            dispatch({type: 'setNetworkError', payload: true});
        }
        throw new Error('Password change failed');
    }
}


const requestPasswordReset = dispatch => async (formData) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/request-password-reset?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithToken.post(url, formData);
        if (response && response.data && response.data.message) {
            let message = response.data.message;
            return message;
        }
        throw new Error('Request reset password failed');
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.errors) {
            let errors = error.response.data.errors;
            dispatch({type: 'setValidationErrors', payload: errors});
        } else {
            dispatch({type: 'setNetworkError', payload: true});
        }
        throw new Error('Request reset password failed');
    }
}


/*SUGN UP*/
const registerUser = dispatch => async (formData) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/signup?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithErrorHandler.post(url, formData);

        if (response) {
            await authHandler(response, dispatch, 'login');
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.errors) {
            let errors = error.response.data.errors;
            dispatch({type: 'setValidationErrors', payload: errors});
        } else {
            dispatch({type: 'setNetworkError', payload: true});
        }
        throw new Error('Login failed');
    }
}

/**
 * Facebook login
 */
const facebookLogin = dispatch => async (data) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/login?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithErrorHandler.post(url, data);

        if (response) {
            await authHandler(response, dispatch, 'login');
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

/**
 * Update User Profile
 */
const updateProfile = dispatch => async (formData) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/settings?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithToken.post(url, formData);

        if (response) {
            authHandler(response, dispatch, 'updateUserInfo');
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.errors) {
            let errors = error.response.data.errors;
            dispatch({type: 'setValidationErrors', payload: errors});
        } else {
            dispatch({type: 'setNetworkError', payload: true});
        }
        throw new Error('Edit data failed');
    }
}


/* LOG OUT */
const logout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'})
    navigate('Menu');
}


const updateNotificationsSettings = dispatch => async (formData, notifications) => {
    try {
        dispatch({type: 'setIsDataFetching'});
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/notifications?lang=${lang}&version=${APP_VERSION}`;
        const response = await axiosWithToken.post(url, formData);

        if (response) {
            dispatch({type: 'updateNotificationsSettings', payload: notifications});
        }
    } catch (error) {
        dispatch({type: 'setNetworkError', payload: true});
    }
}




const getLastOrderAddress = async (dispatch) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/last-order?lang=${lang}&version=${APP_VERSION}`;

        axiosWithToken.get(url)
            .then((response) => {
                if (response && response.data && response.data.data) {
                    let address = response.data.data;
                    if (Array.isArray(address)) return;

                    if (address) {
                        dispatch({type: 'setLastOrderAddress', payload: address});
                    }
                }
            })
            .catch(error => {
                // Nothing because request isn't critical
            });
    } catch (error) {
        // Nothing because request isn't critical
    }
}


const updateLastOrderAddress = dispatch => (address) => {
    dispatch({type: 'setLastOrderAddress', payload: address});
}


const fetchUserByToken = dispatch => async () => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/settings?lang=${lang}&version=${APP_VERSION}`;

        const response = await axiosWithToken.get(url, {timeout: 5000});

        if (response) {
            authHandler(response, dispatch, 'login', false);
        }
    } catch (error) {
        dispatch({type: 'setNetworkError', payload: true});
    }
}


/**
 * Login helper (mainly for avoiding code repeating)
 */
const authHandler = async (response, dispatch, dispatchAction, redirectable = true) => {
    if (response) {
        try {
            // Setting up token to storage
            let token;
            if (dispatchAction === 'updateUserInfo') {
                token = (response.data && response.data.user && response.data.user.auth_key) ? response.data.user.auth_key : null;
            } else {
                token = (response.data && response.data.data && response.data.data.auth_key) ? response.data.data.auth_key : null;
            }

            if (token) {
                await AsyncStorage.setItem('token', token);
            }

            let user = response.data.data || response.data.user;

            await handleNotifications(dispatch);

            //Fetching last order address for auto input
            getLastOrderAddress(dispatch);

            // Setting up customer
            dispatch({type: dispatchAction, payload: {user: user, redirectable: redirectable}});
        } catch (error) {
            throw error;
        }
    }
}


const clearAllValidationsErrors = dispatch => () => {
    dispatch({type: 'clearAllValidationsErrors'});
}


const handleNotifications = async (dispatch) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/set-device?lang=${lang}&version=${APP_VERSION}`;
        await registerForPushNotificationsAsync(url, dispatch)
    } catch (error) {
        return;
    }
}


const registerForPushNotificationsAsync = async (url, dispatch) => {
    if (!Constants.isDevice) return;

    const {status: existingStatus} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    if (finalStatus !== 'granted') return;
    let token = await Notifications.getExpoPushTokenAsync();
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
        });
    }
    try {
        let form = new FormData();
        form.append("device_id", token);
        let response = await axiosWithToken.post(url, form)
        return;
    } catch (error) {
        return;
    }
}


const setFromMakeOrder = dispatch => (value) => {
    dispatch({type: 'setFromMakeOrder', payload: value})
}


const writeOffBonuses = dispatch => () => {
    dispatch({type: 'writeOffBonuses', payload: value})
}


const getUserNotifications = dispatch => async () => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/user/notifications-history?lang=${lang}&version=${APP_VERSION}`;

        const response = await axiosWithToken.get(url, {timeout: 5000});

        if (response) {
            const notifications = response.data.data || [];

            const unreadNotifications = notifications.filter(item => item.read === 0);
            return dispatch({type: 'setNotifications', payload: {notifications, unread: unreadNotifications.length}});
        }
    } catch (error) {
        //NOTHING BECAUSE REQUEST ISN"T CRITICAL
    }
}


const getNotification = dispatch => async (notificationId, status) => {
    try {
        if (parseInt(status) === 1) {
            return dispatch({type: 'getNotification', payload: {id: notificationId, decrase: false}});
        } else {
            const language = await AsyncStorage.getItem('language');
            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/user/set-notification-status-as-read?lang=${lang}&version=${APP_VERSION}`;

            let form = new FormData();
            form.append('user_notification_history_id', notificationId);
            const response = await axiosWithToken.post(url, form);

            if (response.data.status === 'success') {
                return dispatch({type: 'getNotification', payload: {id: notificationId, decrase: true}});
            }
        }
    } catch (error) {
        //NOTHING BECAUSE REQUEST ISN"T CRITICAL
    }
}


const clearNotification = dispatch => () => {
    dispatch({type: 'clearNotification'});
}


const updateUserData = dispatch => (field, value) => {
    dispatch({type: 'updateUser', payload: {field, value}});
}


//Export
export const {Provider, Context} = createDataContext(
    authReducer,
    {
        writeOffBonuses,
        setFromMakeOrder,
        clearNetworkError,
        clearValidationErrors,
        setValidationErrors,
        setCustomerData,
        setNetworkError,
        login,
        changePassword,
        facebookLogin,
        updateProfile,
        registerUser,
        logout,
        clearAllValidationsErrors,
        fetchUserByToken,
        requestPasswordReset,
        updateNotificationsSettings,
        getUserNotifications,
        getNotification,
        clearNotification,
        updateLastOrderAddress,
        updateUserData,
    },
    {
        fromMakeOrder: false,
        last_order_address: {},
        networkError: false,
        isDataFetching: false,
        validationErrors: {},
        isLoggedIn: false,
        user: {},
        customerData: {
            phone: null,
            password: null,
            email: null,
            promo_code: null
        },
        unreadNotifications: 0,
        ordersStatuses: {
            uk: [
                {
                    name: "В очікуванні",
                    color: "#F7772E"
                },
                {
                    name: "Замовлення готується",
                    color: "#1877F2"
                },
                {
                    name: "Замовлення в дорозі",
                    color: "#08C83E"
                },
                {
                    name: "Доставлено",
                    color: "#444444"
                },
                {
                    name: "Відмінено",
                    color: "#E90101"
                }
            ],
            ru: [
                {
                    name: "В ожидании",
                    color: "#F7772E"
                },
                {
                    name: "Заказ готовится",
                    color: "#1877F2"
                },
                {
                    name: "Заказ в пути",
                    color: "#08C83E"
                },
                {
                    name: "Доставлено",
                    color: "#444444"
                },
                {
                    name: "Отменено",
                    color: "#E90101"
                }
            ],
            en: [
                {
                    name: "Pending",
                    color: "#F7772E"
                },
                {
                    name: "Being prepared",
                    color: "#1877F2"
                },
                {
                    name: "On the road",
                    color: "#08C83E"
                },
                {
                    name: "Delivered",
                    color: "#444444"
                },
                {
                    name: "Canceled",
                    color: "#E90101"
                }
            ]
        },
        notifications: [],
        notifiaction: null,
        isMoreDataLoading: false
    }
);

