//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";


//----STYLES----//
const styles = (scales) => StyleSheet.create({    
    modal_content_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        paddingHorizontal: Math.round(scales.widthScale * 16) 
    },
    modal_card: {
        backgroundColor: app_styles(scales).colors.app.white,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',  
        borderRadius: Math.round(scales.heightScale * 8)     
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingLeft: Math.round(scales.widthScale * 16),
        backgroundColor: app_styles(scales).colors.app.orange,
        paddingVertical: Math.round(scales.heightScale * 16),
        borderBottomColor: app_styles(scales).colors.app.gold,
        borderBottomWidth: Math.round(scales.heightScale * 1),
        borderTopLeftRadius: Math.round(scales.heightScale * 8),
        borderTopRightRadius: Math.round(scales.heightScale * 8)
    },
    close_modal_button: {
        width: Math.round(scales.widthScale * 50),
        height: Math.round(scales.widthScale * 30),
        paddingRight: Math.round(scales.widthScale * 16),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    card_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.white,
    },
    cancel_icon: {
        top: Math.round(scales.heightScale * 2)
    },
    card_body: {
        paddingHorizontal: Math.round(scales.widthScale * 16),
        paddingTop: Math.round(scales.heightScale * 16),
        paddingBottom: Math.round(scales.heightScale * 24),
        alignSelf: 'stretch'
    },
    line: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    info: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 15),
        color: app_styles(scales).colors.text.primary,
        justifyContent: 'center'
    },
    info_important: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 15),
        color: app_styles(scales).colors.text.primary,
    },
    text_container: {
        flexGrow: 1,
        width: 50,
    },
    success_info: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 15),
        color: app_styles(scales).colors.app.green,
    },
    icon_container: {
        width: Math.round(scales.widthScale * 30),
        height: Math.round(scales.widthScale * 35),
        justifyContent: 'center',
        paddingTop: Math.round(scales.heightScale * 4),
        alignItems: 'flex-start',
        alignSelf: 'stretch'
    }
});


//----EXPORT----//
export default styles