//----IMPORTS----//
//React
import React, {useEffect, useState, useContext, useRef} from 'react';
//React native
import {Animated, View, Text, Image, AsyncStorage, ActivityIndicator, ImageBackground, StatusBar} from 'react-native';
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as AuthContext} from "../context/AuthContext";
//Tab View
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
//Componetns
import Header from "../components/shared/Header";
import {SafeView, DataLoadingIndicator, VerticalSpacer, Spacer} from "../components/shared";
import InitAppLoadingIndicator from "../components/shared/InitAppLoadingIndicator";
import {NetworkErrorModal} from "../components/modals";
import ProductsBlock from "../components/menu/ProductsBlock";
import NoContentBlock from "../components/shared/NoContentBlock";
import PopularCategoryList from "../components/shared/PopularCategoryList";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Localization
import translator from "../translator/translator";
//Helpers
import {prepareLanguageToHttpRequest} from "../helpers/helpers";
//Global Vars
import {BASE_URL, APP_VERSION} from "../different/global_vars";
//Api
import axiosWithErrorHandler from "../services/axiosWithErrorHandler";
//Styles
import styles from '../styles/screens/menu-screen';
import {app_styles} from "../styles/app_styles";
import {ButtonOrder, ButtonPrimary} from "../components/buttons";


