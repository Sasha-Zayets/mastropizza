//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, Text, TouchableOpacity, Linking, Image} from 'react-native';
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
import {formatPrice, escapeHtml, prepareLanguageToHttpRequest, notEmptyString} from "../../helpers/helpers";
//Styles
import styles from '../../styles/components/menu/product-card-menu';
import {app_styles} from '../../styles/app_styles';


//----COMPONENT----//
const ProductCardMenu = ({product, navigation}) => {
    //Data and State
    const {state: {language, scales, appSettings}} = useContext(AppSettingsContext);
    const {state: {cart, itemsInCart}, addToCart, updateCart, removeFromCart} = useContext(MenuContext);
    const [productQuantity, setProductQuantity] = useState(0);


    //Hooks and Methods
    useEffect(() => {        
        if (isProductInCart()) {
            setProductQuantity(getCartProductQuantity());
        } else {
            setProductQuantity(0)
        }
    }, [itemsInCart]);


    const cartHandler = (operator = "-") => {

        if (hasOwnScreen()) {
            return navigation.navigate('Product', {'productId': product.id})
        }

        let id = Number(product.id);
        let cartClone = JSON.parse(JSON.stringify(cart));

        if (isProductInCart()) {
            if (operator === "+") {
                cartClone.forEach(item => {
                    if (Number(item.id) === id) {
                        return item.quantity += 1;
                    }
                });
                setProductQuantity(productQuantity + 1)
                return updateCart(cartClone);
            } else {
                cartClone.forEach(item => {
                    if (Number(item.id) === id && isReducable(item)) {
                        return item.quantity -= 1;
                    }
                });
                setProductQuantity(productQuantity - 1)
                return updateCart(cartClone);
            }
        } else {
            let productClone = JSON.parse(JSON.stringify(product));
            productClone.quantity = 1;
            addToCart(productClone)
            setProductQuantity(productQuantity + 1)
        }
    }


    const isProductInCart = () => {
        return !!cart.find(item => item.id === product.id);
    }

    const getCartProductQuantity = () => {
        let prod = cart.find(item => item.id === product.id);
        return prod.quantity;
    }

    const isReducable = (cartItem) => {
        return cartItem.quantity > 0;
    }


    const definePriceFontSize = () => {
        let price = formatPrice(language, getProductPrice(true));
        return String(price).length > 6 ? Math.round(scales.fontScale * 12) : Math.round(scales.fontScale * 14);
    }


    const hasVariants = () => {
        return !!(product.variants && product.variants.length > 1)
    }


    const getProductPrice = (viceVersa = false) => {
        let price;

        if(hasVariants()){
            if(viceVersa){
                price = product && product['variants'] && product['variants'][1] && product['variants'][1]['price'] || null;
            } else {
                price = product && product['variants'] && product['variants'][0] && product['variants'][0]['price'] || null;
            }
        } else {
            price = product && product['variants'] && product['variants'][0] && product['variants'][0]['price'] || null;
        }
        if (price) {
            return formatPrice(language, parseFloat(price))
        }
        return null;
    }


    const getPriceString = (viceVersa = false) => {
        let price = getProductPrice(viceVersa);
        if (!price) {
            return null;
        }
        let from = hasVariants() ? (translator.translate(language, "від") + ' ') : '';
        return from + price + ' ' + translator.translate(language, "грн");
    }


    const hasOwnScreen = () => {
        return hasVariants() || product.category.has_ingredients
    }


    const constructorMessage = () => {
        let message = translator.translate(language, 'Склади піцу із улюблених складників.') + '\n\n' + translator.translate(language, 'Вибирай соус та до :NUM інгредієнтів');
        let quantity = appSettings.maxSelfMadeIngCount || 12;
            message = message.replace(':NUM', quantity);
         return message;
    }


    const addBadge = () => {
        let defaultColor = '#1AA056';
        let badge = product.badges[0];
        let bg = badge.color || defaultColor;

        return (
            <View style={[styles(scales).badge_container, {backgroundColor: bg}]}>
                <Text style={styles(scales).badge_name}>{badge.name}</Text>
            </View>
        );
    }




    //Template
    return (
        <Block>
            <View style={styles(scales).container}>
                <View style={styles(scales).inner_container}>
                    {
                        product.is_constructor
                            ? (
                                <TouchableOpacity style={styles(scales).banner_wrap}
                                                  onPress={() => navigation.navigate('PizzaConstructor')}
                                                  activeOpacity={.8}>
                                    <View style={app_styles(scales).row_start}>
                                        <View style={styles(scales).img_container_constructor}>
                                            <Image
                                                source={require("../../../assets/images/pizza_constructor.png")}
                                                style={styles(scales).img_constructor}
                                            />
                                        </View>
                                        <View style={styles(scales).constr_descr_container}>
                                            <Text style={styles(scales).product_title}>{translator.translate(language, 'Зібрати піцу')}</Text>
                                            <Spacer spaceHeight={6}/>
                                            <Text style={styles(scales).product_description}>{constructorMessage()}!</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                            : (
                                <>
                                    {/* Product Image */}
                                    <View style={styles(scales).product_thumbnail_container}>
                                        <IntelligentImage
                                            thumbnailStyles={styles(scales).product_thumbnail}
                                            thumbnailSource={product.image_preview}
                                            fullSizeSource={product.image}
                                            fullSizeStyles={styles(scales).product_image}
                                        />
                                        {
                                            product.badges && product.badges.length
                                            ? addBadge()
                                            : null
                                        }
                                    </View>
                                    {/* Product Description */}
                                    <View style={styles(scales).product_description_container}>
                                        <TouchableOpacity
                                            onPress={() => hasOwnScreen() ? navigation.navigate('Product', {'productId': product.id}) : null}
                                            activeOpacity={hasOwnScreen() ? .8 : 1}
                                        >
                                            <Text style={styles(scales).product_title}>{product.name}</Text>
                                            {
                                                notEmptyString(product.short_description_mobile_app)
                                                    ? (
                                                        <>
                                                            <Spacer spaceHeight={6}/>
                                                            <Text
                                                                style={styles(scales).product_description}>{escapeHtml(product.short_description_mobile_app)}</Text>
                                                            <Spacer spaceHeight={10}/>
                                                        </>
                                                    )
                                                    : <Spacer spaceHeight={10} />
                                            }
                                        </TouchableOpacity>
                                        <View style={app_styles(scales).row_between}>
                                            <View style={app_styles(scales).row_start}>
                                                <View style={app_styles(scales).row_start}>
                                                    <View>
                                                        <Text style={[styles(scales).product_price, {fontSize: definePriceFontSize()}]}>{getPriceString(true)}</Text>
                                                    </View>
                                                    <VerticalSpacer spaceWidth={16}/>
                                                    {
                                                        notEmptyString(product.weight)
                                                            ? (
                                                                <View>
                                                                    <Text
                                                                        style={styles(scales).product_weight}>{product.weight}</Text>
                                                                </View>
                                                            )
                                                            : null
                                                    }
                                                </View>
                                            </View>
                                            {
                                                productQuantity && !hasOwnScreen()
                                                    ? (
                                                        <View style={styles(scales).manipulators_block}>
                                                            <TouchableOpacity style={styles(scales).button_container}
                                                                              onPress={() => cartHandler()} activeOpacity={0.5}>
                                                                <View style={styles(scales).manipulator_subtract_button}>
                                                                    <IcoMoonIcon name="minus"
                                                                                 color={app_styles(scales).colors.text.grey}
                                                                                 size={Math.round(scales.widthScale * 14)}/>
                                                                </View>
                                                            </TouchableOpacity>
                                                            <View style={styles(scales).product_quantity_container}>
                                                                <Text
                                                                    style={styles(scales).product_quantity}>{productQuantity}</Text>
                                                            </View>
                                                            <TouchableOpacity style={styles(scales).button_container}
                                                                              onPress={() => cartHandler("+")}
                                                                              activeOpacity={0.5}>
                                                                <View style={styles(scales).manipulator_add_button}>
                                                                    <IcoMoonIcon name="plus"
                                                                                 color={app_styles(scales).colors.text.white}
                                                                                 size={Math.round(scales.widthScale * 14)}/>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                    : (
                                                        <TouchableOpacity style={styles(scales).cart_button}
                                                                          onPress={() => cartHandler("+")} activeOpacity={0.7}>
                                                            <IcoMoonIcon name="shopping-bag"
                                                                         color={app_styles(scales).colors.text.primary}
                                                                         size={Math.round(scales.widthScale * 23)}/>
                                                        </TouchableOpacity>
                                                    )
                                            }
                                        </View>
                                    </View>
                                </>
                            )
                    }
                </View>
            </View>
        </Block>
    );
}


//----EXPORT----//
export default ProductCardMenu