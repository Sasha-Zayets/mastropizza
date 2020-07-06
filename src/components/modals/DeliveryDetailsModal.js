//----IMPORTS----//
//React
import React, {useContext} from 'react';
//React native
import {View, Text, Modal, TouchableOpacity} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Components
import {Spacer} from "../shared";
//Translator
import translator from "../../translator/translator";
//Helpers
import {prepareLanguageToHttpRequest, formatPrice} from "../../helpers/helpers";
//Styles
import styles from "../../styles/components/modals/delivery-details-modal";
import {app_styles} from "../../styles/app_styles";


//----COMPONENT----//
const DeliveryDetailsModal = ({isOpened, closeCallback}) => {
    //Data and State
    const {state: {scales, appSettings, language}} = useContext(AppSettingsContext);


    //Hooks and Methods
    const getDeliveryInfo = (key) => {
        if (Object.keys(appSettings).length) {
            if (appSettings.delivery && appSettings.delivery[key]) {
                return appSettings.delivery[key];
            }
            return null
        }
        return null
    }


    const reformatSum = (sum) => {
        return formatPrice(language, sum);
    }


    const deliveryServiceSchedule = () => {
        let schedule = getDeliveryInfo('schedule')
        if (!schedule)  return null;
        return `${translator.translate(language, 'з')} ${schedule['start']} ${translator.translate(language, 'по')} ${schedule['end']}`;
    }

    const deliveryTimeString = `${translator.translate(language, 'до')} ${getDeliveryInfo('min_delivery_time')} ${translator.translate(language, 'хв')}`;

    const isFreeDelivery = () => {
        let main = getDeliveryInfo('main');
        if (!main)  return null;
        if (main['min_free_delivery_sum'] && parseInt(main['min_free_delivery_sum']) > 0) {
            return false;
        }
        return true;
    }


    const getDeliveryInfoMain = (key) => {
        let main = getDeliveryInfo('main');
        if (!main)  return null;
        if(main && main[key]){
            return main[key];
        }
    }


    const getDeliveryInfoSecondary = (key) => {
        let second = getDeliveryInfo('secondary');
        if (!second)  return null;
        if(second && second[key]){
            return second[key];
        }
    }





        //Template
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpened}
        >
            <View style={styles(scales).modal_content_container}>
                <View style={styles(scales).modal_card}>
                    {/* Card head */}
                    <View style={styles(scales).card_header}>
                        <Text
                            style={styles(scales).card_title}>{translator.translate(language, "Інформація про доставку")}</Text>
                        <TouchableOpacity onPress={closeCallback} style={styles(scales).close_modal_button}>
                            <IcoMoonIcon name="cancel" color={app_styles(scales).colors.text.white}
                                         size={Math.round(scales.widthScale * 14)} style={styles(scales).cancel_icon}/>
                        </TouchableOpacity>
                    </View>
                    {/* Card body */}
                    <View style={styles(scales).card_body}>
                        <View style={styles(scales).line}>
                            <View style={styles(scales).icon_container}>
                                <IcoMoonIcon name="clock" color={app_styles(scales).colors.text.primary}
                                             size={Math.round(scales.widthScale * 22)}/>
                            </View>
                            <View style={styles(scales).text_container}>
                                <Text style={styles(scales).info}><Text
                                    style={styles(scales).info_important}>{translator.translate(language, "Графік роботи")}:</Text> {deliveryServiceSchedule()}
                                </Text>
                            </View>
                        </View>
                        <View style={styles(scales).line}>
                            <View style={styles(scales).icon_container}>
                                <IcoMoonIcon name="motorcycle" color={app_styles(scales).colors.text.primary}
                                             size={Math.round(scales.widthScale * 22)}/>
                            </View>
                            <View style={styles(scales).text_container}>
                                <Text style={styles(scales).info}><Text
                                    style={styles(scales).info_important}>{translator.translate(language, "Тривалість доставки")}:</Text> {deliveryTimeString}
                                </Text>
                            </View>
                        </View>
                        <View style={styles(scales).line}>
                            <View style={styles(scales).icon_container}>
                                <IcoMoonIcon name="money" color={app_styles(scales).colors.text.primary}
                                             size={Math.round(scales.widthScale * 22)}/>
                            </View>
                            <View style={styles(scales).text_container}>
                                <Text style={styles(scales).info_important}>{translator.translate(language, "Вартість доставки")}:</Text>
                            </View>
                        </View>
                        {
                            isFreeDelivery()
                                ? (
                                    <View style={styles(scales).line}>
                                        <View
                                            style={[styles(scales).text_container, {paddingLeft: Math.round(scales.widthScale * 30)}]}>
                                            <Text style={[styles(scales).info_important, {textDecorationLine: "underline"}]}>{translator.translate(language, "м. Львів")}:
                                                <Text style={styles(scales).success_info}>{translator.translate(language, "безкоштовно")}; </Text>
                                            </Text>
                                        </View>
                                    </View>
                                )
                                : (
                                    <>
                                        <View style={styles(scales).line}>
                                            <View
                                                style={[styles(scales).text_container, {paddingLeft: Math.round(scales.widthScale * 30)}]}>
                                                <Text
                                                    style={[styles(scales).info_important, {textDecorationLine: "underline"}]}>{translator.translate(language, "м. Львів")}:</Text>
                                            </View>
                                        </View>
                                        <Spacer spaceHeight={5} />
                                        <View style={styles(scales).line}>
                                            <Text style={[styles(scales).info, {paddingLeft: Math.round(scales.widthScale * 30)}]}>
                                                {translator.translate(language, "замовлення менше")} {getDeliveryInfoMain('min_free_delivery_sum')} {translator.translate(language, "грн")} —
                                                <Text style={styles(scales).info_important}> {getDeliveryInfoMain('price')} {translator.translate(language, "грн")}; </Text>
                                            </Text>
                                        </View>
                                        <Spacer spaceHeight={2}/>
                                        <View
                                            style={[styles(scales).info, {paddingLeft: Math.round(scales.widthScale * 30)}]}>
                                            <Text style={styles(scales).info}>{translator.translate(language, "понад")} {getDeliveryInfoMain('min_free_delivery_sum')} {translator.translate(language, "грн")} —
                                                <Text style={styles(scales).success_info}> {translator.translate(language, "безкоштовно")};</Text>
                                            </Text>
                                        </View>
                                    </>
                                )
                        }
                        <Spacer spaceHeight={10}/>
                        <View style={styles(scales).line}>
                            <View
                                style={[styles(scales).text_container, {paddingLeft: Math.round(scales.widthScale * 30)}]}>
                                <Text
                                    style={[styles(scales).info_important, {textDecorationLine: "underline"}]}>{translator.translate(language, "Інші населені пункти")}: </Text>
                            </View>
                        </View>
                        <Spacer spaceHeight={5} />
                        <View style={[styles(scales).info, {paddingLeft: Math.round(scales.widthScale * 30)}]}>
                            <Text style={styles(scales).info}>
                                {translator.translate(language, "замовлення менше")} {getDeliveryInfoSecondary('min_sum_for_promo_delivery')} {translator.translate(language, "грн")} —
                                <Text style={styles(scales).info_important}> {getDeliveryInfoSecondary('price')} {translator.translate(language, "грн")};</Text>
                            </Text>
                        </View>
                        <Spacer spaceHeight={2}/>
                        <View
                            style={[styles(scales).info, {paddingLeft: Math.round(scales.widthScale * 30)}]}>
                            <Text style={styles(scales).info}>
                                {translator.translate(language, "понад")} {getDeliveryInfoSecondary('min_sum_for_promo_delivery')} {translator.translate(language, "грн")} —
                                <Text style={styles(scales).success_info}> {getDeliveryInfoSecondary('promo_delivery_price')} {translator.translate(language, "грн")};</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


//----EXPORT----//
export default DeliveryDetailsModal;