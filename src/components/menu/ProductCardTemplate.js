import React, { useState, useContext, useEffect } from 'react';
import {FlatList, ScrollView, Text, View} from "react-native";
import ProductCard from "./ProductCard";
import {Block, DataLoadingIndicator, Spacer, VerticalSpacer} from "../shared";
import translator from "../../translator/translator";
import {SelectIngredientsCategoryInput, TextAreaInput} from "../inputs";
import IngredientCard from "./IngredientCard";
import {formatPrice, getUniqueId} from "../../helpers/helpers";
import {ButtonAddToCart} from "../buttons";
import {NetworkErrorModal} from "../modals";

import styles from '../../styles/screens/product-screen';
import {app_styles} from '../../styles/app_styles';
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
import {Context as MenuContext} from "../../context/MenuContext";

const ProductCardTemplate = ({ product, navigation, ingredients = [], networkError = false, isDataLoading = false, limit = 0 }) => {
  const {state: {scales, language, appSettings}} = useContext(AppSettingsContext);
  const {addToCart} = useContext(MenuContext);

  const [totalExtraIngredientsValue, setTotalExtraIngredientsValue] = useState(0);
  const [recalculate, setRecalculate] = useState(false);

  // ingredients
  const [activeIngredientsCategory, setActiveIngredientsCategory] = useState({id: null, name: translator.translate(language, "Всі складники")});
  // const [ingredients, setIngredients] = useState(ingredient | []);
  const [ingredientsCategories, setIngredientsCategories] = useState([]);
  const [ingredientsLimit, setIngredientsLimit] = useState(limit);

  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalOneProductPrice, setTotalOneProductPrice] = useState(0); //Implemented for more convenient cart total price calculations

  //Methods and hooks
  useEffect(() => {
    if (product) {
      if (!product.size && !product.sauce) {
        startProductManipulations();
      }
      totalPriceCalculator();
    }
  }, [product, recalculate]);

  const startProductManipulations = () => {
    product.size = product.variants[0]['size'];
    product.quantity = 1;
    product.uid = getUniqueId();
  }

  const quantityHandler = (type, value) => {
    product.quantity = value;

    setRecalculate(!recalculate);
  }

  const variantHandler = (variant) => {
    product.size = variant;
    setRecalculate(!recalculate)
  }

  const handleComment = (name, value) => {
    product.comment = value;
  }

  const hasIngredients = () => {
    return product.category.has_ingredients;
  }

  const totalPriceCalculator = () => {
    let extraIngradientsCost = totalExtraIngredientsValue * product.quantity;
    let totalPizzasValue = getVariantPrice() * product.quantity;

    setTotalProductPrice(extraIngradientsCost + totalPizzasValue);

    let extraIngradientsCostOne = totalExtraIngredientsValue;
    let totalPizzasValueOne = getVariantPrice();

    setTotalOneProductPrice(extraIngradientsCostOne + totalPizzasValueOne);
  }

  const getVariantPrice = () => {
    let variant = product.variants.find(item => item.size === product.size);

    return parseFloat(variant['price']);
  }

  const getTotalIngrVal = () => {
    return totalExtraIngredientsValue * product.quantity;
  }

  const filteredIngredients = () => {
    let activeId = activeIngredientsCategory.id;
    if (!activeId) return ingredients;
    return ingredients.filter(item => item.ingredient_category_id === activeId);
  }

  const ingredientsLimitReached = () => {
    if (product.hasIngredientLimit === false) return false;
    return ingredientsLimit <= 0;
  }

  const isPizzaProduct = () => {
    return !!(parseInt(product.category.id) === parseInt(appSettings.pizzaCategoryId))
  }

  const addChosenIngredients = () => {
    return ingredients.filter(item => item.checked && item.checked === 1);
  }

  const addToCartHandler = () => {
    if (isPizzaProduct()) {
      product.total_one_product_price = totalOneProductPrice;
    }

    product.total_product_price = totalProductPrice;
    product.main_ingredients = addChosenIngredients();
    addToCart(product);
    navigation.goBack();
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
      if(!checked){
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
      if(type === '+'){
        let newNumber = ingredientsLimit + number;
        setIngredientsLimit(newNumber)
      } else {
        let newNumber = ingredientsLimit - number;
        if(newNumber <= 0){
          return setIngredientsLimit(0)
        }
        setIngredientsLimit(newNumber)
      }
    }

    setRecalculate(!recalculate);
  }

  return (
      <View
          style={styles(scales).body}>
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
                                          product={product}
                                          navigation={navigation}
                                          quantityCallBack={(type, value) => quantityHandler(type, value)}
                                          variantCallback={variantHandler}
                                      />
                                      <Block>
                                        <View>
                                          {
                                            hasIngredients()
                                                ? (
                                                    <>
                                                      <Spacer spaceHeight={10}/>
                                                      <Text
                                                          style={styles(scales).extra_ingradient_title}>{translator.translate(language, "Оберіть додаткові складники")}</Text>
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
                                                          style={styles(scales).extra_ingradient_note}>{translator.translate(language, "У вартість входять основні складники піци. Усі додаткові інгредієнти оплачуються відповідно до вказаної ціни")}</Text>
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
                                                    (ingredientsLimit || ingredientsLimit === 0) && product.hasIngredientLimit
                                                        ? (
                                                            <>
                                                              <Spacer spaceHeight={10}/>
                                                              <View style={styles(scales).limit_container}>
                                                                <Text style={styles(scales).limit_text}>{translator.translate(language, 'Можлива кількість складників')}:
                                                                  <Text style={styles(scales).limit_quantity}> {ingredientsLimit}</Text>
                                                                </Text>
                                                              </View>
                                                            </>
                                                        )
                                                        : null
                                                  }
                                                  <Spacer spaceHeight={15} />
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
                                                        {
                                                          isPizzaProduct()
                                                              ? <Text
                                                                  style={styles(scales).total_value_subtitle}>- {translator.translate(language, "піца:")}</Text>
                                                              : <Text
                                                                  style={styles(scales).total_value_subtitle}>- {translator.translate(language, "основна страва:")}</Text>
                                                        }
                                                      </View>
                                                      <View>
                                                        <Text
                                                            style={styles(scales).total_value_subtext}>{formatPrice(language, (totalProductPrice - getTotalIngrVal()))} {translator.translate(language, "грн")}</Text>
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
                                                  </>
                                              )
                                              : null
                                        }
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
  );
}

export default ProductCardTemplate;