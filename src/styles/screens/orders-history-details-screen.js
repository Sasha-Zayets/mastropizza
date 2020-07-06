//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: Math.round(scales.heightScale * 10),
        backgroundColor: app_styles(scales).colors.app.white,
    },
    text: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.primary,
        fontSize: Math.round(scales.fontScale * 14), 
    },
    slash: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 14),
        color: "#CCCCCC",
    },
    li_text: {
        fontSize: app_styles(scales).app_base_font_size,
        fontFamily: app_styles(scales).fonts.weight.regular,
        lineHeight: Math.round(scales.heightScale * 19),
        color: app_styles(scales).colors.text.primary
    }, 
    total_title: {
        fontSize: app_styles(scales).app_base_font_size,
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.text.primary,
    },
    total_price: {
        fontSize: app_styles(scales).app_base_font_size,
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.app.blue,
    },
});


//----EXPORT----//
export default styles;