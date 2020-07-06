//----IMPORTS----//
//React
import React, { useContext, useState, useEffect } from 'react';
//React native
import { TouchableOpacity, Text, View, TextInput, Modal, FlatList } from 'react-native';
//React-native-vector-icons package
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { HorizontalDivider, Spacer } from '../shared';
//Styles
import styles from "../../styles/components/inputs/select-ingredients-category-input";
import { app_styles } from '../../styles/app_styles';
import translator from "../../translator/translator";




//----COMPONENT----//
const SelectIngredientsCategoryInput = ({ callback, dataList, defaultValue }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const [modalOpened, setModalOpened] = useState(false);
    const [filter, setFilter] = useState(null);
    const [value, setValue] = useState(null);


    //Hooks and Methods
    useEffect(() => {
        if(defaultValue && !value){
            setValue(defaultValue.name);
        }        
    });


    const handleSelect = (value) => {
        callback(value)
        setValue(value.name);
        setModalOpened(false);
    }


    const getArrowPosition = () => {
        return modalOpened ? "-180deg" : "0deg";
    }


    const filteredListData = () => {
        if(filter){
            return dataList.filter(item => {
                return item.name.toLowerCase().indexOf(filter.toLowerCase()) === 0;
            })
        }
        return dataList;
    }

    const handlePress = () => {
        setModalOpened(!modalOpened)
    }



    //Template
    return (
        <>
            <TouchableOpacity onPress={handlePress} activeOpacity={.7}>
                <View pointerEvents="none">
                    <TextInput
                        style={styles(scales).input}
                        editable={false}
                        value={value}
                    />
                </View>
                <IcoMoonIcon
                    style={[styles(scales).arrow_icon, { transform: [{ rotate: getArrowPosition() }], }]}
                    name="arrow-point-down"
                    color={app_styles(scales).colors.text.light_grey}
                    size={Math.round(scales.widthScale * 12)}
                />
            </TouchableOpacity>
            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalOpened}
            >
                <View style={styles(scales).modal_content_container}>
                    <View style={styles(scales).modal_card}>
                        {/* Card head */}
                        <View style={styles(scales).card_header}>
                            <Text style={styles(scales).card_title}>{translator.translate(language, 'Категорія складників')}</Text>
                            <TouchableOpacity onPress={() => setModalOpened(!modalOpened)} style={styles(scales).close_modal_button}>
                                <IcoMoonIcon name="cancel" color={app_styles(scales).colors.text.white} size={Math.round(scales.widthScale * 12)} style={styles(scales).cancel_icon} />
                            </TouchableOpacity>
                        </View>
                        {/* Card body */}
                        <View style={styles(scales).card_body}>
                            {/* Items */}
                            <FlatList
                                style={{ borderBottomLeftRadius: Math.round(scales.heightScale * 8), borderBottomRightRadius: Math.round(scales.heightScale * 8), flexGrow: 1,  flexBasis: 'auto'}}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index + 'key'}
                                data={filteredListData()}
                                contentContainerStyle={{ borderBottomLeftRadius: Math.round(scales.heightScale * 8), borderBottomRightRadius: Math.round(scales.heightScale * 8) }}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => handleSelect(item)} style={{ borderBottomLeftRadius: Math.round(scales.heightScale * 8), borderBottomRightRadius: Math.round(scales.heightScale * 8) }} activeOpacity={.7}>
                                            <View style={styles(scales).item_list}>
                                                <Text style={styles(scales).items_list_title}>{item.name}</Text>
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
export default SelectIngredientsCategoryInput;
