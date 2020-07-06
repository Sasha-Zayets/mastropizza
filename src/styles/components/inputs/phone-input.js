//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({
    input_container: {
        justifyContent: 'center',
        alignItems: "flex-start",
    },
    input: {
        width: '100%',
        height: Math.round(scales.heightScale * 40),
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
    },
    placeholder_style: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.regular,
    },
    error_text: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.red,
        textAlign: 'left'
    },
});


//---EXPORT---//
export default styles;