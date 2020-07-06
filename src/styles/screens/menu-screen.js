//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import {app_styles} from "../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    categories_list_container: {
        backgroundColor: app_styles(scales).colors.app.white
    },
    categories_flat_list_container: {
        paddingHorizontal: Math.round(scales.widthScale * 16)
    },
    note: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: '#999999',
        textAlign: 'center'
    },
    menu_icon: {
        width: Math.round(scales.widthScale * 16),
        height: Math.round(scales.widthScale * 16),
        resizeMode: 'cover',
        marginRight: Math.round(scales.widthScale * 5)
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
        paddingVertical: Math.round(scales.heightScale * 40),
        backgroundColor: app_styles(scales).colors.app.white,
    },
    btn_group: {
        width: '100%'
    },
    label: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
    },
    tab: {
        flexDirection: 'row',
        minHeight: Math.round(scales.heightScale * 30),
        paddingHorizontal: Math.round(scales.widthScale * 20),
        width: 'auto',
    },
    error_container: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.blue,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Math.round(scales.widthScale * 30)
    },
    error_title: {
        color: app_styles(scales).colors.app.gold,
        textTransform: 'uppercase',
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base
    },
    error_text: {
        color: app_styles(scales).colors.text.white,
        textAlign: 'center',
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: app_styles(scales).fonts.size.base * .8
    }
});


//----EXPORT----//
export default styles;