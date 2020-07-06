//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";
const screen_width = Dimensions.get('window').width;

//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    container: {        
        backgroundColor: app_styles(scales).colors.app.white,
        paddingHorizontal: Math.round(scales.widthScale * 11),
        // paddingTop: Math.round(scales.heightScale * 16),
        paddingBottom: Math.round(scales.heightScale * 5),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    img_container: {
        width: screen_width,
        height: (screen_width * 9) / 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: screen_width,
        height: (screen_width * 10) / 16,
        resizeMode: 'cover',  
    },    
    title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
        textAlign: 'center'
    },
    note: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.light_grey,
        textAlign: 'center',
        lineHeight: Math.round(scales.heightScale * 18)
    },
    
});


//---EXPORT---//
export default styles;