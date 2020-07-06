//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, FlatList, Text, ScrollView, Image, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
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
import {getUniqueId, formatPrice, makeCopy, prepareLanguageToHttpRequest} from "../helpers/helpers";
//Components
import Header from "../components/shared/Header";
import {DataLoadingIndicator, Block, VerticalSpacer, SafeView, Spacer} from "../components/shared";
import {NetworkErrorModal} from "../components/modals";
import {ButtonAddToCart, ButtonOrder} from "../components/buttons";
import {SelectIngredientsCategoryInput, TextAreaInput} from "../components/inputs";
import ProductCard from "../components/menu/ProductCard";
import IngredientCard from "../components/menu/IngredientCard";
//Styles
import styles from '../styles/screens/pizza-constructor-screen';
import {app_styles} from '../styles/app_styles';
//Localization
import translator from "../translator/translator";
import {APP_VERSION, BASE_URL} from "../different/global_vars";
import axios from "axios";


//----COMPONENT----//
const PizzaConstructorScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language, appSettings}} = useContext(AppSettingsContext);
    const {addToCart} = useContext(MenuContext);

    const [isDataLoading, setIsDataLoading] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [product, setProduct] = useState(null);

    const [ingredients, setIngredients] = useState(null);

    const [ingredientsCategories, setIngredientsCategories] = useState([]);
    const [activeIngredientsCategory, setActiveIngredientsCategory] = useState(null);
    const [ingredientsLimit, setIngredientsLimit] = useState(null);


    const [totalProductPrice, setTotalProductPrice] = useState(0);
    const [totalOneProductPrice, setTotalOneProductPrice] = useState(0); //Implemented for more convinient cart total price calcuations
    const [totalExtraIngredientsValue, setTotalExtraIngredientsValue] = useState(0);
    const [recalculate, setRecalculate] = useState(false);


    //Methods and hooks
    useEffect(() => {
        if (product) {
            if (!product.size && !product.sauce) {
                startProductManipulations();
            }
            totalPriceCalculator();
        }

    }, [recalculate, product]);


    const fetchProduct = async () => {
        if (!product) {
            try {
                setIsDataLoading(true);
                const lang = prepareLanguageToHttpRequest(language);
                const url = `${BASE_URL}/product/pizza-constructor?lang=${lang}`;

                const response = await axios.get(url);

                if (response && response.data && response.data.data) {
                    let product_data = response.data.data;
                    let ingredients_data = response.data.ingredient_categories;

                    if (product_data && Object.keys(product_data).length) {

                        setProduct(product_data);
                        if (parseInt(product_data.ingredientLimit)) {
                            setIngredientsLimit(parseInt(product_data.ingredientLimit));
                        }

                        if (ingredients_data && ingredients_data.length) {
                            let result = [];
                            let categories = [{id: null, name: translator.translate(language, "Всі складники")}];
                            ingredients_data.forEach(item => {
                                if (item.ingredients && item.ingredients.length) {
                                    result = [...result, ...item.ingredients]
                                    categories.push({
                                        id: item.id,
                                        name: item.name
                                    });
                                }
                            });
                            setIngredients(result);
                            setIngredientsCategories(categories);
                            setActiveIngredientsCategory(categories[0])
                        }

                        if (networkError) {
                            setNetworkError(false)
                        }
                    } else {
                        throw new Error('Something went wrong')
                    }
                } else {
                    throw new Error('Something went wrong')
                }
            } catch (error) {
                setNetworkError(true)
            } finally {
                setIsDataLoading(false);
            }
        }
    }

    const extraIngredientsHandler = (ingredientId, newQuantity, type, noToggle = false) => {
        ingredients.forEach(item => {
            if (item.id === ingredientId) {
                let itemPrice = parseFloat(item.price);
                item.quantity = newQuantity

                if (noToggle) {
                    if (type === '+') {
                        changePrices(itemPrice, '+')
                        changesIngredientsLimit('-', 1)
                    } else {
                        changePrices(itemPrice, '-')
                        changesIngredientsLimit('+', 1)
                    }
                } else {
                    let newCondition = toggleChecked(item.checked);
                    item.checked = newCondition;
                    if (newCondition === 1) {
                        changePrices(itemPrice, '+')
                        changesIngredientsLimit('-', item.quantity)
                    } else {
                        changePrices(itemPrice * item.quantity, '-')
                        changesIngredientsLimit('+', item.quantity)
                        item.quantity = 0;
                    }
                }
            }
        });

        function toggleChecked(checked) {
            if (!checked) {
                return 1;
            }
            return checked === 0 ? 1 : 0
        }

        function changePrices(itemPrice, type) {
            if (type === '+') {
                setTotalExtraIngredientsValue(totalExtraIngredientsValue + itemPrice)
            } else {
                setTotalExtraIngredientsValue(totalExtraIngredientsValue - itemPrice)
            }
        }

        function changesIngredientsLimit(type, number) {
            if (type === '+') {
                let newNumber = ingredientsLimit + number;
                setIngredientsLimit(newNumber)
            } else {
                let newNumber = ingredientsLimit - number;
                if (newNumber <= 0) {
                    return setIngredientsLimit(0)
                }
                setIngredientsLimit(newNumber)
            }
        }

        setRecalculate(!recalculate)
    }

    const quantityHandler = (type) => {
        let newQuantity;

        if (type === '+') {
            newQuantity = product.quantity + 1;
        } else {
            newQuantity = product.quantity - 1;
        }

        product.quantity = newQuantity;
        setRecalculate(!recalculate)
    }

    const variantHandler = (variant) => {
        product.size = variant;
        setRecalculate(!recalculate)
    }

    const startProductManipulations = () => {
        product.size = product.variants[0]['size'];
        product.quantity = 1;
        product.sauce = null;
        product.uid = getUniqueId();
    }

    const sauceHandler = (sauce) => {
        product.sauce = sauce;
        setRecalculate(!recalculate)
    }

    const totalPriceCalculator = () => {
        let extraIngradientsCost = isPizzaProduct() ? totalExtraIngredientsValue * product.quantity : totalExtraIngredientsValue;
        let totalPizzasValue = getVariantPrice() * product.quantity;
        let sauceValues = getSauceValue() * product.quantity;
        setTotalProductPrice(extraIngradientsCost + totalPizzasValue + sauceValues);

        let extraIngradientsCostOne = totalExtraIngredientsValue;
        let totalPizzasValueOne = getVariantPrice();
        let sauceValue = getSauceValue();
        setTotalOneProductPrice(extraIngradientsCostOne + totalPizzasValueOne + sauceValue);
    }

    const getVariantPrice = () => {
        let variant = product.variants.find(item => item.size === product.size);
        return parseFloat(variant['price']);
    }

    const getSauceValue = () => {
        if (!product.properties || !product.properties.length ) return;
        if (!product.sauce) return 0;
        return product.size === 2 ? product.sauce.price2 : product.sauce.price;
    }

    const addToCartHandler = () => {
        if(!pizzaBuilt()) return;
        product.total_one_product_price = totalOneProductPrice;
        product.total_product_price = totalProductPrice;
        product.main_ingredients = addChosenIngredients();
        addToCart(product)
        navigation.goBack();
    }

    const handleComment = (name, value) => {
        product.comment = value;
    }


    const addChosenIngredients = () => {
        return ingredients.filter(item => item.checked && item.checked === 1);
    }


    const isPizzaProduct = () => {
        return !!(parseInt(product.category.id) === parseInt(appSettings.pizzaCategoryId))
    }

    const hasIngredients = () => {
        return product.category.has_ingredients;
    }

    const getTotalIngrVal = () => {
        return isPizzaProduct() ? totalExtraIngredientsValue * product.quantity : totalExtraIngredientsValue;
    }


    const filteredIngredients = () => {
        let activeId = activeIngredientsCategory.id;
        if (!activeId) return ingredients;
        return ingredients.filter(item => item.ingredient_category_id === activeId);
    }

    const ingredientsLimitReached = () => {
        return ingredientsLimit <= 0;
    }


    const pizzaBuilt = () => {
        if (!product.sauce) {
            Alert.alert(translator.translate(language, "Увага!"), translator.translate(language, "Ви забули вибрати соус."));
            return false;
        }
        ;
        if (getSelectedMainIngredientsNumber() < 2) {
            Alert.alert(translator.translate(language, "Увага!"), translator.translate(language, "Необхідно вибрати мінімум 2 основних інгредієнта."));
            return false;
        }
        return true;
    }


    const buildChosenIngredientsString = () => {
        let result = [];
        ingredients.forEach(item => {
            if(item.checked && item.checked === 1){
                result.push(`${item.name} (x${item.quantity})`)
            }
        })
        return result.length ? result.join(', ') : null;
    }

    const getSelectedMainIngredientsNumber = () => {
        return parseInt(product.ingredientLimit) - ingredientsLimit;
    }


    const getPizzaPrice = () => {
        return totalProductPrice - getTotalIngrVal() - (getSauceValue() * product.quantity);
    }


    //Template
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <SafeView>
                <NavigationEvents
                    onWillFocus={() => fetchProduct()}
                />
                <Header
                    title={translator.translate(language, "Піца-Конструктор")}
                    backAllowed
                    navigation={navigation}
                    exclamation
                    noBell
                />
                <View style={styles(scales).body}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}
                                keyboardShouldPersistTaps={'always'} contentContainerStyle={{flexGrow: 1}}>
                        {
                            !networkError
                                ? (
                                    !isDataLoading
                                        ? (

                                            product
                                                ? (
                                                    <>
                                                        <ProductCard
                                                            inConstructor
                                                            product={product}
                                                            navigation={navigation}
                                                            quantityCallBack={quantityHandler}
                                                            variantCallback={variantHandler}
                                                            sauceCallback={sauceHandler}
                                                            chosenIngredientsString={buildChosenIngredientsString()}
                                                        />
                                                        <Block>
                                                            <View>
                                                                {
                                                                    hasIngredients()
                                                                        ? (
                                                                            <>
                                                                                <Spacer spaceHeight={10}/>
                                                                                <Text
                                                                                    style={styles(scales).extra_ingradient_title}>{translator.translate(language, "Оберіть складники")}</Text>
                                                                            </>
                                                                        )
                                                                        : null
                                                                }
                                                                {
                                                                    isPizzaProduct()
                                                                        ? (
                                                                            <>
                                                                                <Spacer spaceHeight={7}/>
                                                                                <Text
                                                                                    style={styles(scales).extra_ingradient_note}>{translator.translate(language, "Виберіть інгредієнти, з яких буде складатися Ваша піца.")}</Text>
                                                                            </>
                                                                        )
                                                                        : null
                                                                }
                                                            </View>
                                                        </Block>
                                                        {
                                                            hasIngredients() && ingredients.length
                                                                ? (
                                                                    <>
                                                                        {
                                                                            ingredientsLimit || ingredientsLimit === 0
                                                                                ? (
                                                                                    <>
                                                                                        <Spacer spaceHeight={10}/>
                                                                                        <View style={styles(scales).limit_container}>
                                                                                            <Text
                                                                                                style={styles(scales).limit_text}>{translator.translate(language, 'Можлива кількість складників')}:
                                                                                                <Text
                                                                                                    style={styles(scales).limit_quantity}> {ingredientsLimit}</Text>
                                                                                            </Text>
                                                                                        </View>
                                                                                    </>
                                                                                )
                                                                                : null
                                                                        }
                                                                        <Spacer spaceHeight={15}/>
                                                                        <Block>
                                                                            <SelectIngredientsCategoryInput
                                                                                dataList={ingredientsCategories}
                                                                                callback={(value) => setActiveIngredientsCategory(value)}
                                                                                defaultValue={activeIngredientsCategory}
                                                                            />
                                                                        </Block>
                                                                        <Spacer spaceHeight={18}/>
                                                                        <FlatList
                                                                            extraData={totalExtraIngredientsValue}
                                                                            contentContainerStyle={styles(scales).ingredients_flat_list_container}
                                                                            horizontal
                                                                            showsHorizontalScrollIndicator={false}
                                                                            keyExtractor={ingredient => "key" + ingredient.id}
                                                                            data={filteredIngredients()}
                                                                            renderItem={({item}) => <IngredientCard ingredient={item}
                                                                                                                    decreaseOnly={ingredientsLimitReached()}
                                                                                                                    callback={extraIngredientsHandler}
                                                                                                    />}
                                                                            ItemSeparatorComponent={() => <VerticalSpacer
                                                                                spaceWidth={10}/>}
                                                                        />
                                                                    </>
                                                                )
                                                                : null
                                                        }
                                                        <Block>
                                                            <Spacer spaceHeight={18}/>
                                                            <View>
                                                                <Text
                                                                    style={styles(scales).subtitle}>{translator.translate(language, "Коментар")}</Text>
                                                            </View>
                                                            <Spacer spaceHeight={7}/>
                                                            <TextAreaInput
                                                                placeholder={translator.translate(language, "Ваш коментар...")}
                                                                name="comment"
                                                                callback={handleComment}
                                                                value={product.comment}
                                                                clearError={() => {
                                                                }}
                                                            />
                                                            <Spacer spaceHeight={18}/>
                                                            <View style={app_styles(scales).row_between}>
                                                                <View>
                                                                    <Text
                                                                        style={styles(scales).total_value_title}>{translator.translate(language, "Загальна вартість:")}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text
                                                                        style={styles(scales).total_value_text}>{formatPrice(language, totalProductPrice)} {translator.translate(language, "грн")}</Text>
                                                                </View>
                                                            </View>
                                                            {
                                                                hasIngredients()
                                                                    ? (
                                                                        <>
                                                                            <View style={app_styles(scales).row_between}>
                                                                                <View>
                                                                                    <Text
                                                                                        style={styles(scales).total_value_subtitle}>- {translator.translate(language, "піца:")}</Text>
                                                                                </View>
                                                                                <View>
                                                                                    <Text
                                                                                        style={styles(scales).total_value_subtext}>{formatPrice(language, getPizzaPrice())} {translator.translate(language, "грн")}</Text>
                                                                                </View>
                                                                            </View>
                                                                            <View style={app_styles(scales).row_between}>
                                                                                <View>
                                                                                    <Text
                                                                                        style={styles(scales).total_value_subtitle}>- {translator.translate(language, "додаткові складники:")}</Text>
                                                                                </View>
                                                                                <View>
                                                                                    <Text
                                                                                        style={styles(scales).total_value_subtext}>{formatPrice(language, getTotalIngrVal())} {translator.translate(language, "грн")}</Text>
                                                                                </View>
                                                                            </View>
                                                                            <View style={app_styles(scales).row_between}>
                                                                                <View>
                                                                                    <Text
                                                                                        style={styles(scales).total_value_subtitle}>- {translator.translate(language, "соус:")}</Text>
                                                                                </View>
                                                                                <View>
                                                                                    <Text
                                                                                        style={styles(scales).total_value_subtext}>{formatPrice(language, (getSauceValue() * product.quantity))} {translator.translate(language, "грн")}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                            <Spacer spaceHeight={18}/>
                                                            <View>
                                                                <View style={{flex: 1}}>
                                                                    <Text
                                                                        style={styles(scales).total_quantity_title}>{translator.translate(language, "Кількість")}</Text>
                                                                </View>
                                                                <Spacer spaceHeight={15}/>
                                                                <View style={styles(scales).manipulators_block}>
                                                                    <TouchableOpacity
                                                                        style={[styles(scales).button, {backgroundColor: app_styles(scales).colors.app.blue}]}
                                                                        onPress={() => quantityHandler('-')}
                                                                        activeOpacity={0.8}
                                                                    >
                                                                        <IcoMoonIcon name="minus"
                                                                                     color={app_styles(scales).colors.app.white}
                                                                                     size={Math.round(scales.widthScale * 16)}/>
                                                                    </TouchableOpacity>
                                                                    <View style={styles(scales).product_quantity_container}>
                                                                        <Text
                                                                            style={styles(scales).product_quantity}>{product.quantity}</Text>
                                                                    </View>
                                                                    <TouchableOpacity
                                                                        style={[styles(scales).button, {backgroundColor: app_styles(scales).colors.app.blue}]}
                                                                        onPress={() => quantityHandler('+')}
                                                                        activeOpacity={0.8}
                                                                    >
                                                                        <IcoMoonIcon name="plus"
                                                                                     color={app_styles(scales).colors.app.white}
                                                                                     size={Math.round(scales.widthScale * 16)}/>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                            <Spacer spaceHeight={25}/>
                                                            <ButtonAddToCart
                                                                callback={addToCartHandler}
                                                                title={translator.translate(language, 'Додати в кошик')}
                                                            />

                                                        </Block>
                                                        <Spacer spaceHeight={25}/>
                                                    </>
                                                )
                                                : null
                                        )
                                        : <DataLoadingIndicator/>
                                )
                                : <NetworkErrorModal
                                    isOpened={networkError}
                                    closeCallback={() => setNetworkError(false)}
                                />
                        }
                    </ScrollView>
                </View>
            </SafeView>
        </KeyboardAvoidingView>
    )
}


//----EXPORT----//
export default PizzaConstructorScreen;