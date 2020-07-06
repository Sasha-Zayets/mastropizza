//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";




//----STYLES----//
const styles = (scales) => StyleSheet.create({
    button: {
        height: Math.round(scales.widthScale * 42),
        alignSelf: 'stretch',
        borderRadius: Math.round(scales.widthScale * 6),
        backgroundColor: app_styles(scales).colors.app.blue,
        borderWidth: Math.round(scales.heightScale * 1),
        borderColor: app_styles(scales).colors.app.blue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: app_styles(scales).colors.text.white,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
        letterSpacing: Math.round(scales.widthScale * 0.4),
        textTransform: 'uppercase'
    }
});


//----EXPORT----//
export default styles;