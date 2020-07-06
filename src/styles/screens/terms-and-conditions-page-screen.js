//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    text: {
        fontSize: Math.round(scales.fontScale * 15),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.primary,
    },
});


//----EXPORT----//
export default styles;