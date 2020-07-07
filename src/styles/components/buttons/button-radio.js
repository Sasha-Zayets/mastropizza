//----IMPORTS----//
//React native
import { StyleSheet, Platform } from 'react-native';
import { app_styles } from "../../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    btn_group: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    outer_container: {
        width: Math.round(scales.widthScale * 19),
        height: Math.round(scales.widthScale * 19),
        borderRadius: Math.round(scales.widthScale * 19),
        borderWidth: Math.round(scales.widthScale * 1),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Math.round(scales.widthScale * 10)
    },
    inner_container: {
        width: Math.round(scales.widthScale * 10),
        height: Math.round(scales.widthScale * 10),
        borderRadius: Math.round(scales.widthScale * 10),
        backgroundColor: app_styles(scales).colors.app.orange
    },
    label: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.regular,
        alignSelf: 'center',
        lineHeight: Math.round(scales.heightScale * 19),        
    }
});


//----EXPORT----//
export default styles;