//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    button: {
        height: Math.round(scales.heightScale * 36),
        paddingHorizontal: Math.round(scales.widthScale * 20),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Math.round(scales.widthScale * 1),
        borderRadius: Math.round(scales.heightScale * 36)        
    },   
    title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
    }
});


//----EXPORT----//
export default styles;