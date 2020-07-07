//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";

const screen_width = Dimensions.get('screen').width;


//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    container: {
        paddingVertical: Math.round(scales.heightScale * 3)
    },
    inner_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    product_thumbnail_container: {
        backgroundColor: app_styles(scales).colors.app.white,
        borderRadius: Math.round(scales.widthScale * 8),
        marginRight: Math.round(scales.widthScale * 6),
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },    
    product_thumbnail: {
        borderRadius: Math.round(scales.widthScale * 8),
        height: Math.round(scales.widthScale * 90),
        width: Math.round(scales.widthScale * 90),
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'contain',
    },
    product_image: {
        resizeMode: 'contain',
        height: (screen_width * 1.42) - 10,
        width: screen_width - 10,
    },
    product_description_container: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-start',
    },
    slash: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 14),
        color: "#CCCCCC",
    },
    product_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
    },    
    product_price: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.app.black,
        fontSize: Math.round(scales.fontScale * 14),
    },
    product_price_black: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.text.primary
    },
    product_weight: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 12),
        color: "#444444"
    },    
    product_quantity: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.text.light_grey
    },    
    subtotal_price: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.medium,
        color: app_styles(scales).colors.text.light_grey
    },
    subtitle: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 12),
        color: "#444444"
    },
    ingredients: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 11),
        color: "#444444"
    },
});


//---EXPORT---//
export default styles;