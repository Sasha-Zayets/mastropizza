//----IMPORTS----//
//React
import React, { useState, useContext, useEffect } from 'react';
//React native
import { ScrollView, Text, View, Linking } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, Spacer, DataLoadingIndicator } from "../components/shared";
import NoContentBlock from "../components/shared/NoContentBlock";
import { NetworkErrorModal } from "../components/modals";
//Axios
import axios from 'axios';
//Global vars
import { BASE_URL, APP_VERSION } from "../different/global_vars";
//Translations
import translator from "../translator/translator";
//Helpers
import { prepareLanguageToHttpRequest, escapeHtml } from "../helpers/helpers";
//Styles
import styles from '../styles/screens/terms-and-conditions-page-screen';



//----COMPONENT----//
const TermsAndConditionsPageScreen = ({ navigation }) => {
    //Data and State
    const { state: { language, scales, appSettings } } = useContext(AppSettingsContext);
    const [state, setState] = useState({
        isDataFetching: true,
        pageTitle: null,
        page: null,
        networkError: false
    });


    //Hooks and Methods
    useEffect(() => {
        if (!state.page) {
            fetchPage()
        }
    }, []);


    const fetchPage = async () => {
        let lang = prepareLanguageToHttpRequest(language);
        let page_id = fetchPageId();
        if (page_id) {
            let url = `${BASE_URL}/page/one?lang=${lang}&page_id=${page_id}&is_mobile=true`;
            try {
                let response = await axios.get(url);
                if (response.data && response.data.page) {
                    let page_info = response.data.page;
                    setState({ ...state, isDataFetching: false, page: page_info.description1, pageTitle: page_info.title, networkError: false });
                } else {
                    setState({ ...state, isDataFetching: false, page: null, networkError: false });
                }
            } catch (error) {
                setState({ ...state, networkError: true, isDataFetching: false })
            }
        }
    }


    const fetchPageId = () => {        
        let needle = navigation.getParam('page');
        if (needle) {
            return appSettings.terms_and_conditions_pages[needle];
        }
        return null;
    }


    const clearNetworkError = () => {
        setState({ ...state, networkError: false });
    }


    //Template
    return (

        <SafeView>
            <Header
                title={state.networkError ? 'Ooops' : (state.pageTitle || "  ")}
                backAllowed
                navigation={navigation}
                noIcons
            />
            <View style={styles(scales).body}>
                {
                    !state.networkError
                        ? (
                            !state.isDataFetching
                                ? (
                                    state.page
                                        ? (
                                            <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps={'always'}>
                                                <Block>
                                                    <Spacer spaceHeight={20} />
                                                    <Text style={styles(scales).text}>{escapeHtml(state.page)}</Text>
                                                </Block>
                                            </ScrollView>
                                        ) : <NoContentBlock 
                                            navigation={navigation}
                                            title={translator.translate(language, "Контент не доступний")}
                                            note={translator.translate(language, "Скоріш за все, версія сторінки для встановленої мови відсутня")}
                                            toMainLink
                                        />
                                )
                                : <DataLoadingIndicator />
                        )
                        : <NetworkErrorModal
                            isOpened={state.networkError}
                            closeCallback={clearNetworkError}
                        />
                }
            </View>
        </SafeView>
    );
}

//----EXPORT----//
export default TermsAndConditionsPageScreen;