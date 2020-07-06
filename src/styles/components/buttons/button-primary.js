//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    button: {
        flexDirection: 'row',        
        alignItems: 'center',  
        height: Math.round(scales.widthScale * 54),
        alignSelf: 'stretch',
        borderRadius: Math.round(scales.widthScale * 6),
    },
    button_contacts: {
        backgroundColor: app_styles(scales).colors.app.white,
        borderWidth: Math.round(scales.heightScale * 2),
        borderColor: app_styles(scales).colors.app.blue
    },
    icon_container: {
        marginRight: Math.round(scales.widthScale * 16)
    },
    title: {
        color: app_styles(scales).colors.app.white,
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        letterSpacing: Math.round(scales.widthScale * 0.5)
    },
    title_contacts: {
        color: app_styles(scales).app_red,
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base  * .8,
        letterSpacing: Math.round(scales.widthScale * 0.5)
    }
});


//----EXPORT----//
export default styles;