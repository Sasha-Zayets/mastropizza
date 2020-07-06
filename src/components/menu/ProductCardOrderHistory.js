//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, Text} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
//Components
import {Block, IntelligentImage, Spacer, VerticalSpacer} from "../shared";
//Localization
import translator from "../../translator/translator";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Global vars
import {BASE_IMG_URL} from "../../different/global_vars";
//Helpers
import {formatPrice, prepareLanguageToHttpRequest} from "../../helpers/helpers";
//Styles
import styles from '../../styles/components/menu/product-card-order-history';
import {app_styles} from '../../styles/app_styles';


//----COMPONENT----//
const ProductCardOrderHistory = ({product}) => {
    //Data and State
    const {state: {language, scales, appSettings}} = useContext(AppSettingsContext);
    const [productData, setProductData] = useState({});


    //Hooks and Methods
    useEffect(() => {
        if (!Object.keys(productData).length) {
            let quantity = Number(product.quantity);
            let price = quantity * Number(product.price);
            setProductData({quantity, price});
        }
    }, []);


    const isWeightDish = () => {
        return !!(product.product.weight_dish)
    }


    const renderExtraIngredients = () => {
        let store = [];

        if (product.ingredients) {
            let data = JSON.parse(product.ingredients);

            if (data.length) {
                data.forEach(item => {
                    let position = `${item.name} (${(item.price * item.quantity) * product.quantity} ${translator.translate(language, 'грн')})`;
                    store.push(position)
                })
            }
        }


        return (
            <>
                {
                    store.length
                        ? (
                            <View style={{flex: 1}}>
                                <Spacer spaceHeight={5}/>
                                <Text
                                    style={styles(scales).subtitle}>{translator.translate(language, "Додаткові складники:")} </Text>
                                <Text style={styles(scales).ingredients}>{store.join(", ")}</Text>
                            </View>
                        )
                        : null
                }
            </>
        );
    }


    const renderProperties = () => {
        let store = [];

        if (product.properties) {
            let data = JSON.parse(product.properties);


            if (Object.keys(data).length) {
                let lang = prepareLanguageToHttpRequest(language);
                let size = product.product_type || 0;

                let price = size === 2 ? data.price2 : data.price;
                let position = `${data.property[lang]} (${price * product.quantity} ${translator.translate(language, 'грн')})`;
                store.push(position)
            }
        }


        return (
            <>
                {
                    store.length
                        ? (
                            <>
                                <Spacer spaceHeight={5}/>
                                <View style={app_styles(scales).row_start}>
                                    <Text style={styles(scales).subtitle}>{translator.translate(language, "Соус:")} </Text>
                                    <VerticalSpacer spaceWidth={2}/>
                                    <Text style={styles(scales).ingredients}>{store.join(", ")}</Text>
                                </View>
                            </>
                        )
                        : null
                }
            </>
        );
    }


    //Template
    return (
        <Block>
            <View style={styles(scales).container}>
                <View style={styles(scales).inner_container}>
                    {/* Product Image */}
                    <View style={styles(scales).product_thumbnail_container}>
                        <IntelligentImage
                            thumbnailStyles={styles(scales).product_thumbnail}
                            thumbnailSource={product.product.image_preview}
                            fullSizeSource={product.product.image}
                            fullSizeStyles={styles(scales).product_image}
                        />
                    </View>
                    {/* Product Description */}
                    <View style={styles(scales).product_description_container}>
                        <Text style={styles(scales).product_title}>{product.name}</Text>
                        <Spacer spaceHeight={4}/>
                        <View style={app_styles(scales).row_start}>
                            <Text style={styles(scales).product_quantity}>{product.quantity} x </Text>
                            <Text
                                style={styles(scales).product_price_black}>{formatPrice(language, product.price)} {translator.translate(language, "грн")}</Text>
                        </View>
                        {
                            renderExtraIngredients()
                        }
                        {
                            renderProperties()
                        }
                        {/* Price */}
                        <Spacer spaceHeight={12}/>
                        <View>
                            <Text
                                style={styles(scales).product_price}>{formatPrice(language, product.total)} {translator.translate(language, "грн")}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Block>
    );
}


//----EXPORT----//
export default ProductCardOrderHistory