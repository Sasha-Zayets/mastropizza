//----IMPORTS----//
//React native
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { app_styles } from "../../app_styles";

const screen_width = Dimensions.get('screen').width;


//---STYLES---/
const styles = (scales) => StyleSheet.create({  
    card_container: {
        alignSelf: 'stretch', 
        flexGrow: 1
    },
    card_inner_container: {
        width: Math.round(scales.widthScale * 93),
        padding: Math.round(scales.widthScale * 8),
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: Math.round(scales.widthScale),
        borderRadius: Math.round(scales.widthScale * 6),
    },
    price: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.app.black
    },
    uncheck_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: app_styles(scales).colors.app.orange,
        width: Math.round(scales.widthScale * 15),
        height: Math.round(scales.widthScale * 15),
        borderRadius: Math.round(scales.widthScale * 15),
    },
    img_container: { 
        justifyContent: 'center',
        width: Math.round(scales.widthScale * 91),
        height: Math.round(scales.widthScale * 45),
        alignItems: 'center'
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        alignSelf: 'stretch',
        resizeMode: 'contain'
    },
    name: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 10),
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    manipulators_wrap: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    manipulators_block: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Math.round(scales.heightScale * 3)
    },
    button: {
        width: Math.round(scales.widthScale * 22),
        height: Math.round(scales.widthScale * 22),
        borderRadius: Math.round(scales.widthScale * 22),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: app_styles(scales).colors.app.orange
    },
    ingredient_quantity_container: {    
        width: Math.round(scales.widthScale * 28),
        height: Math.round(scales.heightScale * 25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingredient_quantity: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 16),
        color: app_styles(scales).colors.text.primary,
    },
    
});


//---EXPORT---//
export default styles;