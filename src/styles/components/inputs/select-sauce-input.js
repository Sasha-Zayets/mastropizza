//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";



//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    input: {
        flex: 1,
        height: Math.round(scales.widthScale * 28),
        borderRadius: Math.round(scales.widthScale * 6),
        backgroundColor: '#FFFFFF',
        fontSize: Math.round(scales.fontScale * 12),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: "#0d0d0d",
        borderWidth: Math.round(scales.widthScale),
        borderColor: app_styles(scales).colors.text.light_grey,
        paddingLeft: Math.round(scales.widthScale * 10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon_container: {
        height: Math.round(scales.widthScale * 28),
        width: Math.round(scales.widthScale * 30),
        borderTopRightRadius: Math.round(scales.widthScale * 28),
        borderBottomRightRadius: Math.round(scales.widthScale * 28),  
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: Math.round(scales.widthScale * 10) 
    },  
    val: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 12),
        width: '50%',
        flexGrow: 1,
    },
    modal_content_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        paddingHorizontal: Math.round(scales.widthScale * 16),
        paddingVertical: Math.round(scales.heightScale * 80)
    },
    modal_card: {
        backgroundColor: app_styles(scales).colors.app.white,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: Math.round(scales.heightScale * 8),
        overflow: 'hidden',
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
    card_title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 16),
        color: app_styles(scales).colors.text.white,
        textAlign: 'center'
    },
    card_body: {       
        width: '100%',
        backgroundColor: app_styles(scales).colors.app.white,
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
});


//---EXPORT---//
export default styles;