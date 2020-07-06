//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {FlatList, View, Text} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
//Api
import axios from "axios";
//Global vars
import {BASE_URL, APP_VERSION} from "../different/global_vars";
//Helpers
import {prepareLanguageToHttpRequest} from "../helpers/helpers";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//Components
import {SafeView, DataLoadingIndicator, FlatListFooter, Block, Spacer} from "../components/shared";
import Header from "../components/shared/Header";
import NoContentBlock from "../components/shared/NoContentBlock";
import {NetworkErrorModal} from "../components/modals";
import NewsCard from "../components/news/NewsCard";
//Localization
import translator from "../translator/translator";
//Styles
import styles from "../styles/screens/news-screen";


//----COMPONENT----//
const NewsScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language}} = useContext(AppSettingsContext);
    const [news, setNews] = useState(false);
    const [newsMetaData, setNewsMetaData] = useState({
        language: null
    });
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isMoreDataLoading, setIsMoreDataLoading] = useState(false);
    const [isDataRefreshing, setIsDataRefreshing] = useState(false);
    const [error, setError] = useState(false);


    //Methods and hooks
    useEffect(() => {

    }, [language]);


    const fetchNews = async (isRefresh = false, isMore = false, page = 1) => {
        try {
            if (isMore) {
                setIsMoreDataLoading(true);
            } else if (isRefresh) {
                setIsDataRefreshing(true);
            } else {
                setIsDataLoading(true);
            }

            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/event/events?lang=${lang}&version=${APP_VERSION}&page=${page}&limit=4`;

            const response = await axios.get(url);

            if (response && response.data && response.data.data) {
                let news_data = response.data.data;
                let meta = {language, ...response.data.meta}

                if (news_data && news_data.length) {
                    let data = isMore ? [...news, ...news_data] : news_data;
                    setNews(data);
                    setNewsMetaData(meta);
                    setError(false);
                    return news_data;
                } else {
                    setNews(true);
                    setError(false);
                }
            } else {
                setNews(false);
                setError(true);
            }
        } catch (error) {
            setNews(false);
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
        if (!news || !news.length || newsMetaData.language !== language) {
            return fetchNews();
        }
    }


    const downloadMoreNews = () => {
        if (isMoreDataLoading) return;

        let currentPage = parseInt(newsMetaData.current_page);
        let lastPage = parseInt(newsMetaData.total_pages);
        let nextPage = currentPage + 1;

        if (nextPage > lastPage) return;
        return fetchNews(false, true, nextPage);
    }


    const renderListFooterComponent = () => {
        return isMoreDataLoading ? <FlatListFooter/> : null
    }


    //Template
    return (
        <>
            <SafeView>
                <NavigationEvents
                    onWillFocus={handleFocus}
                />
                <Header
                    title={translator.translate(language, "Новини")}
                    backAllowed
                    navigation={navigation}
                    noIcons
                    appMenu
                />
                <View style={styles(scales).body}>
                    {
                        !error
                            ? (
                                !isDataLoading
                                    ? (
                                        news
                                            ? (
                                                news.length
                                                    ? (
                                                        <Block>
                                                            <FlatList
                                                                showsVerticalScrollIndicator={false}
                                                                keyExtractor={post => "key" + post.id}
                                                                data={news}
                                                                renderItem={({item, index}) => <NewsCard navigation={navigation} preview
                                                                                                         post={item}/>}
                                                                contentContainerStyle={{paddingVertical: Math.round(scales.heightScale * 20)}}
                                                                ListFooterComponent={() => renderListFooterComponent()}
                                                                ItemSeparatorComponent={() => <Spacer spaceHeight={24}/>}
                                                                bounces={false}
                                                                onEndReached={downloadMoreNews}
                                                                onEndReachedThreshold={0.05}
                                                                onRefresh={() => fetchNews(true)}
                                                                refreshing={isDataRefreshing}
                                                            />
                                                        </Block>
                                                    )
                                                    : <NoContentBlock
                                                        icon="news"
                                                        title={translator.translate(language, "Вибачте")}
                                                        note={translator.translate(language, "Наданий момент актуальні новини відстуні.")}
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
    )
}


//----EXPORT----//
export default NewsScreen;