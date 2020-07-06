//----IMPORTS----//
//React
import React, { useContext, useState, useEffect } from "react";
//React native
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Components
import { VerticalSpacer } from "../shared";
//Styles
import styles from "../../styles/components/shared/language-switchers-block";
import { app_styles } from "../../styles/app_styles";




//----COMPONENT----//
const LanguageSwitchersBlock = () => {
    //Data and State
    const { state: { scales, language }, setLanguage } = useContext(AppSettingsContext);


    //Hooks and Methods
    useEffect(() => {
        if(!language){
            arrangeLanguageSettings()
        }
    }, [language]);


    const defineEngFlagSrc = () => {
        return language === 'english' ? require("../../../assets/images/flags/eng.png") : require("../../../assets/images/flags/eng_nonactive.png");
    }


    const defineUkrFlagSrc = () => {
        return language === 'ukrainian' ? require("../../../assets/images/flags/ukr.png") : require("../../../assets/images/flags/ukr_nonactive.png");
    }

    // const defineRusFlagSrc = () => {
    //     return language === 'russian' ? require("../../../assets/images/flags/rus.png") : require("../../../assets/images/flags/rus_nonactive.png");
    // }



    //REMOVE AFTER DEVELOPING
    const arrangeLanguageSettings = async () => {
        let lang = await AsyncStorage.getItem('language');
        if (lang) {
            setLanguage(lang)
        } else {
            setLanguage('ukrainian')
        }
    }


    //Template
    return (
        <View style={app_styles(scales).row_start}>
            <TouchableOpacity onPress={() => setLanguage('ukrainian')} style={styles(scales).btn_group} activeOpacity={.7}>
                <Image
                    source={defineUkrFlagSrc()}
                    style={styles(scales).flag_img}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles(scales).label, { color: language === 'ukrainian' ? app_styles(scales).colors.text.primary : app_styles(scales).colors.text.grey }]}>Укр</Text>
                </View>
            </TouchableOpacity>
            <VerticalSpacer spaceWidth={22}/>
            <TouchableOpacity onPress={() => setLanguage('english')} style={styles(scales).btn_group} activeOpacity={.7}>
                <Image
                    source={defineEngFlagSrc()}
                    style={styles(scales).flag_img}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles(scales).label, { color: language === 'english' ? app_styles(scales).colors.text.primary : app_styles(scales).colors.text.grey }]}>Eng</Text>
                </View>
            </TouchableOpacity>
            {/*<VerticalSpacer spaceWidth={22}/>*/}
            {/*<TouchableOpacity onPress={() => setLanguage('russian')} style={styles(scales).btn_group} activeOpacity={.7}>*/}
            {/*    <Image*/}
            {/*        source={defineRusFlagSrc()}*/}
            {/*        style={styles(scales).flag_img}*/}
            {/*    />*/}
            {/*    <View style={{ flexDirection: 'row' }}>*/}
            {/*        <Text style={[styles(scales).label, { color: language === 'russian' ? app_styles(scales).colors.text.primary : app_styles(scales).colors.text.grey }]}>Рус</Text>*/}
            {/*    </View>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );

}





//----EXPORT----//
export default LanguageSwitchersBlock;
