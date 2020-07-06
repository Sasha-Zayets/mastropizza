//----IMPORTS----//
//React native
import { StyleSheet, Platform } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    button: {
        flexDirection: 'row',
        height: Math.round(scales.widthScale * 22),
        width: Math.round(scales.widthScale * 38),
        borderRadius: Math.round(scales.widthScale * 22)
    },
    inner: {
        width: Math.round(scales.widthScale * 16),
        height: Math.round(scales.widthScale * 16),
        borderRadius: Math.round(scales.widthScale * 16),
        position: 'absolute',
        top: Math.round(scales.heightScale * 3),
        shadowOffset: { 
            width: Math.round(scales.widthScale * 1), 
            height: Math.round(scales.widthScale * 1)
        },
        shadowColor: app_styles(scales).colors.text.primary,
        shadowRadius: Math.round(scales.widthScale * 2),
        shadowOpacity: .4,
        elevation: 1
    }
});


//----EXPORT----//
export default styles;