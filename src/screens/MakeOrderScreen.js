//----IMPORTS----//
//React
import React, {useEffect, useState, useContext} from 'react';
//React native
import {View, Text, KeyboardAvoidingView, ScrollView, Alert, Modal, TouchableOpacity} from 'react-native';
//WebView
import {WebView} from 'react-native-webview';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as AuthContext} from "../context/AuthContext";
import {Context as MenuContext} from "../context/MenuContext";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Moment
import moment from "moment";
import 'moment/locale/uk';
//Components
import Header from "../components/shared/Header";
import {SafeView, Block, Spacer, DataLoadingIndicator, VerticalSpacer, HorizontalDivider} from "../components/shared";
import {NetworkErrorModal, SuccessOrderModal, OnlinePaymentInfoModal, ClearCartModal} from "../components/modals";
import {ButtonPrimary, ButtonRadio, ButtonToggler} from "../components/buttons";
import {PhoneInput, SelectInput, SimpleInput, DateTimePikerInput} from "../components/inputs";
//Helpers
import {formatPrice, reformatUserPhone} from "../helpers/helpers";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/make-order-screen';
import {app_styles} from '../styles/app_styles';


//----COMPONENT----//
const MakeOrderScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language, deliveryCities, deliveryCitiesNetworkError, isDataFetching, appSettings, homeCityId}, getDeliveryCities, clearDeliveryCitiesNetworkError} = useContext(AppSettingsContext);
    const {state: {user, last_order_address}, updateLastOrderAddress, updateUserData} = useContext(AuthContext);
    const {state: {cart, validationErrors, networkError, paymentWidgetHtml}, clearValidationErrors, clearNetworkError, clearAllValidationsErrors, setValidationErrors, makeOrder, clearCart} = useContext(MenuContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [orderData, setOrderData] = useState({
        name: (user.name || user.username) ? (user.name || user.username) : null,
        phone: user.phone ? reformatUserPhone(user.phone) : null,
        city: (last_order_address.city && last_order_address.city !== 'null') ? last_order_address.city : null,
        other_city_name: null,
        street: (last_order_address.street && last_order_address.street !== 'null') ? last_order_address.street : null,
        house: (last_order_address.house_number && last_order_address.house_number) !== 'null' ? last_order_address.house_number : null,
        flat: (last_order_address.apartment_number && last_order_address.apartment_number !== 'null') ? last_order_address.apartment_number : null,
        time: null,
        comment: null,
        payment_type: 'cash', //or 'online // 1 - cash 2 - online
        do_not_call: (last_order_address.do_not_call && last_order_address.do_not_call !== 'null') ? parseInt(last_order_address.do_not_call) : 0,
        have_a_child: (last_order_address.have_a_child && last_order_address.have_a_child !== 'null') ? parseInt(last_order_address.have_a_child) : 0,
        have_a_dog: (last_order_address.have_a_dog && last_order_address.have_a_dog !== 'null') ? parseInt(last_order_address.have_a_dog) : 0,
    });
    const [prices, setPrices] = useState({
        packing_price: 0,
        delivery_price: 0,
        products_price: 0,
        total_price: 0,
        sauce_price: 0,
        extra_ingredients: 0
    });
    const [showSuccessOrderModal, setShowSuccessOrderModal] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showOnlinePaymentInfoModal, setShowOnlinePaymentInfoModal] = useState(false)
    const [showClearCartModal, setShowClearCartModal] = useState(false)
    const [isOrderPaid, setIsOrderPaid] = useState(false)
    const [lowOrederSum, setLowOrderSum] = useState(false);
    const [isWayForPaySystemUsed, setIsWayForPaySystemUsed] = useState(false);


    //Hooks and Methods
    useEffect(() => {
        if (!deliveryCities.length) {
            fetchDelivrySities()
        }

        calculatePrices();

        return () => {
            clearAllValidationsErrors()
        }
    }, [orderData, paymentWidgetHtml]);


    /*Customer input handler*/
    const handlePhoneInput = (value) => {
        autocompletePhone(value)
    }

    const clearOrderData = () => {
        setOrderData({
            ...orderData,
            city: null,
            street: null,
            house: null,
            flat: null,
            time: null,
            comment: null,
        })
    }

    const fetchDelivrySities = async () => {
        await getDeliveryCities();
    }

    /*For formating phone number according to design*/
    const autocompletePhone = (value) => {
        if (value !== null && value.length <= 5) {
            setCustomerPhone("+380 ");
        } else {
            if (value === null) {
                setCustomerPhone(null);
                return;
            }
            if (value.length <= 17) {
                refactorCurrentPhoneValue(value, [7, 11, 14], " ");
            } else if (value.length > 17) {
                refactorCurrentPhoneValue(value, [7, 11, 14], " ");
                let phoneNumber = orderData.phone.substring(0, 17);
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
                let phoneNumber = orderData.phone.substring(0, charPositions[i]) + symbol + orderData.phone.substring(charPositions[i]) + value.substr(-1, 1);
                setCustomerPhone(phoneNumber);
                return;
            } else {
                setCustomerPhone(value);
            }
        }
    }

    /*For avoiding code dublication*/
    const setCustomerPhone = (value) => {
        setOrderData({...orderData, phone: value});
    }

    const handleFormInputs = (name, value) => {
        setOrderData({...orderData, [name]: value});
    }

    const handlePaymentMethod = (value) => {
        setOrderData({...orderData, payment_type: value})
    }

    const getSauceValue = (product) => {
        if (!product.properties || !product.properties.length ) return;
        if (!product.sauce) return 0;
        return product.size === 2 ? product.sauce.price2 : product.sauce.price;
    }

    const calculatePrices = () => {
        let packingPrice = 0;
        let productsPrice = 0;
        let deliveryPrice = 0;
        let extraIngredients = 0;
        let saucePrice = 0;


        cart.forEach(item => {
            if (hasIngredients(item)) {
                let value = 0;
                item.main_ingredients.forEach(ingr => {
                    if (ingr.checked) {
                        value += (parseFloat(ingr.quantity) * parseFloat(ingr.price))
                    }
                });
                extraIngredients += (value * item.quantity);
            }

            if(item.sauce){
                saucePrice += getSauceValue(item) * Number(item.quantity);
            }

            productsPrice += (Number(item.quantity) * getProductPrice(item));
            packingPrice += (Number(item.quantity) * getProductPackingPrice(item));
        });


        //If order sum (products + packaging) lower than minimal for chosen city - order is not possible
        if (orderData.city) {
            let deliveryInfo = appSettings.delivery;
            let totalVal = productsPrice + packingPrice + extraIngredients;

            if (Number(orderData.city.id) !== homeCityId) {
                let secondary = deliveryInfo['secondary'];

                if (totalVal >= Number(secondary['min_sum_for_promo_delivery'])) {
                    deliveryPrice = Number(secondary['promo_delivery_price']);
                } else {
                    deliveryPrice = Number(secondary['price']);
                }

                if (totalVal < secondary['min_order_price']) {
                    setLowOrderSum(true);
                } else {
                    setLowOrderSum(false);
                }
            } else {
                let main = deliveryInfo['main'];
                if (totalVal < Number(main['min_free_delivery_sum'])) {
                    deliveryPrice = Number(main['price'])
                }
                if (totalVal < main['min_order_price']) {
                    setLowOrderSum(true);
                } else {
                    setLowOrderSum(false);
                }
            }
        }

        let total_price = packingPrice + productsPrice + extraIngredients + deliveryPrice + saucePrice;

        setPrices({
            packing_price: packingPrice,
            delivery_price: deliveryPrice,
            products_price: productsPrice,
            extra_ingredients: extraIngredients,
            sauce_price: saucePrice,
            total_price
        });

    }

    const hasIngredients = (product) => {
        return !!product.category.has_ingredients;
    }

    const getProductPrice = (product) => {
        let variant = product.variants.find(item => item.size === product.size);
        return variant ? parseFloat(variant['price']) : product.variants[0]['price'];
    }

    const getProductPackingPrice = (product) => {
        return (product.category && product.category.packing_price) ? parseFloat(product.category.packing_price) : 0;
    }

    const formSubmit = async () => {
        try {
            let requiredFields = (orderData.city && orderData.city.id === 0)
                ? ['name', 'phone', 'other_city_name', 'street', 'house', 'time']
                : ['name', 'phone', 'city', 'street', 'house', 'time'];
            if (hasEmptyFields(orderData, requiredFields)) return;
            if (!validatePhoneLength()) return;
            if (!timeIsValid()) return;
            if (lowOrederSum) {
                let deliveryInfo = appSettings.delivery;
                let minimumOrderSum = orderData.city.id === homeCityId ? deliveryInfo['main']['min_order_price'] : deliveryInfo['secondary']['min_order_price'];
                let alertMessage = translator.translate(language, "Мінімальна сума замовлення для Вашого населеного пункту становить :SUM грн.");
                alertMessage = alertMessage.replace(/:SUM/, formatPrice(language, minimumOrderSum));
                return Alert.alert(translator.translate(language, "Увага!"), alertMessage)
            }
            setIsDataLoading(true);
            let cleanedPhone = orderData.phone.replace(/\s/g, '');

            let form = {
                inputs: {
                    name: orderData.name,
                    email: user.email,
                    phone: cleanedPhone,
                    city_id: orderData.city.id,
                    city_name: orderData.other_city_name || orderData.city.name,
                    street: orderData.street,
                    house_number: orderData.house,
                    payment_type: orderData.payment_type === 'cash' ? 1 : 2,
                    time: orderData.time,
                    do_not_call: orderData.do_not_call ? 1 : 0,
                    have_a_child: orderData.have_a_child ? 1 : 0,
                    have_a_dog: orderData.have_a_dog ? 1 : 0,
                },
                cart: transformCartForOrder()
            }

            if (orderData.flat) {
                form.inputs.apartment_number = orderData.flat;
            }

            if (orderData.comment) {
                form.inputs.comment = orderData.comment;
            }

            let response = await makeOrder(form);

            if (response.payment_url) {
                isWayForPay(response.payment_url);
                setShowOnlinePaymentInfoModal(true)
            } else {
                refreshLastOrderAddress();
                setShowSuccessOrderModal(true);
                if (!user.phone) {
                    updateUserData('phone', orderData.phone)
                }
            }
            setLowOrderSum(false);
            setIsDataLoading(false)
        } catch (error) {
            setIsDataLoading(false);
        }
    }

    const transformCartForOrder = () => {
        let cartForOrder = [];

        cart.forEach(item => {
            let position = {};
            if (item.category.has_ingredients) {
                position.main_ingredients = transformIngredients(item.main_ingredients)
            }
            if(item.sauce){
               position.property_id = item.sauce.id;
            }
            position.type = item.type;
            position.product_id = item.id;
            position.quantity = item.quantity
            position.size = item.size || 1;

            if (item.comment) {
                position.comment = item.comment
            }

            cartForOrder.push(position)
        })

        return cartForOrder;

        function transformIngredients(data) {
            let result = [];
            data.forEach(item => {
                if (item.checked && item.checked === 1) {
                    let position = {
                        ingredient_id: item.id,
                        quantity: item.quantity
                    }
                    result.push(position)
                }
            });
            return result;
        }
    }

    const hasEmptyFields = (data, requiredFields) => {
        let errors = {};
        for (let key in data) {
            if (requiredFields.includes(key) && !data[key]) {
                errors[key] = translator.translate(language, "Поле не може бути порожнім!")
            }
        }
        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return true;
        }
        return false;
    }

    const validatePhoneLength = () => {
        if(!orderData.phone) return;
        if(orderData.phone.length < 17){
            setValidationErrors({
                phone: translator.translate(language, "Перевірте правильність введеного номеру телефону")
            });
            return false;
        }
        return true;
    }

    const timeIsValid = () => {
        moment.locale('uk');
        let now = moment();
        let orderTime = moment(orderData.time * 1000);
        let diff = orderTime.diff(now, 'minutes');

        let delivery = appSettings.delivery || null;

        if (delivery && delivery.min_delivery_time && (diff < Number(delivery.min_delivery_time))) {
            let errMessage = translator.translate(language, "Час доставки не може бути раніше ніж поточний час + :MIN хвилин");
            errMessage = errMessage.replace(':MIN', delivery.min_delivery_time);
            let errors = {
                time: translator.translate(language, errMessage)
            }
            setValidationErrors(errors);
            return false;
        }

        let schedule = delivery['schedule'];

        if (typeof schedule !== 'object') return true; //True just for letting request go to server

        let startTime = schedule['start'];
        let endTime = schedule['end'];

        if (!startTime || !endTime) return true; //True just for letting request go to server

        let startTimeParts = startTime.split(':');

        let endTimeParts = endTime.split(':');

        let orderHour = orderTime.hour();
        let orderMinutes = orderTime.minutes();

        if (orderMinutes < 10){
            orderMinutes = '0' + orderMinutes;
        } else if (orderMinutes === 0) {
            orderMinutes = '00';
        }

        let startTimeNumber = parseInt(startTimeParts[0] + startTimeParts[1]);
        let endTimeNumber = parseInt(endTimeParts[0] + endTimeParts[1]);

        if(startTimeNumber > endTimeNumber) {
            endTimeNumber += 2400; //That means delivery works for some hours of the next day
        }

        let orderTimeNumber = parseInt(String(orderHour) + String(orderMinutes));

        if(orderTimeNumber < startTimeNumber || orderTimeNumber > endTimeNumber){
            let errMessage = "Час доставки може бути в межах від :START до :END";
            errMessage = errMessage
                .replace(':START', startTime)
                .replace(':END', endTime);

            let errors = {
                time: translator.translate(language, errMessage)
            }
            setValidationErrors(errors);
            return false;
        }

        return true;
    }

    const closeSuccessOrderModal = () => {
        setShowSuccessOrderModal(false);
        clearOrderData();
        clearCart();
    }

    /**
     * JS injected in WebView for checking customer actions
     */
    const injectedJavascript = `(document.body.addEventListener(
        'click', (e) => { 
            if(e.target.closest('.button__verify')){
                setTimeout(() => {window.ReactNativeWebView.postMessage(document.body.innerHTML)}, 1500);
            } else if(e.target.closest('.cancel__payment')){
                window.ReactNativeWebView.postMessage('cancel payment');
            } else if (e.target.closest('.container__block__confirm__send')) {
                window.ReactNativeWebView.postMessage('email confirmation sent');
            } else if (e.target.closest('.button__return')) {
                window.ReactNativeWebView.postMessage('return button pressed');
            } else {
                window.ReactNativeWebView.postMessage('return other action');
            }
        })
    )`;

    const refreshLastOrderAddress = () => {
        let newLastAddress = {
            apartment_number: orderData.flat,
            do_not_call: orderData.do_not_call,
            have_a_child: orderData.have_a_child,
            have_a_dog: orderData.have_a_dog,
            house_number: orderData.house,
            city: orderData.city,
            street: orderData.street,
        }
        updateLastOrderAddress(newLastAddress);
    }

    const handleMessageFromWebView = (data) => {
        if (data === 'cancel payment') {
            setShowPaymentModal(false);
            return;
        }
        if (data === 'return button pressed') {
            setShowPaymentModal(false);
            clearCart();
            refreshLastOrderAddress();
            return;
        }
        if (data === 'email confirmation sent') {
            setShowPaymentModal(false);
            clearCart();
            refreshLastOrderAddress();
            return;
        }

        let needle = /container__block__confirm__success__text/i;
        let needleTwo = /MOJO HALL/i;
        let hasNoErrors = false;

        let errorBlock = data.substring(data.indexOf('hidable'), data.indexOf('autocomplete'));
        if (errorBlock) {
            if ((errorBlock.indexOf('display: none') !== -1) || (errorBlock.indexOf('display:none') !== -1)) {
                hasNoErrors = true;
            }
        }

        let result = data.match(needle);
        let resultTwo = data.match(needleTwo);


        if (hasNoErrors) {
            if (result || resultTwo) {
                setIsOrderPaid(true)
                refreshLastOrderAddress();
            }
        }
    }

    const handleClosePaymentModal = () => {
        if (isOrderPaid) {
            setShowPaymentModal(false);
            clearCart();
        } else {
            setShowPaymentModal(false)
            if(isWayForPaySystemUsed){
                setShowClearCartModal(true);
            }
        }
    }

    const handleNextStep = () => {
        setShowOnlinePaymentInfoModal(false)
        setTimeout(() => {
            setShowPaymentModal(true)
        }, 500)
    }


    const clearCartCallback = () => {
        clearCart();
    }

    const isWayForPay = (payment_url) => {
        return setIsWayForPaySystemUsed(payment_url.includes('way-for-pay'));
    }



    //Tempalte
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <SafeView>
                <Header
                    backAllowed
                    navigation={navigation}
                    title={translator.translate(language, "Оформлення замовлення")}
                    noIcons
                />
                <View style={styles(scales).body}>
                    {
                        !networkError || deliveryCitiesNetworkError
                            ? (
                                !isDataFetching
                                    ? (
                                        deliveryCities.length
                                            ? (
                                                <ScrollView showsVerticalScrollIndicator={false} bounces={false}
                                                            keyboardShouldPersistTaps={'always'}>
                                                    <Block>
                                                        {/* Contact Information */}
                                                        <Spacer spaceHeight={15}/>
                                                        <Text
                                                            style={styles(scales).title}>{translator.translate(language, "Контактні дані")}</Text>
                                                        <Spacer spaceHeight={10}/>
                                                        <SimpleInput
                                                            callback={handleFormInputs}
                                                            placeholder={translator.translate(language, "Ім'я")}
                                                            clearError={clearValidationErrors}
                                                            value={orderData.name}
                                                            name="name"
                                                            error={validationErrors.name}
                                                        />
                                                        <Spacer spaceHeight={10}/>
                                                        <PhoneInput
                                                            callback={handlePhoneInput}
                                                            clearError={clearValidationErrors}
                                                            value={orderData.phone}
                                                            name="phone"
                                                            placeholder={translator.translate(language, "Телефон")}
                                                            error={validationErrors.phone}
                                                        />
                                                        <Spacer spaceHeight={30}/>

                                                        {/* Delivery Details */}
                                                        <Text
                                                            style={styles(scales).title}>{translator.translate(language, "Адреса доставки")}</Text>
                                                        <Spacer spaceHeight={10}/>
                                                        <SelectInput
                                                            dataList={deliveryCities}
                                                            callback={handleFormInputs}
                                                            placeholder={translator.translate(language, "Місто / населений пункт")}
                                                            modalTitle={translator.translate(language, "Виберіть місто / населений пункт")}
                                                            clearError={clearValidationErrors}
                                                            defaultValue={orderData.city}
                                                            name="city"
                                                            error={validationErrors.city}
                                                        />
                                                        <Spacer spaceHeight={10}/>
                                                        {
                                                            orderData.city && orderData.city.id === 0
                                                                ? (
                                                                    <>
                                                                        <SimpleInput
                                                                            callback={handleFormInputs}
                                                                            placeholder={translator.translate(language, "Назва населеного пункту")}
                                                                            clearError={clearValidationErrors}
                                                                            value={orderData.other_city_name}
                                                                            name="other_city_name"
                                                                            error={validationErrors.other_city_name}
                                                                        />
                                                                        <Spacer spaceHeight={10}/>
                                                                    </>
                                                                )
                                                                : null
                                                        }
                                                        <SimpleInput
                                                            callback={handleFormInputs}
                                                            placeholder={translator.translate(language, "Вулиця")}
                                                            clearError={clearValidationErrors}
                                                            value={orderData.street}
                                                            name="street"
                                                            error={validationErrors.street}
                                                        />
                                                        <Spacer spaceHeight={10}/>
                                                        <View style={app_styles(scales).row_between}>
                                                            <SimpleInput
                                                                callback={handleFormInputs}
                                                                placeholder={"№ " + translator.translate(language, "будинку")}
                                                                value={orderData.house}
                                                                error={validationErrors.house}
                                                                name="house"
                                                                clearError={clearValidationErrors}
                                                            />
                                                            <VerticalSpacer spaceWidth={20}/>
                                                            <SimpleInput
                                                                callback={handleFormInputs}
                                                                placeholder={"№ " + translator.translate(language, "квартири")}
                                                                clearError={clearValidationErrors}
                                                                value={orderData.flat}
                                                                number
                                                                name="flat"
                                                            />
                                                        </View>
                                                        <Spacer spaceHeight={10}/>
                                                        <View style={app_styles(scales).row_between_start}>
                                                            <DateTimePikerInput
                                                                scales={scales}
                                                                callback={handleFormInputs}
                                                                placeholder={translator.translate(language, "Час доставки")}
                                                                clearError={clearValidationErrors}
                                                                name="time"
                                                                error={validationErrors.time}
                                                            />
                                                        </View>
                                                        <Spacer spaceHeight={10}/>
                                                        <SimpleInput
                                                            callback={handleFormInputs}
                                                            placeholder={translator.translate(language, "Побажання до замовлення")}
                                                            clearError={clearValidationErrors}
                                                            value={orderData.comment}
                                                            name="comment"
                                                            error={validationErrors.comment}
                                                        />
                                                        <Spacer spaceHeight={30}/>

                                                        {/* Details */}
                                                        <Text
                                                            style={styles(scales).title}>{translator.translate(language, "Деталі")}</Text>
                                                        <Spacer spaceHeight={20}/>
                                                        <View>
                                                            <View>
                                                                <HorizontalDivider height={1}/>
                                                                <View style={styles(scales).li_elem}>
                                                                    <View style={styles(scales).icon_container}>
                                                                        <IcoMoonIcon name="mute"
                                                                                     color={app_styles(scales).colors.app.orange}
                                                                                     size={Math.round(scales.widthScale * 22)}/>
                                                                    </View>
                                                                    <View style={styles(scales).text_container}>
                                                                        <Text
                                                                            style={styles(scales).li_text}>{translator.translate(language, "Не дзвонити в двері")}</Text>
                                                                    </View>
                                                                    <ButtonToggler
                                                                        callback={() => handleFormInputs('do_not_call', !orderData.do_not_call)}
                                                                        isActive={orderData.do_not_call}
                                                                    />
                                                                </View>

                                                                <HorizontalDivider height={1} />
                                                                <View style={styles(scales).li_elem}>
                                                                    <View style={styles(scales).icon_container}>
                                                                        <IcoMoonIcon name="stroller"
                                                                                     color={app_styles(scales).colors.app.orange}
                                                                                     size={Math.round(scales.widthScale * 23)}/>
                                                                    </View>
                                                                    <View style={styles(scales).text_container}>
                                                                        <Text
                                                                            style={styles(scales).li_text}>{translator.translate(language, "У мене мала дитина (до 12 років)")}</Text>
                                                                    </View>
                                                                    <ButtonToggler
                                                                        callback={() => handleFormInputs('have_a_child', !orderData.have_a_child)}
                                                                        isActive={orderData.have_a_child}
                                                                    />
                                                                </View>

                                                                <HorizontalDivider height={1} />
                                                                <View style={styles(scales).li_elem}>
                                                                    <View style={styles(scales).icon_container}>
                                                                        <IcoMoonIcon name="dog"
                                                                                     color={app_styles(scales).colors.app.orange}
                                                                                     size={Math.round(scales.widthScale * 22)}/>
                                                                    </View>
                                                                    <View style={styles(scales).text_container}>
                                                                        <Text
                                                                            style={styles(scales).li_text}>{translator.translate(language, "У мене є собака")}</Text>
                                                                    </View>
                                                                    <ButtonToggler
                                                                        callback={() => handleFormInputs('have_a_dog', !orderData.have_a_dog)}
                                                                        isActive={orderData.have_a_dog}
                                                                    />
                                                                </View>

                                                                <HorizontalDivider height={1}/>
                                                            </View>
                                                            <Spacer spaceHeight={30}/>

                                                            {/* Payment Method */}
                                                            <Text
                                                                style={styles(scales).title}>{translator.translate(language, "Спосіб оплати")}</Text>
                                                            <Spacer spaceHeight={20}/>
                                                            <View>
                                                                <ButtonRadio
                                                                    value="cash"
                                                                    isSelected={orderData.payment_type === 'cash' || false}
                                                                    label={translator.translate(language, "Оплата готівкою")}
                                                                    callback={handlePaymentMethod}
                                                                />
                                                                <Spacer spaceHeight={12}/>
                                                                <ButtonRadio
                                                                    value="online"
                                                                    isSelected={orderData.payment_type === 'online' || false}
                                                                    label={translator.translate(language, "Оплата онлайн")}
                                                                    callback={handlePaymentMethod}
                                                                />
                                                            </View>
                                                            <Spacer spaceHeight={30}/>

                                                            {/* Total */}
                                                            <HorizontalDivider height={1}/>
                                                            <Spacer spaceHeight={15}/>
                                                            <View style={app_styles(scales).row_between}>
                                                                <Text
                                                                    style={styles(scales).li_text}>{translator.translate(language, "Товари")}</Text>
                                                                <Text
                                                                    style={styles(scales).li_text}>{prices.products_price ? formatPrice(language, (prices.products_price + prices.extra_ingredients + prices.sauce_price)) + ' ' + translator.translate(language, "грн") : '-'}</Text>
                                                            </View>
                                                            {
                                                                prices.packing_price > 0
                                                                    ? (
                                                                        <>
                                                                            <Spacer spaceHeight={5}/>
                                                                            <View style={app_styles(scales).row_between}>
                                                                                <Text
                                                                                    style={styles(scales).li_text}>{translator.translate(language, "Пакування")}</Text>
                                                                                <Text
                                                                                    style={styles(scales).li_text}>{prices.packing_price ? formatPrice(language, prices.packing_price) + ' ' + translator.translate(language, "грн") : '-'}</Text>
                                                                            </View>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                            <Spacer spaceHeight={5}/>
                                                            <View
                                                                style={[app_styles(scales).row_between, {alignItems: 'flex-start'}]}>
                                                                <Text
                                                                    style={styles(scales).li_text}>{translator.translate(language, "Доставка")}</Text>
                                                                <Text
                                                                    style={styles(scales).li_text}>{prices.delivery_price ? formatPrice(language, prices.delivery_price) + ' ' + translator.translate(language, "грн") : translator.translate(language, 'безкоштовно')}</Text>

                                                            </View>
                                                            <Spacer spaceHeight={5}/>
                                                            <View style={app_styles(scales).row_between}>
                                                                <Text
                                                                    style={styles(scales).total_title}>{translator.translate(language, "Разом до оплати")}</Text>
                                                                <Text
                                                                    style={styles(scales).total_price}>{formatPrice(language, prices.total_price)} {translator.translate(language, "грн")}</Text>
                                                            </View>

                                                            <Spacer spaceHeight={15}/>
                                                            <HorizontalDivider height={1}/>
                                                            <Spacer spaceHeight={30}/>
                                                            <ButtonPrimary
                                                                callback={formSubmit}
                                                                title={translator.translate(language, "Замовити")}
                                                                color={app_styles(scales).colors.app.orange}
                                                                isDataLoading={isDataLoading}
                                                            />
                                                        </View>
                                                        <Spacer spaceHeight={44}/>
                                                    </Block>
                                                </ScrollView>
                                            ) : null
                                    )
                                    : <DataLoadingIndicator/>
                            )
                            : <NetworkErrorModal
                                isOpened={networkError}
                                closeCallback={networkError ? clearNetworkError : clearDeliveryCitiesNetworkError}
                            />
                    }
                </View>
            </SafeView>

            {/* Success order modal */}
            <SuccessOrderModal
                isOpened={showSuccessOrderModal}
                closeCallback={closeSuccessOrderModal}
            />

            {/* Before online payment modal */}
            <OnlinePaymentInfoModal
                isOpened={showOnlinePaymentInfoModal}
                nextCallback={() => handleNextStep()}
                cancelCallback={() => setShowOnlinePaymentInfoModal(false)}
            />

            {/* Clear cart modal */}
            <ClearCartModal
                isOpened={showClearCartModal}
                clearCallback={() => clearCartCallback()}
                cancelCallback={() => setShowClearCartModal(false)}
            />

            {/* Payment modal */}
            <Modal
                animationType="fade"
                transparent={false}
                visible={showPaymentModal}
            >
                <View style={styles(scales).modal_content_container}>
                    {/* Modal card */}
                    <View style={styles(scales).modal_card}>
                        {/* Body */}
                        <WebView
                            source={{uri: paymentWidgetHtml}}
                            bounces={true}
                            style={{flex: 1}}
                            injectedJavaScript={injectedJavascript}
                            startInLoadingState
                            javaScriptEnabledAndroid={true}
                            javaScriptEnabled={true}
                            onMessage={event => {
                                handleMessageFromWebView(event.nativeEvent.data);
                            }}
                            useWebKit={Platform.OS === 'ios' ? true : false}
                        />
                        <HorizontalDivider height={1}/>
                        {/* Footer */}
                        <TouchableOpacity onPress={handleClosePaymentModal}
                                          style={styles(scales).close_modal_button_container}>
                            <View style={styles(scales).modal_card_footer}>
                                <Text
                                    style={styles(scales).footer_title}>{translator.translate(language, "закрити")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}


//----EXPORT----//
export default MakeOrderScreen;
