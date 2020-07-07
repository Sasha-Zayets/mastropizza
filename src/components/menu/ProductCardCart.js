//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, Text, TouchableOpacity} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
import {Context as MenuContext} from "../../context/MenuContext";
//Components
import {Block, IntelligentImage, Spacer, VerticalSpacer} from "../shared";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Localization
import translator from "../../translator/translator";
//Helpers
import {formatPrice, makeCopy} from "../../helpers/helpers";
//Styles
import styles from '../../styles/components/menu/product-card-cart';
import {app_styles} from '../../styles/app_styles';


//----COMPONENT----//
const ProductCardCart = ({product}) => {
    //Data and State
    const {state: {language, scales, appSettings}} = useContext(AppSettingsContext);
    const {state: {cart}, updateCart, removeFromCart} = useContext(MenuContext);


    //Hooks and Methods
    const getProductPrice = () => {
        if (product.total_one_product_price) {
            return parseFloat(product.total_one_product_price);
        }
        return getVariantPrice();
    }


    const getVariantPrice = () => {
        let variant = product.variants.find(item => item.size === product.size);
        return variant ? parseFloat(variant['price']) : product.variants[0]['price'];
    }


    const cartHandler = (type = "-") => {
        if (type === "-" && product.quantity <= 1) return;
        let newQuantity = (type === "-") ? product.quantity - 1 : product.quantity + 1;

        let cartClone = makeCopy(cart);
        cartClone.forEach(item => {
            if (item.uid) {
                if (item.uid === product.uid) {
                    item.quantity = newQuantity;
                }
            } else {
                if (parseInt(item.id) === parseInt(product.id)) {
                    item.quantity = newQuantity;
                }
            }
        });
        updateCart(cartClone);
    }


    const definePriceFontSize = () => {
        let price = formatPrice(language, product.price);
        return String(price).length > 6 ? Math.round(scales.fontScale * 12) : Math.round(scales.fontScale * 14);
    }



    const isPizza = () => {
        return !!(product.category.id === parseInt(appSettings.pizzaCategoryId));
    }

    const isPizzaConstructor = () => {
        return !!(product.type === 'classic');
    }


    const getVariantName = () => {
        let variant = product.variants.find(item => item.size === product.size);
        return variant ? variant['name'] : product.variants[0]['name'];
    }


    const renderPizzaIngredients = () => {

        if (isPizzaConstructor()) {
            let mainIngredients = [];

            product.main_ingredients.forEach(item => {
                let position = `${item.name} (x${item.quantity})`;
                mainIngredients.push(position);
            })

            return (
                <View>
                    <View style={app_styles(scales).row_start}>
                        <Text style={styles(scales).subtitle}>{translator.translate(language, "Соус:")} </Text>
                        <Text style={styles(scales).ingredients}>{product.sauce.property}</Text>
                    </View>
                    <Spacer spaceHeight={5}/>
                    <View style={app_styles(scales).row_start}>
                        <Text style={styles(scales).subtitle}>{translator.translate(language, 'Розмір')}: </Text>
                        <Text style={styles(scales).ingredients}>{getVariantName()}</Text>
                    </View>
                    <Spacer spaceHeight={5}/>
                    <Text
                        style={styles(scales).subtitle}>{translator.translate(language, "Основні інгредієнти:")} </Text>
                    <Text style={styles(scales).ingredients}>{mainIngredients.join(", ")}</Text>
                </View>
            );
        }

        let ingredients = [];
        product.main_ingredients.forEach(item => {
            if (item.checked) {
                let position = `${item.name} (x${item.quantity})`;
                ingredients.push(position);
            }
        });

        return (
            <>
                <View style={app_styles(scales).row_start}>
                    <Text style={styles(scales).subtitle}>{translator.translate(language, 'Розмір')}: </Text>
                    <Text style={styles(scales).ingredients}>{getVariantName()}</Text>
                </View>
                {
                    ingredients.length
                        ? (
                            <>
                                <Spacer spaceHeight={5}/>
                                <Text
                                    style={styles(scales).subtitle}>{translator.translate(language, "Додаткові інгредієнти:")} </Text>
                                <Text style={styles(scales).ingredients}>{ingredients.join(", ")}</Text>
                            </>
                        )
                        : null
                }

            </>
        );
    }


    const hasIngredients = () => {
        return !!product.category.has_ingredients;
    }

    const hasVariants = () => {
        return !!(product.variants && product.variants.length > 1)
    }


    const renderProductIngredients = () => {
        let ingredients = [];

        if (hasIngredients()) {
            product.main_ingredients.forEach(item => {
                if (item.checked) {
                    let position = `${item.name} (x${item.quantity})`;
                    ingredients.push(position);
                }
            });
        }

        return (
            <>
                {
                    hasVariants()
                        ? (
                            <>
                                <Spacer spaceHeight={5}/>
                                <View style={app_styles(scales).row_start}>
                                    <Text
                                        style={styles(scales).subtitle}>{translator.translate(language, 'Варіант')}: </Text>
                                    <Text style={styles(scales).ingredients}>{getVariantName()}</Text>
                                </View>
                            </>
                        )
                        : null
                }
                {
                    ingredients.length
                        ? (
                            <View>
                                <Spacer spaceHeight={5}/>
                                <Text
                                    style={styles(scales).subtitle}>{translator.translate(language, "Додаткові складники:")} </Text>
                                <Text style={styles(scales).ingredients}>{ingredients.join(", ")}</Text>
                            </View>
                        )
                        : null
                }

            </>
        );
    }


    const totalProductPrice = () => {
        return isPizza()
            ? formatPrice(language, getProductPrice() * product.quantity)
            : (formatPrice(language, ((getProductPrice() * product.quantity)) + getIngredientsValue()));
    }


    const getIngredientsValue = () => {
        if (!hasIngredients()) return 0;
        let value = 0;
        product.main_ingredients.forEach(item => {
            if (item.checked) {
                value += (parseFloat(item.quantity) * parseFloat(item.price))
            }
        });
        return value * product.quantity;
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
                            thumbnailSource={product.image_preview}
                            fullSizeSource={product.image}
                            fullSizeStyles={styles(scales).product_image}
                        />
                    </View>
                    {/* Product Description */}
                    <View style={styles(scales).product_description_container}>
                        <Text style={styles(scales).product_title}>{product.name}</Text>
                        <Spacer spaceHeight={4}/>
                        <View style={app_styles(scales).row_start}>
                            {
                                product.weight
                                    ? <Text
                                        style={styles(scales).product_weight}>{product.weight} / {formatPrice(language, getVariantPrice())} {translator.translate(language, "грн")}</Text>
                                    : null
                            }
                        </View>
                        {
                            isPizza()
                                ? renderPizzaIngredients()
                                : renderProductIngredients()
                        }
                        {/* Price and quantity manipulators */}
                        <Spacer spaceHeight={8}/>
                        <View style={app_styles(scales).row_between}>
                            <View style={{flex: 1}}>
                                <Text
                                    style={[styles(scales).product_price, {fontSize: definePriceFontSize()}]}>{totalProductPrice()} {translator.translate(language, "грн")}</Text>
                            </View>
                            <View style={styles(scales).manipulators_block}>
                                <TouchableOpacity style={styles(scales).button_container} onPress={() => cartHandler()}
                                                  activeOpacity={0.5}>
                                    <View style={styles(scales).manipulator_subtract_button}>
                                        <IcoMoonIcon name="minus" color={app_styles(scales).colors.text.black}
                                                     size={Math.round(scales.widthScale * 14)}/>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles(scales).product_quantity_container}>
                                    <Text style={styles(scales).product_quantity}>{product.quantity}</Text>
                                </View>
                                <TouchableOpacity style={styles(scales).button_container}
                                                  onPress={() => cartHandler("+")} activeOpacity={0.5}>
                                    <View style={styles(scales).manipulator_add_button}>
                                        <IcoMoonIcon name="plus" color={app_styles(scales).colors.app.white}
                                                     size={Math.round(scales.widthScale * 14)}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles(scales).remove_button}
                                              onPress={() => removeFromCart(product)} activeOpacity={.7}>
                                <IcoMoonIcon name="trash" color={app_styles(scales).colors.text.black}
                                             size={Math.round(scales.widthScale * 17)}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Block>
    );
}


//----EXPORT----//
export default ProductCardCart