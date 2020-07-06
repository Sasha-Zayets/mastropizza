//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, Text, Modal, TouchableOpacity } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Translator
import translator from "../../translator/translator";
//Components
import { Spacer, VerticalSpacer, Block } from "../shared";
import { ButtonModal } from "../buttons";
//Styles
import styles from "../../styles/components/modals/shared-modal-styles";
import { app_styles } from "../../styles/app_styles";



//----COMPONENT----//
const OnlinePaymentInfoModal = ({ isOpened, nextCallback, cancelCallback }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);


    //Template
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpened}
        >
            <View style={styles(scales).modal_content_container}>
                <View style={styles(scales).modal_card}>
                    {/* Card body */}
                    <View style={styles(scales).card_body}>
                        <View style={styles(scales).icon_container}>
                            <IcoMoonIcon name="shopping-bag-checked" color={app_styles(scales).colors.app.blue} size={Math.round(scales.widthScale * 50)} />
                        </View>
                        <Spacer spaceHeight={16} />
                        <Text style={styles(scales).card_title}>{translator.translate(language, "Дякуємо за замовлення!")}</Text>
                        <Spacer spaceHeight={8} />
                        <Text style={styles(scales).info}>{translator.translate(language, "Ваше замовлення отримане. Після здійснення оплати слідкуйте за статусом замовлення в особистому кабінеті в розділі \"Історія замовлень\"")}</Text>
                        <Spacer spaceHeight={30} />
                        <View style={app_styles(scales).row_between}>
                            <ButtonModal
                                title={translator.translate(language, "Відміна")}
                                callback={cancelCallback}
                                color={app_styles(scales).colors.app.blue}
                            />
                             <VerticalSpacer spaceWidth={40} />
                            <ButtonModal
                                title={translator.translate(language, "Оплатити")}
                                callback={nextCallback}
                                color={app_styles(scales).colors.app.green}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}




//----EXPORT----//
export default OnlinePaymentInfoModal;
