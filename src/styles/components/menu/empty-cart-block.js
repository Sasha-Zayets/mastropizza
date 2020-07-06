//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Math.round(scales.widthScale * 42)
    },
    content_container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Math.round(scales.widthScale * 12)
    },
    title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 20),
        color: app_styles(scales).colors.text.primary,
    },
    note: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.light_grey,
        textAlign: 'center',
        lineHeight: Math.round(scales.heightScale * 18)
    }
});


//---EXPORT---//
export default styles;