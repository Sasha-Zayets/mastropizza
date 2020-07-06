//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    button: {
        paddingVertical: Math.round(scales.heightScale * 2),
    },   
    title: {
        color: app_styles(scales).colors.text.primary,        
        fontSize: app_styles(scales).fonts.size.base,
    },
    nots_num_cont: {
        position: 'absolute',
        right: Math.round(scales.widthScale * -20),
        top: Math.round(scales.heightScale * 4),
        height: Math.round(scales.widthScale * 18),
        width: Math.round(scales.widthScale * 18),
        borderRadius: Math.round(scales.widthScale * 18),
        backgroundColor: app_styles(scales).colors.text.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nots_number: {
        fontSize: Math.round(scales.fontScale * 11),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.app.white,
        top: 0
    }
});


//----EXPORT----//
export default styles;