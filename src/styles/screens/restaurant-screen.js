//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../app_styles";

const screen_width = Dimensions.get('screen').width;


//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    card_container: {
        backgroundColor: app_styles(scales).colors.app.white,
        marginRight: Math.round(scales.widthScale * 3),
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },
    row_container: {
        paddingVertical: Math.round(scales.heightScale * 3),
        paddingHorizontal: Math.round(scales.widthScale * 5)
    },
    thumbnail_image: {
        width: Math.round(scales.widthScale * 320),
        height: (Math.round(scales.widthScale * 320) * 10) / 16,
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'contain',
    },
    full_image: {
        resizeMode: 'contain',
        height: (screen_width * 1.43) - 10,
        width: screen_width - 10,
    },
    menu_img_container: {
        width: Math.round(scales.widthScale * 343),
        height: Math.round(scales.heightScale * 270)
    },
    menu_img: {
        width: null,
        height: null,
        flex: 1,
        resizeMode: 'stretch'
    },
    li_prefix: {
        width: Math.round(scales.widthScale * 6),
        height: Math.round(scales.widthScale * 6),
        borderRadius: Math.round(scales.widthScale * 6),
        backgroundColor: app_styles(scales).colors.text.primary,
        position: 'absolute',
        left: Math.round(scales.widthScale * -14),
        top: Math.round(scales.widthScale * 7)
    },
    social_btn: {
        width: Math.round(scales.widthScale * 35),
        height: Math.round(scales.widthScale * 35),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Math.round(scales.widthScale * 4)
    },
    contacts_block: {
        backgroundColor: app_styles(scales).colors.app.blue,
        paddingHorizontal: Math.round(scales.widthScale * 16),
        paddingTop: Math.round(scales.heightScale * 10),
        paddingBottom: Math.round(scales.heightScale * 20)
    },
    contact_title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base * .9,
        color: app_styles(scales).colors.app.white,
    },
    contact_text: {
        color: app_styles(scales).colors.app.white,
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: app_styles(scales).fonts.size.base * .8,
    },
    location_btn: {
        bottom: Math.round(scales.heightScale * 2),
        paddingHorizontal: Math.round(scales.widthScale * 8),
    },
    phone_btn: {
        flexDirection: 'row'
    },
    icon_container: {
        width: Math.round(scales.widthScale * 30),
    },
    text: {
        fontSize: app_styles(scales).fonts.size.base * .9,
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.white,
    },
});



//----EXPORT----//
export default styles;