//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";

const screen_width = Dimensions.get('screen').width;



//---STYLES---/
const styles = (scales) => StyleSheet.create({  
    card_container: {
        alignSelf: 'stretch', 
        flexGrow: 1,
        borderTopLeftRadius: Math.round(scales.widthScale * 6),
        borderTopRightRadius: Math.round(scales.widthScale * 6),
    },
    thumbnail_container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    thumbnail: {
        width: '100%',
        resizeMode: 'cover',
        alignSelf: 'flex-start',
        height: Math.round(scales.heightScale * 180),
    },
    date_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    date: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 13),
        color: app_styles(scales).colors.text.grey
    },
    title: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary
    },
    tags_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1
    },
    tag: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 13),
        color: app_styles(scales).colors.app.blue,
        marginRight: Math.round(scales.widthScale * 8)
    },
    read_more: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 15),
        color: app_styles(scales).colors.app.blue
    },
    gallery_card_container: {
        backgroundColor: app_styles(scales).colors.app.white,
        marginRight: Math.round(scales.widthScale * 3),
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },
    row_container: {
        paddingVertical: Math.round(scales.heightScale * 3),
        paddingHorizontal: Math.round(scales.widthScale * 5)
    },
    thumbnail_image: {
        width: Math.round(scales.widthScale * 320),
        height: (Math.round(scales.widthScale * 320) * 10) / 16,
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'contain',
    },
    full_image: {
        resizeMode: 'contain',
        height: (screen_width * 1.43) - 10,
        width: screen_width - 10,
    },
});


//---EXPORT---//
export default styles;