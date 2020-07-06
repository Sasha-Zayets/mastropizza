//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    button: {
        height: Math.round(scales.heightScale * 42),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: Math.round(scales.heightScale),
        borderBottomWidth: Math.round(scales.heightScale),
        borderColor: app_styles(scales).colors.text.grey
    },   
    title: {
        color: app_styles(scales).colors.text.primary,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
    }
});


//----EXPORT----//
export default styles;