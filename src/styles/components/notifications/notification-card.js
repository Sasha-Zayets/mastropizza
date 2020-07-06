//----IMPORTS----//
//React native
import { StyleSheet, Platform } from 'react-native';
import {app_styles} from "../../app_styles";


//----STYLES----//
const styles = (scales) => StyleSheet.create({
    container: {
        borderRadius: Math.round(scales.widthScale * 7),
        backgroundColor: 'whitesmoke',        
        flexDirection: 'row',
    },
    body_container: {
        flex: 1,
        paddingHorizontal: Math.round(scales.widthScale * 15),
        paddingVertical: Math.round(scales.heightScale * 10),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {        
        fontSize: Math.round(scales.fontScale * 14),
        fontFamily: app_styles(scales).fonts.weight.regular
    },
    read_more: {
        width: Math.round(scales.widthScale * 25),
        alignSelf: 'stretch',
        backgroundColor: '#e4e3e3',
        borderTopRightRadius: Math.round(scales.widthScale * 7),
        borderBottomRightRadius: Math.round(scales.widthScale * 7),
        justifyContent: 'center',
        alignItems: 'center'
    }
});


//----EXPORT----//
export default styles