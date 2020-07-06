//----IMPORTS----//
//React
import React, {useEffect, useState, useContext} from 'react';
//React native
import {View, Text, ScrollView} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as AuthContext} from "../context/AuthContext";
//Componetns
import Header from "../components/shared/Header";
import {SafeView, Block, Spacer, HorizontalDivider, DataLoadingIndicator} from "../components/shared";
import ProductCardOrderHistory from "../components/menu/ProductCardOrderHistory";
import {NetworkErrorModal} from "../components/modals";
//Moment
import moment from "moment";
import 'moment/locale/uk';
//Api
import axiosWithToken from "../services/axiosWithToken";
//Global Vars
import {BASE_URL, APP_VERSION} from "../different/global_vars";
//Localization
import translator from "../translator/translator";
//Helpers
import {formatPrice, prepareLanguageToHttpRequest} from "../helpers/helpers";
//Styles
import styles from '../styles/screens/orders-history-details-screen';
import {app_styles} from '../styles/app_styles';


//----COMPONENT----//
const OrdersHistoryDetailsScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language}} = useContext(AppSettingsContext);
    const {state: {ordersStatuses}} = useContext(AuthContext);
    const [order, setOrder] = useState(null);
    const [isDataFetching, setIsDataFetching] = useState(false);
    const [networkError, setNetworkError] = useState(false);


    //Hooks and Methods
    useEffect(() => {
        let order_id = navigation.getParam('order_id');
        if (order_id) {
            getOrderInfo(order_id);
        }
    }, [language])


    const transformUnixTime = (time) => {
        moment.locale("uk");
        return moment(time * 1000).format('DD MMMM YYYY');
    }

    const defineOrderStatusColor = (name) => {
        let lang = prepareLanguageToHttpRequest(language);
        let needle = ordersStatuses[lang];

        let status = needle.find(item => item.name.toLowerCase() === name.toLowerCase());
        return status ? status.color : app_styles(scales).colors.text.primary;
    }


    const populateHistoryProducts = () => {
        let products = order.order_products.map((product, index) => {
            return (
                <View key={index}>
                    <ProductCardOrderHistory product={product}/>
                    {
                        (index < (order.order_products.length - 1))
                            ? <Spacer spaceHeight={20}/>
                            : null
                    }
                </View>
            )
        });
        return products;
    }


    const getOrderInfo = async (id) => {
        try {
            setIsDataFetching(true)
            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/order/history-show?lang=${lang}&version=${APP_VERSION}&id=${id}`;
            const response = await axiosWithToken.get(url);

            if (response) {
                let info = response.data.order;
                setOrder(info);
                if (networkError) {
                    setNetworkError(false)
                }
            }
        } catch (error) {
            setNetworkError(true)
        } finally {
            setIsDataFetching(false)
        }
    }


    return (
        <>
            <SafeView>
                <Header
                    title={order ? `${translator.translate(language, "Замовлення")} ${order.order_id}` : " "}
                    backAllowed
                    navigation={navigation}
                    noIcons
                />
                <View style={styles(scales).body}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}
                                keyboardShouldPersistTaps={'always'} contentContainerStyle={{flexGrow: 1}}>
                        {
                            !networkError
                                ? (
                                    !isDataFetching
                                        ? (
                                            order
                                                ? (
                                                    <>
                                                        <Block>
                                                            <View style={app_styles(scales).row_start}>
                                                                <Text
                                                                    style={styles(scales).text}>{transformUnixTime(order.time)}</Text>
                                                                <Text style={styles(scales).slash}> / </Text>
                                                                <Text
                                                                    style={[styles(scales).text, {color: defineOrderStatusColor(order.status_text)}]}>{translator.translate(language, order.status_text)}</Text>
                                                            </View>
                                                        </Block>
                                                        <Spacer spaceHeight={20}/>
                                                        {populateHistoryProducts()}
                                                        <Spacer spaceHeight={20}/>
                                                        <Block>
                                                            <HorizontalDivider height={1}/>
                                                            <Spacer spaceHeight={20}/>
                                                            {
                                                                order.packing
                                                                    ? (
                                                                        <>
                                                                            <View style={app_styles(scales).row_between}>
                                                                                <Text
                                                                                    style={styles(scales).li_text}>{translator.translate(language, "Пакування")}</Text>
                                                                                <Text
                                                                                    style={styles(scales).li_text}>{order.packing ? formatPrice(language, order.packing) + ' ' + translator.translate(language, "грн") : '-'}</Text>
                                                                            </View>
                                                                            <Spacer spaceHeight={5}/>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                            <View style={app_styles(scales).row_between}>
                                                                <Text
                                                                    style={styles(scales).li_text}>{translator.translate(language, "Доставка")}</Text>
                                                                <Text
                                                                    style={styles(scales).li_text}>{parseInt(order.delivery) ? formatPrice(language, order.delivery) + ' ' + translator.translate(language, "грн") : translator.translate(language, 'безкоштовно')}</Text>
                                                            </View>
                                                            <Spacer spaceHeight={5}/>
                                                            <View style={app_styles(scales).row_between}>
                                                                <Text
                                                                    style={styles(scales).total_title}>{translator.translate(language, "Сума")}</Text>
                                                                <Text
                                                                    style={styles(scales).total_price}>{order.sum ? formatPrice(language, order.total) + ' ' + translator.translate(language, "грн") : '-'}</Text>
                                                            </View>
                                                        </Block>
                                                        <Spacer spaceHeight={30}/>
                                                    </>
                                                )
                                                : null
                                        )
                                        : <DataLoadingIndicator/>
                                )
                                : <NetworkErrorModal
                                    isOpened={networkError}
                                    closeCallback={() => setNetworkError(false)}
                                />
                        }
                    </ScrollView>
                </View>
            </SafeView>
        </>
    );
}


//----EXPORT----//
export default OrdersHistoryDetailsScreen;