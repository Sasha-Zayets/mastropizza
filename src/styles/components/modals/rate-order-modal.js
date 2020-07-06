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
        backgroundColor: "#FFFFFF",        
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',  
        borderRadius: Math.round(scales.heightScale * 8),
    },
    close_modal_button: {
        width: Math.round(scales.widthScale * 30),
        height: Math.round(scales.heightScale * 30),        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: Math.round(scales.widthScale * 16),
        top: Math.round(scales.heightScale * 16)
    },  
    icon_container: {
        justifyContent: 'center',
        alignItems: 'center'
    },  
    card_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    card_body: {
        paddingHorizontal: Math.round(scales.widthScale * 16),
        paddingBottom: Math.round(scales.heightScale * 40),
        paddingTop: Math.round(scales.heightScale * 30)
    },
    info: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.light_grey,
        textAlign: 'center'
    },    
    preloader_container: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        borderRadius: Math.round(scales.heightScale * 16),
    },
    error_container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clear_err_btn: {
        paddingHorizontal: Math.round(scales.widthScale * 13),
        paddingVertical: Math.round(scales.heightScale * 4),
        backgroundColor: app_styles(scales).colors.app.blue,
        borderRadius: Math.round(scales.widthScale * 6),
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    btn_title: {
        fontFamily: app_styles(scales).app_bold_font_family,
        fontSize: Math.round(scales.fontScale * 16),
        color: app_styles(scales).colors.text.white,
        textTransform: 'uppercase'
    }   
});


//----EXPORT----//
export default styles