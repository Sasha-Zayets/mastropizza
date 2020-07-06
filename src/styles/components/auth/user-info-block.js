//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    avatar_container: {
        marginRight: Math.round(scales.widthScale * 16),
        width: Math.round(scales.widthScale * 70),
        height: Math.round(scales.widthScale * 70),
        borderRadius: Math.round(scales.widthScale * 70),
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        marginRight: Math.round(scales.widthScale * 16),
        width: Math.round(scales.widthScale * 70),
        height: Math.round(scales.widthScale * 70),
        borderRadius: Math.round(scales.widthScale * 70),
    },
    li_text: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).app_light_black
    },    
    li_text_separator: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 18),
        color: "#CCCCCC"
    },
    note: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.grey
    },
    info_container: {
        flex: 1,
        justifyContent: 'center'
    },
    user_name: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary
    },
    no_info: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontStyle: 'italic',
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.grey
    },
    user_info: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 12),
        color: app_styles(scales).colors.text.grey
    }
});


//---EXPORT---//
export default styles;