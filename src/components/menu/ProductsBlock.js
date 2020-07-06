//----IMPORTS----//
//React
import React, {  Component } from 'react';
//React native
import { FlatList, Text } from 'react-native';
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Api
import axios from "axios";
//Moment
import 'moment/locale/uk';
//Localization
import translator from "../../translator/translator";
//Global vars
import { BASE_URL, APP_VERSION } from "../../different/global_vars";
//Components
import { Block, HorizontalDivider, DataLoadingIndicator, Spacer } from "../shared";
import { NetworkErrorModal } from "../modals";
import NoContentBlock from "../shared/NoContentBlock";
import FlatListFooter from "../shared/FlatListFooter";
import ProductCardMenu from "./ProductCardMenu";
//Helpers
import { prepareLanguageToHttpRequest } from "../../helpers/helpers";




//----COMPONENT----//
export default class ProductsBlock extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            scales: props.route.scales,
            callBack: props.route.callBack,
            language: props.route.language,
            navigation: props.route.navigation,
            category: props.route.category,
            pizza_category_id: props.route.pizza_category_id,
            products: false,
            productsMetaData: {
                language: null
            },
            isDataLoading: false,
            isMoreDataLoading: false,
            isDataRefreshing: false,
            networkError: false,
        }
    }

    componentDidMount() {
        const { products, productsMetaData } = this.state;
        if (!products.length || productsMetaData.language !== language) {
            this._getProducts();
        }
    }

    componentWillUnmount(){
        this.setState({
            products: false,
            productsMetaData: {
                language: null
            },
            isDataLoading: false,
            isMoreDataLoading: false,
            isDataRefreshing: false,
            networkError: false,
        });
    }

    _getProducts = async (isRefresh = false, isMore = false, page = 1) => {
        const { category } = this.state;

        try {
            if (isMore) {
                this.setState({ isMoreDataLoading: true });
            } else if (isRefresh) {
                this.setState({ isDataRefreshing: true });
            } else {
                this.setState({ isDataLoading: true });
            }

            const language = this.state.language;
            const lang = prepareLanguageToHttpRequest(language);
            const url = `${BASE_URL}/product/products-for-category?category_id=${category.id}&lang=${lang}&version=${APP_VERSION}&page=${page}&limit=8`;
            const response = await axios.get(url);

            if (response && response.data && response.data.data) {
                let products_data = response.data.data;
                let meta = { language, ...response.data.meta }

                if (products_data && products_data.length) {
                    let data = isMore ? [...this.state.products, ...products_data] : products_data
                    this.setState({
                        products: data,
                        productsMetaData: meta,
                        networkError: false
                    });
                    return products_data;
                } else {
                    this.setState({
                        networkError: false,
                        products: true
                    });
                }
            } else {
                this.setState({ networkError: true, products: false })
            }
        } catch (error) {
            this.setState({ networkError: true, products: false })
        } finally {
            if (isMore) {
                this.setState({ isMoreDataLoading: false });
            } else if (isRefresh) {
                this.setState({ isDataRefreshing: false });
            } else {
                this.setState({ isDataLoading: false });
            }
        }
    }

    _downloadMoreProducts = () => {
        if (this.state.isMoreDataLoading) return;

        let currentPage = parseInt(this.state.productsMetaData.current_page);
        let lastPage = parseInt(this.state.productsMetaData.total_pages);
        let nextPage = currentPage + 1;

        if (nextPage > lastPage) return;
        this._getProducts(false, true, nextPage);
    }

    _renderListFooterComponent = () => {
        return this.state.isMoreDataLoading ? <FlatListFooter /> : null
    }


    _getProductsList = () => {
        const { category, pizza_category_id, products } = this.state;

        if(Number(category.id) !== Number(pizza_category_id)){
            return products;
        } else {
            let productsClone = JSON.parse(JSON.stringify(products));
            let constructorData = {
                id: 'id',
                is_constructor: true
            }
            productsClone.unshift(constructorData);
            return productsClone;
        }
    }



    render() {
        const { products, navigation, isDataLoading, networkError, language, scales, isDataRefreshing } = this.state;

        return (
            <>
                {
                    !isDataLoading
                        ? (
                            products
                                ? (
                                    products.length
                                        ? (
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                keyExtractor={(order, index) => "key" + index}
                                                data={this._getProductsList()}
                                                renderItem={({ item }) => <ProductCardMenu product={item} navigation={navigation}/>}
                                                ItemSeparatorComponent={() => <Spacer spaceHeight={20} />}
                                                contentContainerStyle={{ paddingTop: Math.round(scales.heightScale * 20), paddingBottom: Math.round(scales.heightScale * 30) }}
                                                bounces={false}
                                                onEndReached={this._downloadMoreProducts}
                                                onEndReachedThreshold={0.05}
                                                ListFooterComponent={this._renderListFooterComponent}
                                                onRefresh={() => this._getProducts(true)}
                                                refreshing={isDataRefreshing}
                                                onScroll={(event) => this.state.callBack(event)}
                                            />
                                        )
                                        : <NoContentBlock
                                            title={translator.translate(language, "Товари відсутні")}
                                            note={translator.translate(language, "Нажаль, в даному розділі меню товари відсутні.")}
                                            navigation={navigation}
                                        />
                                ) : null
                        )
                        : <DataLoadingIndicator />
                }
                <NetworkErrorModal
                    isOpened={networkError}
                    closeCallback={() => this.setState({ networkError: false })}
                />
            </>
        );
    }



}


