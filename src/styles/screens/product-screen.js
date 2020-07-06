//----IMPORTS----//
//React native
import { StyleSheet, Platfrom } from 'react-native';
import { app_styles } from "../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    extra_ingradient_title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
        textTransform: 'uppercase'
    },
    ingredients_flat_list_container: {
        paddingHorizontal: Math.round(scales.widthScale * 16),
    },
    extra_ingradient_note: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.text.primary,
    },
    subtitle: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.text.primary,
        textTransform: 'uppercase'
    },
    limit_container: {
        paddingHorizontal: Math.round(scales.widthScale * 16)
    },
    limit_text: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
    },
    limit_quantity: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.app.blue,
    },
    ingr_price: {
        color: app_styles(scales).colors.app.blue,
        fontFamily: app_styles(scales).fonts.weight.medium
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
    total_value_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 13),
        color: app_styles(scales).colors.text.primary,
        textTransform: 'uppercase'
    },
    total_value_text: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 16),
        color: app_styles(scales).colors.app.blue,
    },
    total_value_subtitle: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 13),
        color: app_styles(scales).colors.text.primary,
        marginLeft: Math.round(scales.widthScale * 10)
    },
    total_value_subtext: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 13),
        color: app_styles(scales).colors.text.primary,
    }
});


//---EXPORT---/
export default styles;