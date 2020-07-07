//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Math.round(scales.heightScale * 40),
        backgroundColor: app_styles(scales).colors.app.white,
    },
    title: {
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
        fontFamily: app_styles(scales).fonts.weight.bold
    },
    li_elem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: Math.round(scales.heightScale * 45)
    },
    li_text: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.regular,
        lineHeight: Math.round(scales.heightScale * 19),
        color: app_styles(scales).colors.text.primary
    },     
    li_text_note: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.light_grey
    },
    aprox_del_pice: {
        fontSize: Math.round(scales.fontScale * 12),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.light_grey
    },
    weight_dish_total_title: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.medium,
        color: app_styles(scales).colors.text.primary,
        textTransform: 'uppercase'
    },
    total_title: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.text.primary,
    },
    total_price: {
        fontSize: Math.round(scales.fontScale * 18),
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.app.orange,
    },
    icon_container: {
        width: Math.round(scales.widthScale * 30),
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },
    text_container: {
        flex: 1,
    },
    modal_content_container: {
        flex: 1        
    },
    modal_card: {
        backgroundColor: app_styles(scales).colors.app.white,
        flex: 1
    },
    modal_card_footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: Math.round(scales.widthScale * 15),
        paddingRight: Math.round(scales.widthScale * 10),
        paddingVertical: Math.round(scales.heightScale * 5),       
    },
    footer_title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.app.white,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    close_modal_button_container: {
        height: Math.round(scales.widthScale * 40),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: app_styles(scales).colors.app.blue
    },
    important: {
        color: app_styles(scales).colors.app.blue,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
        textAlign: 'justify'
    },
    note_container: {
        flex: 1,
        paddingHorizontal: Math.round(scales.widthScale * 10),
        paddingVertical: Math.round(scales.heightScale * 7),
    },
    important_container: {        
        borderRadius: Math.round(scales.widthScale * 8),
        borderColor: app_styles(scales).colors.app.blue,
        borderWidth: Math.round(scales.widthScale),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});




//----EXPORT----//
export default styles;