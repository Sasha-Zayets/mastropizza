//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',  
        height: Math.round(scales.widthScale * 36),
        borderRadius: Math.round(scales.widthScale * 6)
    },
    icon_container: {
        marginRight: Math.round(scales.widthScale * 10)
    },
    title: {
        color: app_styles(scales).colors.app.white,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
    }
});


//----EXPORT----//
export default styles;