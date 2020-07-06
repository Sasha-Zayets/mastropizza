//----IMPORTS----//
//React
import React, {useEffect, useState, useContext} from 'react';
//React native
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
import {Context as MenuContext} from "../context/MenuContext";
import {Context as AuthContext} from "../context/AuthContext";

//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Componetns
import Header from "../components/shared/Header";
import {SafeView, Block, Spacer, VerticalSpacer} from "../components/shared";
import {ButtonClearCart, ButtonPrimary} from "../components/buttons";
import ProductCardCart from "../components/menu/ProductCardCart";
import EmptyCartBlock from "../components/menu/EmptyCartBlock";
import InfoOfferAuthorization from "../components/modals/InfoOfferAuthorization";

//Localization
import translator from "../translator/translator";
//Helpers
import {formatPrice} from "../helpers/helpers";
//Styles
import styles from '../styles/screens/cart-screen';
import {app_styles} from '../styles/app_styles';


//----COMPONENT----//
const CartScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language, appSettings}} = useContext(AppSettingsContext);
    const {state: {cart}, clearCart} = useContext(MenuContext);
    const {state: {isLoggedIn}, setFromMakeOrder} = useContext(AuthContext);
    const [totalProductsPrice, setTotalProductsPrice] = useState({
        total: 0,
        extraIngredients: 0
    });
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        setTotalProductsPrice(calculatePrice())
    }, [language, cart])


    const populateCartProducts = () => {
        let products = cart.map((product, index) => {
            return (
                <View key={product.uid || product.id}>
                    <ProductCardCart product={product}/>
                    {
                        (index < (cart.length - 1))
                            ? <Spacer spaceHeight={20}/>
                            : null
                    }
                </View>
            )
        });
        return products;
    }



    const calculatePrice = () => {
        let total = 0;
        let extraIngredients = 0;

        cart.forEach(item => {
            total += (Number(item.quantity) * getProductPrice(item))
            if (!isPizza(item)) {
                if (hasIngredients(item)) {
                    let value = 0;
                    item.main_ingredients.forEach(ingr => {
                        if (ingr.checked) {
                            value += (parseFloat(ingr.quantity) * parseFloat(ingr.price))
                        }
                    });
                    extraIngredients += (value * item.quantity);
                }
            }
        });

        return {total, extraIngredients};
    }


    const getProductPrice = (product) => {
        if (product.total_one_product_price) {
            return parseFloat(product.total_one_product_price);
        }
        return getVariantPrice(product);
    }


    const getVariantPrice = (product) => {
        let variant = product.variants.find(item => item.size === product.size);
        return variant ? parseFloat(variant['price']) : product.variants[0]['price'];
    }


    const isPizza = (product) => {
        return !!(product.category.id === parseInt(appSettings.pizzaCategoryId));
    }


    const hasIngredients = (product) => {
        return !!product.category.has_ingredients;
    }

    const openDescription = () => {
        if(!isLoggedIn) {
            setShowModal(true);
        } else {
            navigation.navigate('MakeOrder');
        }
    }

    const onMiss = () => {
        navigation.navigate('MakeOrder');
        setShowModal(false);
    }

    const redirectModal = value => {
        setFromMakeOrder(true);
        setShowModal(false);
        navigation.navigate(value);
    }

    //Template
    return (
        <>
            <SafeView>
                <Header
                    title={translator.translate(language, "Кошик")}
                    backAllowed
                    exclamationForCart
                    navigation={navigation}
                />
                <View style={styles(scales).body}>
                    {
                        cart.length
                            ? (
                                <ScrollView showsVerticalScrollIndicator={false} bounces={false}
                                            keyboardShouldPersistTaps={'always'}>
                                    {populateCartProducts()}
                                    <Spacer spaceHeight={20}/>
                                    <ButtonClearCart
                                        callback={clearCart}
                                        title={translator.translate(language, "Очистити кошик")}
                                    />
                                    <Spacer spaceHeight={30}/>
                                    {/* Order info */}
                                    <Block>
                                        <Spacer spaceHeight={10}/>
                                        <View style={app_styles(scales).row_between}>
                                            <Text
                                                style={styles(scales).total_title}>{translator.translate(language, "Всього на суму")}</Text>
                                            <Text
                                                style={styles(scales).total_price}>{formatPrice(language, (totalProductsPrice.total + totalProductsPrice.extraIngredients))} {translator.translate(language, "грн")}</Text>

                                        </View>
                                        <Spacer spaceHeight={40}/>
                                        <ButtonPrimary
                                            color={app_styles(scales).colors.app.blue}
                                            callback={openDescription}
                                            title={translator.translate(language, "Оформити замовлення")}
                                        />
                                        <Spacer spaceHeight={42}/>
                                    </Block>
                                </ScrollView>
                            )
                            : <EmptyCartBlock/>
                    }
                </View>
                <InfoOfferAuthorization
                    isOpened={showModal}
                    closeCallback={() => setShowModal(false)}
                    redirectNavigation={redirectModal}
                    onMiss={onMiss}/>
            </SafeView>
        </>
    );
}


//----EXPORT----//
export default CartScreen;