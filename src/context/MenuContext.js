//Imports
import React from 'react';
import createDataContext from "./createDataContext";
import { AsyncStorage, Alert } from 'react-native';
//Navigation
import { navigate } from "../_navigationRefs";
//Api
import axios from 'axios';
import axiosWithErrorHandler from '../services/axiosWithToken';
import axiosWithToken from "../services/axiosWithToken";
//Helpers
import { prepareLanguageToHttpRequest, checkAuth } from "../helpers/helpers";
//Global vars
import { BASE_URL, APP_VERSION } from "../different/global_vars";
//Localization
import translator from "../translator/translator";




//Reducer
const menuReducer = (state, action) => {
    switch (action.type) {
        case 'addToCart':
            return { ...state, cart: [...state.cart, action.payload], itemsInCart: state.itemsInCart + action.payload.quantity }
        case 'setPaymentWidgetHtml':
            return { ...state, paymentWidgetHtml: action.payload, isDataFetching: false, networkError: false }
        case 'removeFromCart':
            let newCart;
            let product_id = action.payload.id;
            let uid = action.payload.uid;
            if (uid) {
                newCart = state.cart.filter(item => item.uid !== uid)
            } else {
                newCart = state.cart.filter(item => item.id !== product_id);
            }            
            return { ...state, cart: newCart, itemsInCart: state.itemsInCart - action.payload.quantity }
        case 'updateCart':
            return { ...state, cart: action.payload.cart, itemsInCart: action.payload.itemsInCart }
        case 'clearCart':
            return { ...state, cart: [], itemsInCart: 0, paymentWidgetHtml: null }
        case 'clearNetworkError':
            return { ...state, networkError: false, isDataFetching: false, isProductsFetching: false, isProductsListRefreshing: false, isMoreDataLoading: false }
        case 'clearValidationErrors':
            return { ...state, validationErrors: { ...state.validationErrors, [action.payload]: null } };
        case 'setNetworkError':
            return { ...state, networkError: action.payload, isDataFetching: false }
        case 'setValidationErrors':
            showErrorsAlert();
            return { ...state, validationErrors: action.payload, networkError: false, isDataFetching: false };
        case 'setIsDataFetching':
            return { ...state, isDataFetching: true }
        case 'clearAllValidationsErrors':
            return { ...state, validationErrors: {} }
        default:
            return { ...state }
    }
};


//Actions
const addToCart = dispatch => (product) => {
    dispatch({ type: 'addToCart', payload: product });
}

const removeFromCart = dispatch => (product) => {
    dispatch({ type: 'removeFromCart', payload: product });
}

const updateCart = dispatch => (cart) => {
    let cartProductsQuantity = 0;

    let newCart = cart.filter(item => {
        cartProductsQuantity += item.quantity
        return item.quantity !== 0;
    });

    dispatch({ type: 'updateCart', payload: { cart: newCart, itemsInCart: cartProductsQuantity } })
}

const clearCart = dispatch => (redirect = true) => {
    dispatch({ type: 'clearCart' });
    if (redirect) {
        navigate('Menu');
    }
}

const clearNetworkError = dispatch => () => {
    dispatch({ type: 'clearNetworkError' });
}

const clearValidationErrors = dispatch => (field) => {
    dispatch({ type: 'clearValidationErrors', payload: field });
}

const makeOrder = dispatch => async (formData) => {
    try {
        const language = await AsyncStorage.getItem('language');
        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/order/create?lang=${lang}&version=${APP_VERSION}`;

        let response;
        if (checkAuth()) {
            response = await axiosWithToken.post(url, formData);
        } else {
            response = await axiosWithErrorHandler.post(url, formData);
        }

        if (response && response.data) {
            if (response.data.payment_url) {
                dispatch({ type: 'setPaymentWidgetHtml', payload: response.data.payment_url })
            }
            return response.data
        }
        throw new Error('Make order failed');
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.errors) {
            let errors = error.response.data.errors;
            dispatch({ type: 'setValidationErrors', payload: errors });
        } else {
            dispatch({ type: 'setNetworkError', payload: true });
        }
        throw new Error('Make order failed');
    }
}

const showErrorsAlert = async () => {
    const language = await AsyncStorage.getItem('language');
    Alert.alert(
        translator.translate(language, "Важливо!"),
        translator.translate(language, "Форма містить помилки"),
        [
            { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false }
    )
}

const clearAllValidationsErrors = dispatch => () => {
    dispatch({ type: 'clearAllValidationsErrors' });
}

const setValidationErrors = dispatch => (errors) => {
    dispatch({ type: 'setValidationErrors', payload: errors });
}










//Export
export const { Provider, Context } = createDataContext(
    menuReducer,
    {
        clearNetworkError,
        addToCart,
        clearCart,
        removeFromCart,
        clearValidationErrors,
        clearAllValidationsErrors,
        updateCart,
        setValidationErrors,
        makeOrder,
    },
    {
        validationErrors: {},
        paymentWidgetHtml: null,
        networkError: false,
        isDataFetching: false,
        product: null,
        cart: [],
        itemsInCart: 0,
    }
);
