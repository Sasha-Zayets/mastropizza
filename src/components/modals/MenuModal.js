//----IMPORTS----//
//React
import React, { useContext, useState, useEffect } from 'react';
//React native
import { View, Text, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Translator
import translator from "../../translator/translator";
//Styles
import styles from "../../styles/components/modals/menu-modal";
import { app_styles } from "../../styles/app_styles";



//----COMPONENT----//
const MenuModal = ({ isOpened, closeCallback, menu }) => {
    //Data and State
    const { state: { scales, language, contacts } } = useContext(AppSettingsContext);
    const [pageIndex, setPageIndex] = useState(0);



    //hooks and Methods
    useEffect(() => {
    }, []);



    const changePage = (type) => {
        if (type === '-') {
            if (pageIndex < 1) {
                return;
            } else {
                setPageIndex(pageIndex - 1)
            }
        } else {
            if (pageIndex >= menu.images.length - 1) {
                return
            } else {
                setPageIndex(pageIndex + 1)
            }
        }

    }




    //Template
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpened}
        >
            <View style={styles(scales).modal_card}>
                {/* Card Header */}
                <View style={[app_styles(scales).row_between, styles(scales).header_cont]}>
                    <Text style={styles(scales).title}>{translator.translate(language, "Меню Ресторану")}</Text>
                    <TouchableOpacity onPress={closeCallback} style={styles(scales).close_modal_button}>
                        <IcoMoonIcon name="cancel" color={app_styles(scales).colors.text.primary} size={Math.round(scales.widthScale * 14)} />
                    </TouchableOpacity>
                </View>
                {/* Card body */}
                <View style={styles(scales).card_body}>
                    <Image
                        source={{ uri: menu.images[pageIndex]['image'] }}
                        style={styles(scales).thumbnail_menu_image}
                    />
                    <View style={styles(scales).btn_group}>
                        <TouchableOpacity style={styles(scales).btn_manipulator} activeOpacity={.8} onPress={() => changePage('-')}>
                            <IcoMoonIcon
                                name="arrow_back"
                                size={Math.round(scales.widthScale * 20)}
                                color={app_styles(scales).colors.app.white}
                            />
                        </TouchableOpacity>
                        <View style={styles(scales).pages_cont}>
                            <Text style={styles(scales).page}>{translator.translate(language, "Сторінка")}: </Text>
                            <Text style={styles(scales).page}>{pageIndex + 1} / {menu.images.length}</Text>
                        </View>
                        <TouchableOpacity style={styles(scales).btn_manipulator} activeOpacity={.8} onPress={() => changePage('+')}>
                            <IcoMoonIcon
                                name="arrow_forward"
                                size={Math.round(scales.widthScale * 20)}
                                color={app_styles(scales).colors.app.white}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}




//----EXPORT----//
export default MenuModal;