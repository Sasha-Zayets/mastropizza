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
        fontSize: Math.round(scales.fontScale * 18),
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
        color: app_styles(scales).colors.text.grey,
        textAlign: 'center'
    },
    info_darker: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    info_subtitle: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    }    
});


//----EXPORT----//
export default styles