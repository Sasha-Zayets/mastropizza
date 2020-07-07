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
    ingr_price: {
        color: app_styles(scales).colors.app.blue,
        fontFamily: app_styles(scales).fonts.weight.medium
    },
    important: {
        color: app_styles(scales).colors.text.red,
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
        borderColor: app_styles(scales).colors.text.red,
        borderWidth: Math.round(scales.widthScale * 1),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exclamation_container: {
        width: Math.round(scales.widthScale * 20),
        height: Math.round(scales.widthScale * 20),
        borderRadius: Math.round(scales.widthScale * 208),
        backgroundColor: app_styles(scales).colors.text.red,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: Math.round(scales.widthScale * -10),
        top: Math.round(scales.widthScale * -10)
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
        color: app_styles(scales).colors.app.orange,
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
    },
    manipulators_block: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: Math.round(scales.widthScale * 34),
        height: Math.round(scales.widthScale * 34),
        borderRadius: Math.round(scales.widthScale * 34),
        justifyContent: 'center',
        alignItems: 'center',        
    },
    product_quantity_container: {
        width: Math.round(scales.widthScale * 44),
        justifyContent: 'center',
        alignItems: 'center'
    },
    product_quantity: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 18),
        color: app_styles(scales).colors.text.primary,
    },
    total_quantity_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    cancel_btn: {
        height: Math.round(scales.heightScale * 30),
        borderRadius: Math.round(scales.heightScale * 30),
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: app_styles(scales).colors.text.light_grey
    },
    cancel_btn_label: {
        color: app_styles(scales).colors.text.primary,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 11),
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
        color: app_styles(scales).colors.app.orange,
    },
});


//---EXPORT---/
export default styles;