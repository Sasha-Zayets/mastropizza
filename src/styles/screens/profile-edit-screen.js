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
    avatar_container: {
        marginRight: Math.round(scales.widthScale * 16),
        width: Math.round(scales.widthScale * 70),
        height: Math.round(scales.widthScale * 70),
        borderRadius: Math.round(scales.widthScale * 70),
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        marginRight: Math.round(scales.widthScale * 16),
        width: Math.round(scales.widthScale * 70),
        height: Math.round(scales.widthScale * 70),
        borderRadius: Math.round(scales.widthScale * 70),
    },
});


//----EXPORT----//
export default styles;