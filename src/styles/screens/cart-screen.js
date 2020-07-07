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
    info_text: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.primary,
    },  
    note_text: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.te,
    },
    total_title: {
        fontSize: Math.round(scales.fontScale * 20),
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.text.primary,
    },
    total_price: {
        fontSize: Math.round(scales.fontScale * 20),
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.app.orange,
    },
    subtotal_title: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.medium,
        color: app_styles(scales).colors.text.primary,
    },
    subtotal_price: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.medium,
        color: app_styles(scales).colors.text.grey,
    },
    sum_block: {
        width: Math.round(scales.widthScale * 75),
        alignItems: 'flex-end'
    },
    sum: {
        color: '#08C83E',
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.bold,
    },
    important: {
        color: app_styles(scales).app_red,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
        textAlign: 'justify'
    },
    note_container: {
        flex: 1,
        paddingHorizontal: Math.round(scales.widthScale * 10),
        paddingVertical: Math.round(scales.heightScale * 7),
    },
});


//----EXPORT----//
export default styles;