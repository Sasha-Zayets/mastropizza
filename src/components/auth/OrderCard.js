//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
import {Context as AuthContext} from "../../context/AuthContext";
//Components
import {Block, IntelligentImage, Spacer, VerticalSpacer} from "../shared";
import {RateOrderModal} from "../modals";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Rating
import StarRating from 'react-native-star-rating';
//Moment
import moment from "moment";
import 'moment/locale/uk';
import 'moment/locale/ru';
//Localization
import translator from "../../translator/translator";
//Helpers
import {prepareLanguageToHttpRequest, getUniqueId} from "../../helpers/helpers";
//Styles
import styles from '../../styles/components/auth/order-card';
import {app_styles} from '../../styles/app_styles';


//----COMPONENT----//
const OrderCard = ({order, navigation, updateRatingCallback}) => {
    //Data and State
    const {state: {language, scales}} = useContext(AppSettingsContext);
    const {state: {ordersStatuses}} = useContext(AuthContext);
    const [showRateOrderModal, setShowRateOrderModal] = useState(false);


    //Hooks and Methods
    useEffect(() => {

    }, []);


    const transformUnixTime = (time) => {
        const lang = prepareLanguageToHttpRequest(language);
        moment.locale(lang);
        return moment(parseInt(time) * 1000).format('DD MMMM YYYY');
    }

    const defineOrderStatusColor = (name) => {
        let lang = prepareLanguageToHttpRequest(language);
        let needle = ordersStatuses[lang];
        let status = needle.find(item => item.name.toLowerCase() === name.toLowerCase());
        return status ? status.color : app_styles(scales).colors.text.primary;
    }


    const generateProductCard = (product) => {
        let img = product['product'] && product['product']['image_preview'] ? product['product']['image_preview'] : null;

        if (!img) return null;

        return (
            <View style={styles(scales).product_thumbnail_container}>
                <Image source={{uri: img}} style={styles(scales).product_thumbnail} />
            </View>
        );
    }


    const isRated = () => {
        return parseInt(order.rating) > 0;
    }



    //Template
    return (
        <>
            <View style={styles(scales).container}>
                <View style={styles(scales).line}>
                    <View>
                        <Spacer spaceHeight={2}/>
                        <View style={app_styles(scales).row_start}>
                            <Text style={styles(scales).text}>{transformUnixTime(order.time)}</Text>
                            <Text style={styles(scales).slash}> / </Text>
                            <Text
                                style={[styles(scales).text, {color: defineOrderStatusColor(order.status_text)}]}>{translator.translate(language, order.status_text)}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles(scales).button}
                                      onPress={() => navigation.navigate('OrderDetails', {order_id: order.order_id})}
                                      activeOpacity={.7}>
                        <IcoMoonIcon
                            name="arrow-right"
                            color={app_styles(scales).colors.text.primary}
                            size={Math.round(scales.widthScale * 14)}
                            style={{top: Math.round(scales.heightScale * 6)}}
                        />
                    </TouchableOpacity>
                </View>
                <Spacer spaceHeight={14}/>
                <FlatList
                    contentContainerStyle={{paddingRight: Math.round(scales.widthScale * 16)}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={product => "key" + getUniqueId()}
                    data={order.order_products}
                    renderItem={({item}) => generateProductCard(item)}
                    ItemSeparatorComponent={() => <VerticalSpacer spaceWidth={9}/>}
                />
            </View>

            {/* Order rating */}
            {
                isRated()
                    ? (
                        <View style={[app_styles(scales).row_between, {
                            paddingHorizontal: Math.round(scales.widthScale * 16),
                            marginTop: Math.round(scales.heightScale * 10)
                        }]}>
                            <View style={[styles(scales).review_container, {backgroundColor: null}]}>
                                <View style={app_styles(scales).row_start}>
                                    <Text
                                        style={styles(scales).review_subtitle}>{translator.translate(language, "Ваша оцінка")}: </Text>
                                    <VerticalSpacer spaceWidth={10}/>
                                    <StarRating
                                        activeOpacity={.8}
                                        disabled={true}
                                        buttonStyle={{margin: Math.round(scales.widthScale * 2), padding: 0}}
                                        containerStyle={{alignSelf: 'flex-start'}}
                                        starSize={Math.round(scales.widthScale * 17)}
                                        maxStars={5}
                                        rating={parseInt(order.rating)}
                                        emptyStarColor="#8c8c8e"
                                        fullStarColor="#FFC837"
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={.8} onPress={() => setShowRateOrderModal(true)}>
                                    <Text style={styles(scales).edit}>{translator.translate(language, "Редагувати")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    : (
                        order.status === 4
                            ? (
                                <Block>
                                    <Spacer spaceHeight={10}/>
                                    <TouchableOpacity activeOpacity={.8} onPress={() => setShowRateOrderModal(true)}>
                                        <Text
                                            style={styles(scales).edit}>{translator.translate(language, "Оцінити замовлення")}</Text>
                                    </TouchableOpacity>
                                </Block>
                            )
                            : null
                    )
            }

            {/* Modal */}
            <RateOrderModal
                isOpened={showRateOrderModal}
                closeCallback={() => setShowRateOrderModal(false)}
                order={order}
                updateOrderRating={updateRatingCallback}
            />
        </>
    );
}


//----EXPORT----//
export default OrderCard;