//----COMPONENT----//
const MenuScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, appSettings, screen_width, settingsNetworkError, language}, setLanguage, getAppSettings, clearSettingsNetworkError} = useContext(AppSettingsContext);
    const {state: {user, networkError, unreadNotifications, isLoggedIn}, fetchUserByToken, getUserNotifications, clearNetworkError} = useContext(AuthContext);
    // const animateValue = useRef(new Animated.Value(0)).current;
    const [animatedValue, setAnimatedValue] = useState(1);
    const [heightSlider, setHeightSlider] = useState(100);

    const [index, setIndex] = useState(0);

    const [isSettingsDataFetching, setIsSettingsDataFetched] = useState(true);
    const [isDataFetching, setIsDataFetching] = useState(false);

    const [fetchingError, setFetchingError] = useState(false);
    const [categories, setCategories] = useState(false);
    const [categoriesMeta, setCategoriesMeta] = useState({
        language: null
    });
    const [routes, setRoutes] = useState([]);


    //Hooks and Methods
    useEffect(() => {
        if(Object.keys(appSettings).length){
            getCategories();
        }
    }, [appSettings, language])

    const callBack = (event) => {
        const positionScroll = event.nativeEvent.contentOffset.y;

        if(positionScroll > 10) {
            setAnimatedValue(0);
            setHeightSlider(0);
        } else {
            setAnimatedValue(1);
            setHeightSlider(100);
        }
    }

    const getCategories = async () => {
        const language = language || await AsyncStorage.getItem('language');

        if (categories.length && categoriesMeta.language === language) return;

        setIsDataFetching(true);
        try {
            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/product/categories?lang=${lang}&version=${APP_VERSION}&parent_id=0`;
            const response = await axiosWithErrorHandler.get(url);
            if (response) {
                let categories = response.data.data;
                if (categories.length) {
                    let routes = [];
                    categories.forEach(item => {
                        routes.push({
                            key: item.name,
                            title: item.name,
                            category: item,
                            pizza_category_id: appSettings.pizzaCategoryId || 0,
                            navigation,
                            scales,
                            language,
                            callBack,
                        });
                    });

                    setRoutes(routes);
                    setCategories(categories);
                    setCategoriesMeta({language});
                    setFetchingError(false);
                    return categories;
                } else {
                    setFetchingError(false);
                    setCategories(true);
                }
            }
        } catch (error) {
            setCategories(false);
            setFetchingError(true);
        } finally {
            setIsDataFetching(false)
        }
    }

    const getSceneMap = () => {
        let sceneMap = {}

        routes.map((item, index) => {
            sceneMap[item.key] = ProductsBlock
        })

        return sceneMap
    }

    const initialLayout = {width: screen_width};

    const renderScene = SceneMap(getSceneMap());

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: app_styles(scales).colors.app.white}}
            style={{backgroundColor: '#ffffff'}}
            renderLabel={({route, focused, color}) => {
                return (
                    <View style={[
                        styles(scales).button,
                        {backgroundColor: focused ? app_styles(scales).colors.app.orange : app_styles(scales).colors.app.silver_light}
                    ]}>
                        <Text
                            style={[
                                styles(scales).label,
                                {color: focused ? app_styles(scales).colors.text.white : app_styles(scales).colors.text.black_light},
                            ]}>
                            {route.title}
                        </Text>
                    </View>
                )
            }}
            scrollEnabled={true}
            bounces={true}
            tabStyle={styles(scales).tab}
        />
    );


    const getUserByToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await fetchUserByToken();
            getUserNotifications();
        }
    }


    const setAppSettings = async () => {
        const language = await AsyncStorage.getItem('language');
        language ? setLanguage(language, false) : setLanguage('ukrainian', false);
        await getAppSettings();
    }


    const handleCloseErrorModal = () => {
        if (fetchingError) {
            return setFetchingError(false);
        }
    }


    const handleFocus = async () => {
        await startAppDataFetching();
    }


    const startAppDataFetching = async () => {
        if (Object.keys(appSettings).length || Object.keys(user).length) return;
        setIsSettingsDataFetched(true)
        await setAppSettings();
        await getUserByToken();
        setIsSettingsDataFetched(false);
    }


    const handleTryAgain = async () => {
        if (settingsNetworkError) {
            clearSettingsNetworkError();
        }

        if (networkError) {
            clearNetworkError();
        }
        setIsSettingsDataFetched(true);
        await startAppDataFetching();
        setIsSettingsDataFetched(false);
    }


    return (
        <>
            <NavigationEvents
                onWillFocus={handleFocus}
            />

            {
                !(settingsNetworkError || networkError)
                    ? (
                        !isSettingsDataFetching
                            ? (
                                <SafeView>
                                    <Header
                                        navigation={navigation}
                                        exclamation
                                        displayBell
                                        isLogged={isLoggedIn}
                                        unreadNotifications={unreadNotifications}
                                    />
                                    {/* Popular category slider */}

                                    <PopularCategoryList
                                        animValue={animatedValue}
                                        heightSlide={heightSlider}/>

                                    <View style={styles(scales).body}>
                                        {
                                            !fetchingError
                                                ? (
                                                    !isDataFetching
                                                        ? (
                                                            categories
                                                                ? (
                                                                    categories.length
                                                                        ? <TabView
                                                                            renderTabBar={renderTabBar}
                                                                            navigationState={{index, routes}}
                                                                            renderScene={renderScene}
                                                                            onIndexChange={setIndex}
                                                                            initialLayout={initialLayout}
                                                                            lazy
                                                                        />
                                                                        : <NoContentBlock
                                                                            title={translator.translate(language, "Вибачте")}
                                                                            note={translator.translate(language, "На даний момент меню не доступне")}
                                                                            navigation={navigation}
                                                                        />
                                                                )
                                                                : null
                                                        )
                                                        : <DataLoadingIndicator/>
                                                )
                                                : null
                                        }
                                    </View>
                                </SafeView>
                            )
                            : <InitAppLoadingIndicator/>
                    )
                    : (
                        <>
                            <StatusBar backgroundColor={app_styles(scales).colors.app.orange} barStyle="light-content"/>
                            <View style={styles(scales).error_container}>
                                <IcoMoonIcon
                                    name="logo"
                                    size={Math.round(scales.widthScale * 100)}
                                    color={app_styles(scales).colors.app.black}
                                />
                                <Spacer spaceHeight={40}/>
                                <Text style={styles(scales).error_title}>OOOPPPSSS....</Text>
                                <Spacer spaceHeight={15}/>
                                <View>
                                    <Text style={styles(scales).error_text}>Щось пішло не так... Сталася внутрішня помилка,
                                        або відсутнє з'єднання з інтернетом.</Text>
                                </View>
                                <Spacer spaceHeight={30}/>
                                <View style={{paddingHorizontal: Math.round(scales.widthScale * 50), alignSelf: 'stretch'}}>
                                    <ButtonOrder
                                        color={app_styles(scales).colors.app.black}
                                        title={"Спробувати ще"}
                                        callback={handleTryAgain}
                                    />
                                </View>
                            </View>
                        </>
                    )
            }

            {/* Network Error Modal */}
            <NetworkErrorModal
                isOpened={fetchingError}
                closeCallback={handleCloseErrorModal}
            />
        </>
    );
}


//----EXPORT----//
export default MenuScreen;
