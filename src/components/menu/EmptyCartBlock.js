//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { Block, IntelligentImage, Spacer } from "../shared";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Localization
import translator from "../../translator/translator";
//Global vars
import { BASE_IMG_URL } from "../../different/global_vars";
//Helpers
import { formatPrice } from "../../helpers/helpers";
//Styles
import styles from '../../styles/components/menu/empty-cart-block';
import { app_styles } from '../../styles/app_styles';





//----COMPONENT----//
const EmptyCartBlock = ({ navigation }) => {
    //Data and State
    const { state: { language, scales } } = useContext(AppSettingsContext);
      



    //Template
    return (
        <View style={styles(scales).container}>
            <View style={styles(scales).content_container}>
                <IcoMoonIcon name="shopping-bag" color={app_styles(scales).colors.app.blue} size={Math.round(scales.widthScale * 55)} />
                <Spacer spaceHeight={24} />
                <Text style={styles(scales).title}>{translator.translate(language, "Кошик порожній")}</Text>
                <Spacer spaceHeight={6} />
                <Text style={styles(scales).note}>{translator.translate(language, "Ви ще нічого не вибрали. Перейдіть в розділ 'Доставка їжі'")}</Text>
            </View>
        </View>
    );
}



//----EXPORT----//
export default EmptyCartBlock