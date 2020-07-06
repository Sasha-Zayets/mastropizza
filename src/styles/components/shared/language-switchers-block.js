//----IMPORTS----//
//React native
import { StyleSheet, Platform } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    btn_group: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    flag_img: {
        width: Math.round(scales.widthScale * 24),
        height: Math.round(scales.heightScale * 16),
        marginRight: Math.round(scales.widthScale * 10),
        borderColor: app_styles(scales).colors.text.light_grey,
        borderWidth: Math.round(scales.widthScale * 1)
    },
    label: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.medium,
        alignSelf: 'center',
        lineHeight: Math.round(scales.heightScale * 19),        
    }
});


//----EXPORT----//
export default styles;