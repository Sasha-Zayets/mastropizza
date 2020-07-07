//----IMPORTS----//
//React
import React, { useContext, useEffect, useState } from 'react';
//React native
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Components
import { Spacer, VerticalSpacer } from '../shared';
//Styles
import styles from '../../styles/components/menu/ingredient-card';
import { app_styles } from '../../styles/app_styles';
//Localization
import translator from "../../translator/translator";



//----COMPONENT----//
const IngredientCard = ({ ingredient, callback, decreaseOnly }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const [ingredientQuantity, setIngredientQuantity] = useState(1);




    //Hooks and Methods
    useEffect(() => {
    }, [])


    const generateExtraCardStyles = () => {
        return {
            borderColor: isChecked() ? app_styles(scales).colors.app.black : app_styles(scales).colors.text.light_grey,
        }
    }


    const isChecked = () => {
         return !!(ingredient.checked && ingredient.checked === 1)
    };

    const isIncreasable = () => parseInt(ingredient.price) !== 0;


    const ingredientQuantityHandler = (type = '-') => {
        let newQuantity;
        if(type === '-'){
            if(ingredientQuantity <= 1) return;
            newQuantity = ingredientQuantity - 1;
            setIngredientQuantity(newQuantity);
            callback(ingredient.id, newQuantity, type, true)
        } else {
            if(decreaseOnly) return;
            newQuantity = ingredientQuantity + 1;
            setIngredientQuantity(newQuantity);
            callback(ingredient.id, newQuantity, type, true)
        }
    }


    const handleCallBack = () => {
        if(isChecked()){
            callback(ingredient.id, ingredientQuantity)
            setIngredientQuantity(1)
        } else {
            if(decreaseOnly) return;
            callback(ingredient.id, ingredientQuantity)
        }
    }




    //Template
    return (
        <View>
            <TouchableOpacity style={styles(scales).card_container} onPress={() => handleCallBack()} activeOpacity={.8}>
                <View style={[styles(scales).card_inner_container, generateExtraCardStyles()]}>
                    <View style={app_styles(scales).row_between}>
                        {
                            isChecked()
                                ? (
                                    <View style={styles(scales).uncheck_btn}>
                                        <IcoMoonIcon name="cancel" color={app_styles(scales).colors.app.white} size={Math.round(scales.widthScale * 6)} />
                                    </View>
                                )
                                : <VerticalSpacer spaceWidth={24} />
                        }
                        <Text style={styles(scales).price}>{ingredient.price} {translator.translate(language, 'грн')}</Text>
                    </View>
                    <Spacer spaceHeight={10} />
                    <View style={styles(scales).img_container}>
                        <Image
                            source={{ uri: ingredient.image }}
                            style={styles(scales).img}
                        />
                    </View>
                    <Spacer spaceHeight={10} />
                    <View>
                        <Text style={styles(scales).name}>{ingredient.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {
                isChecked() && isIncreasable()
                    ? (
                        <View style={styles(scales).manipulators_wrap}>
                            <View style={styles(scales).manipulators_block}>
                            <TouchableOpacity
                                style={styles(scales).button}
                                onPress={() => ingredientQuantityHandler()}
                                activeOpacity={0.8}>
                                <IcoMoonIcon name="minus" color={app_styles(scales).colors.text.white} size={Math.round(scales.widthScale * 14)} />
                            </TouchableOpacity>
                            <View style={styles(scales).ingredient_quantity_container}>
                                <Text style={styles(scales).ingredient_quantity}>{ingredientQuantity}</Text>
                            </View>
                            <TouchableOpacity style={styles(scales).button} onPress={() => ingredientQuantityHandler("+")} activeOpacity={0.8}>
                                <IcoMoonIcon name="plus" color={app_styles(scales).colors.text.white} size={Math.round(scales.widthScale * 14)} />
                            </TouchableOpacity>
                        </View>
                        </View>
                    )
                    : null

            }
        </View>
    );
}




//----EXPORT----//
export default IngredientCard;