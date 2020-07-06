//----IMPORTS----//
//React native
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { app_styles } from "../../app_styles";

const screen_width = Dimensions.get('screen').width;


//---STYLES---/
const styles = (scales) => StyleSheet.create({  
    card_container: {
        paddingBottom: Math.round(scales.heightScale * 10),
        alignItems: 'flex-start',
    }, 
    product_thumbnail: {
        height: Math.round(scales.widthScale * 140),
        width: screen_width,
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'center',        
    },
    product_image: {
        resizeMode: 'contain',
        height: (screen_width * 1.42) - 10,
        width: screen_width - 10,
        top: Math.round(scales.heightScale * -40)
    },
    product_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
    },
    product_description: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.grey,
        fontSize: Math.round(scales.fontScale * 12),
    },
    description_container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        top: Math.round(scales.heightScale * -5)
    },
    subtitle: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 13),
        color: app_styles(scales).colors.text.primary,
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
        bottom: Math.round(scales.widthScale * 0),
        elevation: 4
    },
    manipulators_block: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: Math.round(scales.widthScale * 28),
        height: Math.round(scales.widthScale * 28),
        borderRadius: Math.round(scales.widthScale * 28),
        justifyContent: 'center',
        alignItems: 'center',        
    },
    product_quantity_container: {
        width: Math.round(scales.widthScale * 36),
        justifyContent: 'center',
        alignItems: 'center'
    },
    product_quantity_weight_container: {
        width: Math.round(scales.widthScale * 90),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Math.round(scales.widthScale * 10)
    },
    product_quantity: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 18),
        color: app_styles(scales).colors.text.primary,
    },
    weight: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.text.grey,
    }
});


//---EXPORT---//
export default styles;