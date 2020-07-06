//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../app_styles";


//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {        
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
        fontFamily: app_styles(scales).fonts.weight.medium
    },
    title_bold: {
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
        fontFamily: app_styles(scales).fonts.weight.bold
    },
    icon_container: {
        width: Math.round(scales.widthScale * 30),
    },
    button_container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: Math.round(scales.widthScale * 40)
    }
});


//----EXPORT----//
export default styles;