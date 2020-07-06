//----IMPORTS----//
//React native
import { StyleSheet, Platform } from 'react-native';
import { app_styles } from "../../app_styles";


//----STYLES----//
const styles = (scales) => StyleSheet.create({
    zoom_container: {
        width: Math.round(scales.widthScale * 30),
        height: Math.round(scales.widthScale * 30),
        backgroundColor: app_styles(scales).colors.app.white,
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_content_container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: app_styles(scales).colors.app.white
    },
    modal_card: {
        backgroundColor: app_styles(scales).colors.app.white,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    header_row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        paddingTop: Math.round(scales.heightScale * 10),
        paddingRight: Math.round(scales.widthScale * 10),
    },
    close_modal_button_container: {
        width: Math.round(scales.widthScale * 40),
        height: Math.round(scales.widthScale * 40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    close_modal_button: {
        width: Math.round(scales.widthScale * 30),
        height: Math.round(scales.widthScale * 30),
        justifyContent: 'center',
        alignItems: 'center'
    }
});


//----EXPORT----//
export default styles