//----IMPORTS----//
//React
import React, { useContext, useEffect, useState } from 'react';
//React native
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Services
import axiosWithToken from "../../services/axiosWithToken";
//Helpers
import { prepareLanguageToHttpRequest } from "../../helpers/helpers";
//Global vars
import { BASE_URL, APP_VERSION } from "../../different/global_vars";
//Rating
import StarRating from 'react-native-star-rating';
//Translator
import translator from "../../translator/translator";
//Components
import { Spacer } from "../shared";
//Styles
import styles from "../../styles/components/modals/rate-order-modal";
import { app_styles } from "../../styles/app_styles";




//----COMPONENT----//
const RateOrderModal = ({ isOpened, closeCallback, order, updateOrderRating }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const [rating, setRating] = useState(parseInt(order.rating));
    const [disabled, setDisabled] = useState(false);
    const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
    const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);



    //Hooks and methods
    useEffect(() => {
        if(order.rating){
            startAnimation();
        }
    }, [rating]);


    const rateOrder = async (value) => {
        if(value === parseInt(order.rating)) return;
        try {
            setIsDataLoading(true)

            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/order/set-rating?lang=${lang}&version=${APP_VERSION}`;

            let form = new FormData();
            form.append('order_id', order.order_id);
            form.append('rating', value);

            const response = await axiosWithToken.post(url, form);

            if (response && response.data && response.data.status) {
                let status = response.data.status;
                if (status === 'success') {
                    
                    if (!rating || animatedHeight._value === 0) {
                        startAnimation();
                    }
                    setRating(value);
                    return updateOrderRating(order.order_id, value)
                } else {
                    setLoadingError(true)
                }
            } else {
                setLoadingError(true)
            }
        } catch (error) {
            setLoadingError(true)
        } finally {
            setIsDataLoading(false);
        }
    }



    const getAppropriateIconName = () => {
        return String(rating);
    }



    const startAnimation = () => {
        Animated.parallel([
            Animated.timing(animatedOpacity, {
                toValue: 1,
                duration: 300,
                delay: 600,
                easing: Easing.linear
            }),
            Animated.timing(animatedHeight, {
                toValue: Math.round(scales.heightScale * 85),
                duration: 600,
                easing: Easing.linear
            })
        ]).start();
    }


    //Template
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpened}
        >
            <View style={styles(scales).modal_content_container}>
                <View style={styles(scales).modal_card}>
                    {/* Card body */}
                    <View style={styles(scales).card_body}>
                        {
                            loadingError
                                ? (
                                    <View style={styles(scales).error_container}>
                                        <Text style={styles(scales).card_title}>Oooppsss...</Text>
                                        <Spacer spaceHeight={25} />
                                        <Text style={styles(scales).info}>{translator.translate(language, "Щось пішло не так і виникла помилка. Будь-ласка спробуйте ще раз.")}</Text>
                                        <Spacer spaceHeight={25} />
                                        <TouchableOpacity onPress={() => setLoadingError(false)} activeOpacity={.8} style={styles(scales).clear_err_btn}>
                                            <Text style={styles(scales).btn_title}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                                : (
                                    <>
                                        <Text style={styles(scales).card_title}>{translator.translate(language, "Ваша оцінка")}</Text>
                                        <Spacer spaceHeight={25} />
                                        <StarRating
                                            activeOpacity={.8}
                                            disabled={disabled}
                                            buttonStyle={{ margin: Math.round(scales.widthScale * 4), padding: 0 }}
                                            containerStyle={{ alignSelf: 'center' }}
                                            starSize={Math.round(scales.widthScale * 40)}
                                            maxStars={5}
                                            rating={rating}
                                            emptyStarColor="#8c8c8e"
                                            selectedStar={(rating) => rateOrder(rating)}
                                            fullStarColor="#FFC837"

                                        />
                                        {
                                            rating
                                                ? (
                                                    <Animated.View style={{
                                                        height: animatedHeight,
                                                        opacity: animatedOpacity,
                                                        flexDirection: 'row',
                                                        alignSelf: 'stretch',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        <IcoMoonIcon name={getAppropriateIconName()} color="#8c8c8e" size={Math.round(scales.widthScale * 60)} />
                                                    </Animated.View>
                                                )
                                                : <Spacer spaceHeight={25} />
                                        }
                                        <Text style={styles(scales).info}>{translator.translate(language, "Оцініть, будь ласка, якість замовлення (швидкість доставки, якість продукції тощо) за шкалою від 1 до 5")}.</Text>
                                    </>
                                )
                        }
                    </View>
                    {/* Close button */}
                    <TouchableOpacity onPress={() => closeCallback()} style={styles(scales).close_modal_button}>
                        <IcoMoonIcon name="cancel" color={app_styles(scales).colors.text.primary} size={Math.round(scales.widthScale * 14)} />
                    </TouchableOpacity>
                    {/* Preloader */}
                    {
                        isDataLoading
                            ? (
                                <View style={styles(scales).preloader_container}>
                                    <ActivityIndicator size="large" color={app_styles(scales).colors.app.blue} />
                                </View>
                            )
                            : null
                    }
                </View>
            </View>
        </Modal>
    )
}




//----EXPORT----//
export default RateOrderModal;