//----IMPORTS----//
//React native
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { app_styles } from "../app_styles";


const screen_width = Dimensions.get('window').width;



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    thumbnail: {
        height: Math.round(scales.widthScale * 140),
        width: screen_width,
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'center',
    },
    image: {
        resizeMode: 'contain',
        height: (screen_width * 1.42) - 10,
        width: screen_width - 10,
        top: Math.round(scales.heightScale * -40)
    },
    toggler_btn: {
        width: Math.round(scales.widthScale * 50),
        height: Math.round(scales.widthScale * 50),
        borderRadius: Math.round(scales.widthScale * 50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        position: 'absolute',
        right: Math.round(scales.widthScale * 16),
        bottom: 0,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: .5, height: .5 },
                shadowRadius: 4,
                shadowOpacity: 0.4
            },
            android: {
                elevation: 4
            }
        }),
    },
    title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base * 1.1,
        color: app_styles(scales).colors.text.primary
    },
    sub_title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary
    },
    icon_container: {
        width: Math.round(scales.widthScale * 30),
    },
    text: {
        fontSize: app_styles(scales).fonts.size.base * .9,
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.grey,
    },
});


//----EXPORT----//
export default styles;