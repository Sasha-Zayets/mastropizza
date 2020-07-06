//----IMPORTS----//
//React
import React, { useContext, useEffect, useState } from 'react';
//React native
import { ScrollView, View } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
//Navigation Events
import { NavigationEvents } from 'react-navigation';
//Api
import axios from "axios";
//Components
import { SafeView, DataLoadingIndicator } from "../components/shared";
import Header from "../components/shared/Header";
import { NetworkErrorModal } from "../components/modals";
import NewsCard from "../components/news/NewsCard";
//Global vars
import { BASE_URL, APP_VERSION } from "../different/global_vars";
//Helpers
import { prepareLanguageToHttpRequest } from "../helpers/helpers";
//Styles
import styles from '../styles/screens/post-screen';
//Localization
import translator from "../translator/translator";


//----COMPONENT----//
const PostScreen = ({ navigation }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [post, setPost] = useState(null);


    //Methods and hooks
    useEffect(() => {
        return () => {
            handleBlur()
        };
    }, [language]);


    const handleFocus = async () => {
        try {
            setIsDataLoading(true);
            let event_id = navigation.getParam('postId');
            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/event/event?event_id=${event_id}&lang=${lang}&version=${APP_VERSION}`;
            const response = await axios.get(url);

            if (response && response.data && response.data.data) {
                let post_data = response.data.data.event;
                if (post_data && Object.keys(post_data).length) {
                    setPost(post_data)
                    return post_data;
                } else {
                    throw new Error('No post');
                }
            } else {
                setNetworkError(true);
                setPost(null);
            }
        } catch (error) {
            setNetworkError(true);
        } finally {
            setIsDataLoading(false)
        }
    }

    const handleBlur = () => {
        setPost(null);
        if(networkError){
            setNetworkError(false);
        }
    }




    //Template
    return (
        <>
            <SafeView>
                <NavigationEvents
                    onWillFocus={() => handleFocus()}
                />
                <Header
                    title={translator.translate(language, "Новини")}
                    backAllowed
                    navigation={navigation}
                    noIcons
                    appMenu
                />
                <View style={styles(scales).body}>
                    <ScrollView 
                        showsVerticalScrollIndicator={false} 
                        bounces={false} 
                        keyboardShouldPersistTaps={'always'} 
                        contentContainerStyle={styles(scales).container}
                    >
                        {
                            !networkError
                                ? (
                                    !isDataLoading
                                        ? (
                                            post
                                                ? <NewsCard
                                                    post={post}
                                                    navigation={navigation}
                                                />
                                                : null
                                        )
                                        : <DataLoadingIndicator />
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
    )
}



//----EXPORT----//
export default PostScreen;