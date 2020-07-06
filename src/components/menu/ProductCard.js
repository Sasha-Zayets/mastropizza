//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, Text, TouchableOpacity, Image, ImageBackground, Animated, Easing} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
//Components
import {Block, IntelligentImage, Spacer, VerticalSpacer, HorizontalDivider} from "../shared";
import {SelectSauceInput} from "../inputs";
import {ButtonSelect} from "../buttons";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Localization
import translator from "../../translator/translator";
//Helpers
import {formatPrice, escapeHtml, notEmptyString} from "../../helpers/helpers";
//Styles
import styles from '../../styles/components/menu/product-card';
import {app_styles} from '../../styles/app_styles';


//----COMPONENT----//
const ProductCard = ({product, quantityCallBack, variantCallback, sauceCallback, chosenIngredientsString, inConstructor}) => {
    //Data and State
    const {state: {language, scales, appSettings, screen_width}} = useContext(AppSettingsContext);
    const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(Math.round(scales.heightScale * 270)));
    const [extendedCard, setExtendedCard] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1);
    const [productVariant, setProductVariant] = useState(2);
    const [defaultIndexImage, setDefaultIndexImage] = useState(0);

    //Hooks and Methods
    useEffect(() => {
    }, [language]);

    const changeProductQuantity = (type = "-") => {
        if (type === "-" && productQuantity <= 1) return;
        if (type === "-") {
            let newQuantity = productQuantity - 1;
            quantityCallBack(type);
            setProductQuantity(newQuantity);
        } else {
            let newQuantity = productQuantity + 1;
            quantityCallBack(type);
            setProductQuantity(newQuantity);
        }
    }

    const changeProductVariant = (variant) => {
        if (!hasVariants()) return;
        setProductVariant(variant);
        variantCallback(variant);
    }


    const isPizzaProduct = () => {
        return parseInt(product.category.id) === parseInt(appSettings.pizzaCategoryId)
    }


    const hasVariants = () => {
        return !!(product.variants && product.variants.length > 1)
    }


    const widenPhoto = () => {
        Animated.timing(animatedHeight, {
            toValue: Math.round(scales.widthScale * 110),
            duration: 300,
            easing: Easing.linear
        }).start();
    }


    const shortenPhoto = () => {
        Animated.timing(animatedHeight, {
            toValue: Math.round(scales.widthScale * 270),
            duration: 300,
            easing: Easing.linear
        }).start();
    }


    const toggleHeight = () => {
        if (extendedCard) {
            shortenPhoto();
        } else {
            widenPhoto();
        }
        setExtendedCard(!extendedCard)
    }


    const getArrowPosition = () => {
        return !extendedCard ? "180deg" : "0deg";
    }


    const populateVariantButtons = () => {
        return product.variants.map((item, index) => {
            return (
                <View key={index} style={{
                    flex: 1,
                    marginRight: (index < (product.variants.length - 1)) ? Math.round(scales.widthScale * 10) : null
                }}>
                    <ButtonSelect
                        style={{}}
                        title={item.name}
                        value={item.size}
                        isSelected={productVariant === item.size}
                        callback={changeProductVariant}
                    />
                </View>
            );
        });
    }


    const getWeightString = () => {
        return <Text style={styles(scales).product_quantity}>{productQuantity} <Text
            style={styles(scales).weight}>/ {getWeight()}</Text></Text>
    }

    const getWeight = () => {
        let weight = parseInt(product.weight) * productQuantity;
        let measure = translator.translate(language, "грам");

        if (weight >= 1000) {
            weight = (weight / 1000).toFixed(2);
            measure = translator.translate(language, "кг")
        }
        return `${weight} ${measure}`;
    }

    const changeSouce = value => {
      product.properties.forEach((item, index) => {
        if(item.id === value.id) {
          setDefaultIndexImage(index)
        }
      });

      sauceCallback(value);
    }

    //Template
    return (
        <View style={[styles(scales).card_container]}>
            {/* IMAGE */}
            <View style={{paddingBottom: Math.round(scales.widthScale * 25)}}>
                <HorizontalDivider height={1} color={app_styles(scales).colors.app.light_grey}/>
                <Animated.View style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: animatedHeight,
                }}>
                    <Animated.Image
                        source={{uri: inConstructor ?  product.properties[defaultIndexImage].image_xs : product.image}}
                        style={{
                            width: screen_width,
                            height: animatedHeight,
                            resizeMode: 'cover'
                        }}
                    />
                </Animated.View>
                <HorizontalDivider height={1} color={app_styles(scales).colors.app.light_grey}/>
                {/* Toggler */}
                <TouchableOpacity onPress={toggleHeight} style={styles(scales).toggler_btn} activeOpacity={.9}>
                    <IcoMoonIcon
                        style={{transform: [{rotate: getArrowPosition()}]}}
                        name="arrow_downward"
                        color={app_styles(scales).colors.text.primary}
                        size={Math.round(scales.widthScale * 18)}
                    />
                </TouchableOpacity>
            </View>
            <Block>
                {/* DESCRIPTION */}
                <View style={styles(scales).description_container}>
                    <Text style={styles(scales).product_title}>{product.name}</Text>
                    {
                        chosenIngredientsString
                            ? (
                                <>
                                    <Spacer spaceHeight={10}/>
                                    <View style={{marginBottom: Math.round(scales.heightScale * 15)}}>
                                        <Text style={styles(scales).product_description}>{chosenIngredientsString}</Text>
                                    </View>
                                </>
                            )
                            : (
                                notEmptyString(product.description_mobile_app)
                                    ? (
                                        <>
                                            <Spacer spaceHeight={5}/>
                                            <View>
                                                <Text
                                                    style={styles(scales).product_description}>{escapeHtml(product.description_mobile_app)}</Text>
                                            </View>
                                            <Spacer spaceHeight={14}/>
                                        </>
                                    )
                                    : <Spacer spaceHeight={4}/>
                            )
                    }
                    <View style={app_styles(scales).row_between}>
                        <View style={{flex: 1}}>
                            <View>
                                {
                                    inConstructor
                                        ? <Text
                                            style={styles(scales).subtitle}>{translator.translate(language, 'Соус')}</Text>
                                        : <Text
                                            style={styles(scales).subtitle}>{translator.translate(language, 'Кількість')}</Text>
                                }
                            </View>
                            <Spacer spaceHeight={5}/>
                            {
                                inConstructor
                                    ? <SelectSauceInput
                                        callback={changeSouce}
                                        data={product.properties}
                                        defaultValue={product.properties[defaultIndexImage]}
                                    />
                                    : (
                                        <View style={styles(scales).manipulators_block}>
                                            <TouchableOpacity
                                                style={[styles(scales).button, {backgroundColor: app_styles(scales).colors.app.light_grey}]}
                                                onPress={() => changeProductQuantity()}
                                                activeOpacity={0.8}
                                            >
                                                <IcoMoonIcon name="minus" color={app_styles(scales).colors.text.primary}
                                                             size={Math.round(scales.widthScale * 16)}/>
                                            </TouchableOpacity>
                                            <View style={styles(scales).product_quantity_container}>
                                                <Text style={styles(scales).product_quantity}>{productQuantity}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={[styles(scales).button, {backgroundColor: app_styles(scales).colors.app.light_grey}]}
                                                onPress={() => changeProductQuantity("+")}
                                                activeOpacity={0.8}
                                            >
                                                <IcoMoonIcon name="plus" color={app_styles(scales).colors.text.primary}
                                                             size={Math.round(scales.widthScale * 16)}/>
                                            </TouchableOpacity>
                                        </View>
                                    )
                            }
                        </View>
                        <VerticalSpacer spaceWidth={20}/>
                        {
                            hasVariants()
                                ? (
                                    <View style={{flex: 1}}>
                                        <View>
                                            <Text
                                                style={styles(scales).subtitle}>{isPizzaProduct() ? translator.translate(language, 'Розмір') : translator.translate(language, 'Варіант')}</Text>
                                        </View>
                                        <Spacer spaceHeight={5}/>
                                        <View style={[app_styles(scales).row_between, {flex: 1}]}>
                                            {populateVariantButtons()}
                                        </View>
                                    </View>
                                )
                                : null
                        }
                    </View>
                </View>
            </Block>
        </View>
    );
}


//----EXPORT----//
export default ProductCard