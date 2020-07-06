//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";

const screen_width = Dimensions.get('screen').width;

//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    container: {
        paddingLeft: Math.round(scales.widthScale * 16)
    },
    button: {
        width: Math.round(scales.widthScale * 45),        
        alignSelf: 'stretch',
        paddingRight: Math.round(scales.widthScale * 16),
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    order_sum: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.app.blue,
        fontSize: app_styles(scales).fonts.size.base
    },
    text: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.primary,
        fontSize: Math.round(scales.fontScale * 14), 
    },
    slash: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: Math.round(scales.fontScale * 14),
        color: "#CCCCCC",
    },
    product_thumbnail_container: {
        backgroundColor: app_styles(scales).colors.app.white,
        borderRadius: Math.round(scales.widthScale * 8),
        marginRight: Math.round(scales.widthScale * 3),
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },    
    product_thumbnail: {
        borderRadius: Math.round(scales.widthScale * 8),
        height: Math.round(scales.widthScale * 75),
        width: Math.round(scales.widthScale * 75),
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'cover',
    },
    product_image: {
        resizeMode: 'cover',
        height: (screen_width * 1.42) - 10,
        width: screen_width - 10,
    },
    review_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    edit: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.light_grey,
    },
    review_subtitle: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary,
    }
});


//---EXPORT---//
export default styles;