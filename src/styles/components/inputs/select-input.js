//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({
    input_container: {
        justifyContent: 'center',
        alignItems: "flex-start",
    },
    input: {
        alignSelf: 'stretch',
        height: Math.round(scales.heightScale * 40),
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
        borderBottomWidth: Math.round(scales.widthScale),
        borderBottomColor: app_styles(scales).colors.text.light_grey
    },
    arrow_icon: {
        position: "absolute",
        right: 0,
        top: Math.round(
            scales.heightScale * ((scales.heightScale * 40) / 2 - (scales.heightScale * 12) / 2)
        ),
        zIndex: 5,
        elevation: 2
    },
    placeholder_style: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.regular,
    },
    modal_content_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        paddingHorizontal: Math.round(scales.widthScale * 16),
        // paddingVertical: Math.round(scales.heightScale * 80)
    },
    modal_card: {
        backgroundColor: app_styles(scales).colors.app.white,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: Math.round(scales.heightScale * 8),
        overflow: 'hidden',
        // flex: 1,
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingLeft: Math.round(scales.widthScale * 16),
        paddingVertical: Math.round(scales.heightScale * 8),
        borderBottomColor: app_styles(scales).colors.app.gold,
        borderBottomWidth: Math.round(scales.heightScale),
        backgroundColor: app_styles(scales).colors.app.blue
    },    
    close_modal_button: {
        width: Math.round(scales.widthScale * 50),
        height: Math.round(scales.widthScale * 30),
        paddingRight: Math.round(scales.widthScale * 16),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    smile_container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.white,
        textAlign: 'center'
    },
    card_body: {       
        width: '100%',
        backgroundColor: app_styles(scales).colors.app.white,
        // flex: 1,
    },
    info: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.grey,
        textAlign: 'center'
    },
    item_list: {
        paddingHorizontal: Math.round(scales.widthScale * 16),
        paddingVertical: Math.round(scales.heightScale * 10),
        borderBottomLeftRadius: Math.round(scales.heightScale * 8),
        borderBottomRightRadius: Math.round(scales.heightScale * 8),
        backgroundColor: app_styles(scales).colors.app.white,
    },
    items_list_title: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
    },
    error_text: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.red,
        textAlign: 'left'
    }
});


//---EXPORT---//
export default styles;