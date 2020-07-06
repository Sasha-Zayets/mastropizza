//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: Math.round(scales.widthScale * 10),
        right: 0
    },
    dot: {
        width: Math.round(scales.widthScale * 10),
        height: Math.round(scales.widthScale * 10),
        borderRadius: Math.round(scales.widthScale * 10),
        borderWidth: Math.round(scales.widthScale * 1),
        borderColor: app_styles(scales).colors.app.white,
        marginHorizontal: Math.round(scales.widthScale * 4),
    }
});


//---EXPORT---//
export default styles;