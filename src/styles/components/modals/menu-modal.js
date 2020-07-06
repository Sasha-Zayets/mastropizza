//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";

const screen_width = Dimensions.get('screen').width;

//----STYLES----//
const styles = (scales) => StyleSheet.create({        
    modal_card: {
        backgroundColor: app_styles(scales).colors.app.white, 
        borderRadius: Math.round(scales.heightScale * 8), 
        alignItems: 'center',
        justifyContent: "center", 
        flex: 1,
    },
    header_cont: {
        paddingVertical: Math.round(scales.heightScale * 5),
        paddingLeft: Math.round(scales.widthScale * 16),
        borderTopLeftRadius:  Math.round(scales.heightScale * 8),
        borderTopRightRadius:  Math.round(scales.heightScale * 8),
    },
    close_modal_button: {
        width: Math.round(scales.widthScale * 50),
        height: Math.round(scales.heightScale * 35),   
        paddingRight: Math.round(scales.widthScale * 16),     
        justifyContent: 'center',
        alignItems: 'flex-end',
    },  
    icon_container: {
        justifyContent: 'center',
        alignItems: 'center'
    },      
    card_body: {
        paddingBottom: Math.round(scales.heightScale * 10),
        paddingTop: Math.round(scales.heightScale * 10),
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        borderBottomLeftRadius: Math.round(scales.heightScale * 8),
        borderBottomRightRadius: Math.round(scales.heightScale * 8),
        flexGrow: 1
    },    
    title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    card_container: {
        backgroundColor: app_styles(scales).colors.app.white,
        marginRight: Math.round(scales.widthScale * 3),
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    thumbnail_menu_image: {        
        width: Math.round(scales.widthScale * 340),
        height: Math.round((scales.widthScale * 340) * 1.414),
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: app_styles(scales).colors.text.light_grey
    },
    full_menu_image: {
        resizeMode: 'contain',
        height: (screen_width * 1.414) - 10,
        width: screen_width - 10,
        borderWidth: 1,
        borderColor: app_styles(scales).colors.text.light_grey
    },
    btn_group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Math.round(scales.heightScale * 30),
        marginTop: 'auto',
        alignSelf: 'stretch'
    },
    btn_manipulator: {
        paddingHorizontal: Math.round(scales.widthScale * 20),
        paddingVertical: Math.round(scales.heightScale * 4),
        backgroundColor: app_styles(scales).colors.app.blue,
        borderRadius: Math.round(scales.heightScale * 6)
    },
    pages_cont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Math.round(scales.widthScale * 10)
    }, 
    page: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
    }
});


//----EXPORT----//
export default styles