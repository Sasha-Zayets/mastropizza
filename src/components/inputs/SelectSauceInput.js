//----IMPORTS----//
//React
import React, { useContext, useState, useEffect } from 'react';
//React native
import { TouchableOpacity, Text, View, Modal, TextInput, FlatList } from 'react-native';
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { HorizontalDivider } from "../shared";
//Styles
import styles from "../../styles/components/inputs/select-sauce-input";
import { app_styles } from '../../styles/app_styles';
//Localization
import translator from '../../translator/translator';




//----COMPONENT----//
const SelectSauceInput = ({ callback, data, defaultValue = {} }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const [listOpened, setListOpened] = useState(false);
    const [value, setValue] = useState(defaultValue);


    //Hooks and Methods
    const handleSelect = (val) => {
        callback(val);
        setValue(val);
        setListOpened(false);
    }

    useEffect(() => {
        callback(defaultValue);
    }, []);

    const getArrowPosition = () => {
        return listOpened ? "-180deg" : "0deg";
    }


    const handlePress = () => {
        setListOpened(!listOpened)
    }

    

    const fetchSauceName = () => {
        return value.property
    }


    const defineColor = () => {
        return value ? app_styles(scales).colors.text.primary : app_styles(scales).colors.text.light_grey
    }


    
    //Template
    return (
        <>
            <TouchableOpacity style={styles(scales).input} onPress={handlePress} activeOpacity={.9}>
                {
                    value
                    ? <Text style={[styles(scales).val, {color: defineColor()}]}>{fetchSauceName()}</Text>
                    : <Text numberOfLines={1} style={[styles(scales).val, {color: defineColor()}]}>{translator.translate(language, "Оберіть зі списку...")}</Text>
                }
                <View style={styles(scales).icon_container}>
                    <IcoMoonIcon
                        size={Math.round(scales.widthScale * 8)}
                        style={{ transform: [{ rotate: getArrowPosition() }] }}
                        name="arrow-point-down"
                        color={app_styles(scales).colors.text.light_grey}
                    />
                </View>
            </TouchableOpacity>
            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={listOpened}
            >
                <View style={styles(scales).modal_content_container}>
                    <View style={styles(scales).modal_card}>
                        {/* Card head */}
                        <View style={styles(scales).card_header}>
                            <Text style={styles(scales).card_title}>{translator.translate(language, "Оберіть соус")}</Text>
                            <TouchableOpacity onPress={() => setListOpened(!listOpened)} style={styles(scales).close_modal_button}>
                                <IcoMoonIcon name="cancel" color={app_styles(scales).colors.app.white} size={Math.round(scales.widthScale * 12)} style={styles(scales).cancel_icon} />
                            </TouchableOpacity>
                        </View>
                        {/* Card body */}
                        <View style={styles(scales).card_body}>                            
                            <FlatList
                                style={{ borderBottomLeftRadius: Math.round(scales.heightScale * 8), borderBottomRightRadius: Math.round(scales.heightScale * 8), flexGrow: 1,  height: 100, flexBasis: 'auto'}}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index + 'key'}
                                data={data}
                                contentContainerStyle={{ borderBottomLeftRadius: Math.round(scales.heightScale * 8), borderBottomRightRadius: Math.round(scales.heightScale * 8) }}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => handleSelect(item)} style={{ borderBottomLeftRadius: Math.round(scales.heightScale * 8), borderBottomRightRadius: Math.round(scales.heightScale * 8) }} activeOpacity={.7}>
                                            <View style={styles(scales).item_list}>
                                                <Text style={styles(scales).items_list_title}>{item.property}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                ItemSeparatorComponent={() => <HorizontalDivider color={app_styles(scales).colors.app.light_grey} height={1} />}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}


//----EXPORT----//
export default SelectSauceInput;
