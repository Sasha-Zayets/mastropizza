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
        borderRadius: Math.round(scales.widthScale * 36),
        paddingHorizontal: Math.round(scales.widthScale * 10),
        flex: 1
    },
    title: {
        color: app_styles(scales).colors.text.white,
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 12),
    }
});


//----EXPORT----//
export default styles;
