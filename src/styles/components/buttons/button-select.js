//----IMPORTS----//
//React native
import { StyleSheet, Platform } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales, isSelected) => StyleSheet.create({
    btn: {
        flexDirection: 'row',
        flex: 1,
        height: Math.round(scales.widthScale * 28),
        borderRadius: Math.round(scales.widthScale * 6),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Math.round(scales.widthScale * 1),
        backgroundColor: isSelected ? app_styles(scales).colors.app.blue : app_styles(scales).colors.app.white,
        borderColor: isSelected ? app_styles(scales).colors.app.blue : app_styles(scales).colors.text.grey
    },    
    title: {
        color: isSelected ? app_styles(scales).colors.text.white : app_styles(scales).colors.text.grey,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),    
    }
});


//----EXPORT----//
export default styles;