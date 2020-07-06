//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";


//----STYLES----//
const styles = (scales) => StyleSheet.create({
    container: {
        backgroundColor: app_styles(scales).colors.app.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Math.round(scales.heightScale * 10),
    },       
    header_button_left: {
        width: Math.round(scales.widthScale * 47),
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: Math.round(scales.widthScale * 16),
    }, 
    header_button_left_menu: {
        width: Math.round(scales.widthScale * 47),
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: Math.round(scales.widthScale * 16),
    }, 
    title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.app.white,
    },
    menu_button: {
        width: Math.round(scales.widthScale * 26),
        height: Math.round(scales.heightScale * 20),
        justifyContent: 'space-between',
        top: Math.round(scales.heightScale * 3)
    },
    long_line: {
        width: Math.round(scales.widthScale * 26),
        height: Math.round(scales.heightScale * 2),
        borderRadius: Math.round(scales.widthScale * 1),
        backgroundColor: app_styles(scales).colors.app.orange
    },
    logo_container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo_block: {
        width: 140,
        height: 40
    },
    cart_group_container: {
        flexDirection: 'row', 
     }, 
    exclamation_container: {
        width: Math.round(scales.widthScale * 47),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: Math.round(scales.widthScale * 5),
    },
    bell_container: {
        width: Math.round(scales.widthScale * 47),
        justifyContent: 'center',
        paddingTop: Math.round(scales.heightScale * 1),
        alignItems: 'center',
        paddingRight: Math.round(scales.widthScale * 2),
    },
    settings_container: {
        width: Math.round(scales.widthScale * 47),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: Math.round(scales.widthScale * 16),
    },
    car_img: {
        width: Math.round(scales.widthScale * 33),
        height: Math.round(scales.widthScale * 27),
        resizeMode: 'contain'
    },       
    cart_container: {
        width: Math.round(scales.widthScale * 47),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: Math.round(scales.widthScale * 16),
    },
    cart_items_num_cont: {
        position: 'absolute',
        right: Math.round(scales.widthScale * -8),
        top: Math.round(scales.heightScale * -5),
        height: Math.round(scales.widthScale * 18),
        width: Math.round(scales.widthScale * 18),
        borderRadius: Math.round(scales.widthScale * 18),
        backgroundColor: app_styles(scales).colors.text.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cart_items_number: {
        fontSize: Math.round(scales.fontScale * 11),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.app.white,
        top: 0
    },
    nots_num_cont: {
        position: 'absolute',
        right: Math.round(scales.widthScale * 6),
        top: Math.round(scales.heightScale * 7),
        height: Math.round(scales.widthScale * 18),
        width: Math.round(scales.widthScale * 18),
        borderRadius: Math.round(scales.widthScale * 18),
        backgroundColor: app_styles(scales).colors.text.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nots_number: {
        fontSize: Math.round(scales.fontScale * 11),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.app.white,
        top: 0
    },
    logo: {
       width: Math.round(scales.widthScale * 90),
       height: Math.round(scales.widthScale * 54),
       resizeMode: 'contain' 
    }
});


//----EXPORT----//
export default styles