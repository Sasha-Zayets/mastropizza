//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    note: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    title: {
        fontSize: Math.round(scales.fontScale * 18),
        fontFamily: app_styles(scales).fonts.weight.medium,
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    
});


//----EXPORT----//
export default styles;