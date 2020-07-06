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
    logo_container: {
        width: '100%',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Math.round(scales.heightScale * 40),
        backgroundColor: app_styles(scales).colors.app.white,
    },
    btn_group: {
        width: '100%'
    },
    content_container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: Math.round(scales.widthScale * 86),
    },
    li_text: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary
    },
    made: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 11),
        color: app_styles(scales).colors.text.light_grey,
        // textTransform: 'uppercase'
    },
    menu_li: {
        alignItems: 'flex-start'
    },
    language_switcher: {
        paddingBottom: Math.round(scales.heightScale * 35),
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        paddingLeft: Math.round(scales.widthScale * 102)
    },
    icon_devseonet: {
        bottom: Math.round(scales.heightScale * 7)
    }
});


//----EXPORT----//
export default styles;
