//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";


let { width, height } = Dimensions.get('window');

//---STYLES---/
const styles = (scales) => StyleSheet.create({
    input_container: {
        justifyContent: 'center',
        alignItems: "flex-start",
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: Math.round(scales.heightScale * 40),
    },
    input: {
        width: '100%',
        height: Math.round(scales.heightScale * 40),
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
        borderBottomWidth: Math.round(scales.widthScale * 1),
        borderBottomColor: app_styles(scales).colors.text.light_grey,
    },
    placeholder_style: {
        fontSize: app_styles(scales).fonts.size.base,
        fontFamily: app_styles(scales).fonts.weight.regular,
    },
    error_text: {
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.red,
        textAlign: 'left'
    },
    modal_content_container: {        
        height: '100%',
        alignSelf: 'flex-end',
        width: width,
        justifyContent: "flex-end",
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        marginBottom: 0,
        zIndex: 999
    },
    picker_container: {
        flexGrow: 0,
        flexShrink: 1,
    },
    top_container: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: Math.round(scales.heightScale * 16),
        borderBottomWidth: Math.round(scales.heightScale * 1),
        paddingHorizontal: Math.round(scales.widthScale * 16),
    },
    close_piker: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
    }
});


//---EXPORT---//
export default styles;