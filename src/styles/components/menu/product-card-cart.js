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
        padding: Math.round(scales.widthScale * 5),
        backgroundColor: app_styles(scales).colors.app.white,
        borderRadius: Math.round(scales.widthScale * 8),
        marginRight: Math.round(scales.widthScale * 6),
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },    
    product_thumbnail: {
        borderRadius: Math.round(scales.widthScale * 8),
        height: Math.round(scales.widthScale * 75),
        width: Math.round(scales.widthScale * 75),
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'cover',
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
        color: app_styles(scales).colors.app.blue
    },
    weight_dish_note: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        color: app_styles(scales).colors.text.grey,
        fontSize: Math.round(scales.fontScale * 13)
    },
    product_price_black: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.text.primary
    },
    product_weight: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 12),
        color: "#444444"
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
    cart_button: {
        width: Math.round(scales.widthScale * 40),
        height: Math.round(scales.heightScale * 30),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    manipulators_block: {
        width: Math.round(scales.widthScale * 62),
        height: Math.round(scales.heightScale * 30),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Math.round(scales.widthScale * 20)
    },
    manipulator_add_button: {
        width: Math.round(scales.widthScale * 18),
        height: Math.round(scales.widthScale * 18),
        borderRadius: Math.round(scales.widthScale * 18),
        backgroundColor: app_styles(scales).colors.app.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Math.round(scales.widthScale),
        borderColor: app_styles(scales).colors.app.blue
    },
    manipulator_subtract_button: {
        width: Math.round(scales.widthScale * 18),
        height: Math.round(scales.widthScale * 18),
        borderRadius: Math.round(scales.widthScale * 18),
        backgroundColor: app_styles(scales).colors.app.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Math.round(scales.widthScale),
        borderColor: "#CCCCCC"
    },    
    remove_button: {
        height: Math.round(scales.heightScale * 30),
        paddingHorizontal: Math.round(scales.widthScale * 3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_container: {
        height: Math.round(scales.heightScale * 30),
        paddingHorizontal: Math.round(scales.widthScale * 2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    product_quantity_container: {
        width: Math.round(scales.widthScale * 16),
        height: Math.round(scales.heightScale * 30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    product_quantity: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary
    }
});


//---EXPORT---//
export default styles;