//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, FlatList, Text, ScrollView, Image, KeyboardAvoidingView, SafeAreaView, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as MenuContext} from "../context/MenuContext";
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Helpers
import {getUniqueId, formatPrice, prepareLanguageToHttpRequest} from "../helpers/helpers";
//Components
import Header from "../components/shared/Header";
import {DataLoadingIndicator, Block, VerticalSpacer, SafeView, Spacer} from "../components/shared";
import {SelectIngredientsCategoryInput} from "../components/inputs";
import {NetworkErrorModal} from "../components/modals";
import {ButtonAddToCart} from "../components/buttons";
import {TextAreaInput} from "../components/inputs";
import ProductCard from "../components/menu/ProductCard";
import IngredientCard from "../components/menu/IngredientCard";
import Carousel from "react-native-sideswipe";

//Api
import axiosWithErrorHandler from '../services/axiosWithToken';
//Global vars
import {BASE_URL, APP_VERSION} from "../different/global_vars";
//Styles
import styles from '../styles/screens/product-screen';
import {app_styles} from '../styles/app_styles';
//Localization
import translator from "../translator/translator";
import axios from "axios";
import ProductCardTemplate from "../components/menu/ProductCardTemplate";


//----COMPONENT----//
const ProductScreen = ({navigation}) => {
    // products data
    const productsData = navigation.getParam('products');
    const indexProduct = navigation.getParam('index');
    const productId = navigation.getParam('productId');

    const [isDataLoading, setIsDataLoading] = useState(false);
    //Data and State
    const {state: {scales, language, appSettings}} = useContext(AppSettingsContext);

    const [product, setProduct] = useState(null);

    const [ingredients, setIngredients] = useState([]);
    const [ingredientsCategories, setIngredientsCategories] = useState([]);
    const [limit, setLimit] = useState(0);

    const [totalProducts, setTotalProducts] = useState([]);
    const [index, setIndex] = useState(indexProduct - 1);
    const [routes, setRoutes] = useState(totalProducts);


    useEffect(() => {
        getIngredients();
        fetchTotalProduct();
    }, []);


    const fetchTotalProduct = () => {
        const productId = navigation.getParam('productId');

        const resultData = productsData.map((item, index) => {
            if(item.id === productId) {
                setIndex(index);
            }
            return {
                ...item,
                key: item.id,
                title: item.name
            }
        });

        setTotalProducts(resultData);
        setRoutes(resultData);
    }

    const getIngredients = async () => {
        setIsDataLoading(true);

        const lang = prepareLanguageToHttpRequest(language);
        const url = `${BASE_URL}/product/product?product_id=${productId}&lang=${lang}&version=${APP_VERSION}`;

        const { data } = await axiosWithErrorHandler.get(url);

        let result = [];
        let categories = [{id: null, name: translator.translate(language, "Всі складники")}];
        data.ingredient_categories.forEach(item => {
            if (item.ingredients && item.ingredients.length) {
                result = [...result, ...item.ingredients]
                categories.push({
                    id: item.id,
                    name: item.name
                });
            }
        });

        const limitValue = parseInt(data.data.ingredientLimit);
        if(limitValue){
            setLimit(limitValue);
        }

        setIngredients(result);
        setIngredientsCategories(categories);

        setIsDataLoading(false);
    }

    const productView = () => {
        let result = {}

        routes.map((item, ind) => {
            result[item.key] = () => productRender(ind, item.key);
        });

        return result
    }

    const renderScene = SceneMap(productView());

    const initialLayout = { width: Dimensions.get('window').width };

    const productRender = (indexValue) => (
        <ProductCardTemplate
            key={indexValue}
            product={totalProducts[indexValue]}
            appSettings={appSettings}
            ingredients={ingredients}
            isDataLoading={isDataLoading}
            limit={limit}
            navigation={navigation} />
    );

    const setChangeSliderProduct = (index) => {
        setIndex(index);
    }

    //Template
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <SafeView>
                <NavigationEvents />
                <Header
                    title={(product && product.category && product.category.name) ? product.category.name : ' '}
                    backAllowed
                    navigation={navigation}
                    exclamation
                    noBell
                />
                <TabView
                    renderTabBar={() => null}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={(index) => setChangeSliderProduct(index)}
                    initialLayout={initialLayout}
                />

            </SafeView>
        </KeyboardAvoidingView>
    )
}


//----EXPORT----//
export default ProductScreen;