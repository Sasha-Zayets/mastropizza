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
        height: Math.round(scales.widthScale * 54),
        alignSelf: 'stretch',
        borderRadius: Math.round(scales.widthScale * 6)
    },
    inner_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: Math.round(scales.widthScale * 30),
        height: Math.round(scales.widthScale * 30),
        marginRight: Math.round(scales.widthScale * 10)
    },
    title: {
        color: app_styles(scales).colors.text.white,
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        letterSpacing: Math.round(scales.widthScale * 0.5)
    }
});


//----EXPORT----//
export default styles;