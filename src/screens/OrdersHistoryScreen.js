//----IMPORTS----//
//React
import React, {useContext, useState} from 'react';
//React native
import {View, FlatList} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as AuthContext} from "../context/AuthContext";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//Componetns
import Header from "../components/shared/Header";
import {SafeView, Block, DataLoadingIndicator, HorizontalDivider, FlatListFooter} from "../components/shared";
import NoContentBlock from "../components/shared/NoContentBlock";
import {NetworkErrorModal} from "../components/modals";
import OrderCard from "../components/auth/OrderCard";
//Api
import axiosWithToken from "../services/axiosWithToken";
//Global vars
import {BASE_URL, APP_VERSION} from "../different/global_vars";
//Helpers
import {prepareLanguageToHttpRequest} from "../helpers/helpers";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/orders-history-screen';


//----COMPONENT----//
const OrdersHistoryScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language}} = useContext(AppSettingsContext);
    const {state: {user}} = useContext(AuthContext);

    const [history, setHistory] = useState(false);
    const [historyMetaData, setHistoryMetaData] = useState({
        language: null
    });
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isMoreDataLoading, setIsMoreDataLoading] = useState(false);
    const [isDataRefreshing, setIsDataRefreshing] = useState(false);
    const [error, setError] = useState(false);


    //Hooks and Methods
    const fetchHistory = async (isRefresh = false, isMore = false, page = 1) => {
        try {
            if (isMore) {
                setIsMoreDataLoading(true);
            } else if (isRefresh) {
                setIsDataRefreshing(true);
            } else {
                setIsDataLoading(true);
            }

            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/order/history?lang=${lang}&version=${APP_VERSION}&page=${page}&limit=6`;

            const response = await axiosWithToken.get(url);

            if (response && response.data && response.data.data) {
                let history_data = response.data.data;
                let meta = {language, ...response.data.meta}

                if (history_data && history_data.length) {
                    let data = isMore ? [...history, ...history_data] : history_data;
                    setHistory(data);
                    setHistoryMetaData(meta);
                    setError(false);
                    return history_data;
                } else {
                    setHistory(true);
                    setError(false);
                }
            } else {
                setHistory(false);
                setError(true);
            }
        } catch (error) {
            setHistory(false);
            setError(true);
        } finally {
            if (isMore) {
                setIsMoreDataLoading(false);
            } else if (isRefresh) {
                setIsDataRefreshing(false);
            } else {
                setIsDataLoading(false);
            }
        }
    }

    const handleFocus = () => {
        if (!history || !history.length || historyMetaData.language !== language) {
            return fetchHistory();
        }
    }


    const downloadMoreHistory = () => {
        if (isMoreDataLoading) return;

        let currentPage = parseInt(historyMetaData.current_page);
        let lastPage = parseInt(historyMetaData.total_pages);
        let nextPage = currentPage + 1;

        if (nextPage > lastPage) return;
        return fetchHistory(false, true, nextPage);
    }


    const renderListFooterComponent = () => {
        return isMoreDataLoading ? <FlatListFooter/> : null
    }


    const updateRating = (orderId, rating) => {
        return setHistory(history.map(item => {
            if (item.order_id === orderId) {
                item.rating = rating;
            }
            return item;
        }));
    }


    //Template
    return (
        <>
            <SafeView>
                <NavigationEvents
                    onWillFocus={() => handleFocus()}
                />
                <Header
                    title={translator.translate(language, "Історія замовлень")}
                    backAllowed
                    navigation={navigation}
                    noIcons
                />
                <View style={styles(scales).body}>
                    {
                        !error
                            ? (
                                !isDataLoading
                                    ? (
                                        history
                                            ? (
                                                history.length
                                                    ? (
                                                        <FlatList
                                                            showsVerticalScrollIndicator={false}
                                                            keyExtractor={order => "key" + order.order_id}
                                                            data={history}
                                                            renderItem={({item}) => <OrderCard order={item} navigation={navigation} updateRatingCallback={updateRating}/>}
                                                            ItemSeparatorComponent={() => {
                                                                return (
                                                                    <Block>
                                                                        <HorizontalDivider height={1} marginVertical={16}/>
                                                                    </Block>
                                                                )
                                                            }}
                                                            contentContainerStyle={{paddingVertical: Math.round(scales.heightScale * 15)}}
                                                            bounces={false}
                                                            ListFooterComponent={() => renderListFooterComponent()}
                                                            onRefresh={() => fetchHistory(true)}
                                                            refreshing={isDataRefreshing}
                                                            onEndReached={downloadMoreHistory}
                                                            onEndReachedThreshold={0.05}
                                                        />
                                                    ) : <NoContentBlock
                                                        title={translator.translate(language, "Ви не здійснили жодного замовлення")}
                                                        note={translator.translate(language, "Можливо вас зацікавлять наші пропозиції і Ви щось виберете?")}
                                                        toMenuLink={true}
                                                        navigation={navigation}
                                                    />
                                            )
                                            : null
                                    )
                                    : <DataLoadingIndicator/>
                            )
                            : <NetworkErrorModal
                                isOpened={error}
                                closeCallback={() => setError(false)}
                            />
                    }
                </View>
            </SafeView>
        </>
    );
}


//----EXPORT----//
export default OrdersHistoryScreen;