//----IMPORTS----//
//React native
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { app_styles } from "../../app_styles";

const screen_width = Dimensions.get('screen').width;


//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    container: {
        paddingVertical: Math.round(scales.heightScale * 3)
    },
    inner_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    product_thumbnail_container: {
        padding: Math.round(scales.widthScale * 5),
        backgroundColor: app_styles(scales).colors.app.white,
        borderRadius: Math.round(scales.widthScale * 8),
        marginRight: Math.round(scales.widthScale * 3),
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },    
    product_thumbnail: {
        borderRadius: Math.round(scales.widthScale * 8),
        height: Math.round(scales.widthScale * 120),
        width: Math.round(scales.widthScale * 120),
        backgroundColor: app_styles(scales).colors.app.white,
        resizeMode: 'contain',
    },
    product_image: {
        resizeMode: 'contain',
        height: (screen_width * 1.42) - 10,
        width: screen_width - 10,
        top: Math.round(scales.heightScale * -40)
    },
    img_container_constructor: {
        width: Math.round(scales.widthScale * 120),
        height: Math.round(scales.widthScale * 120),
        marginRight: Math.round(scales.widthScale * 3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    constr_descr_container: {
        flex: 1,
        height: '100%',
        paddingVertical: Math.round(scales.heightScale * 12),
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    img_constructor: {
        resizeMode: 'contain',
        width: Math.round(scales.widthScale * 90),
        height: Math.round(scales.widthScale * 90),
    },
    banner: {
        height: Math.round(scales.heightScale * 90),
        width: (screen_width - Math.round(scales.widthScale * 32)),
        borderRadius: Math.round(scales.widthScale * 8),
        resizeMode: 'cover',
    },
    banner_wrap: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: Math.round(scales.widthScale * 8),
        paddingHorizontal: Math.round(scales.widthScale * 10),
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 3,
                shadowOpacity: 0.3
            },
            android: {
                elevation: 3
            }
        }),
    },
    product_description_container: {
        flex: 1,
        justifyContent: 'flex-start',
        height: '100%',
    },
    product_title: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: app_styles(scales).fonts.size.base,
        color: app_styles(scales).colors.text.primary,
    },
    product_description: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.grey,
        fontSize: Math.round(scales.fontScale * 12),        
    },
    product_price: {
        fontFamily: app_styles(scales).fonts.weight.bold,
        color: app_styles(scales).colors.app.black
    },
    product_weight: {
        fontFamily: app_styles(scales).fonts.weight.regular,
        fontSize: Math.round(scales.fontScale * 13),
        color: "#444444"
    },
    cart_button: {
        width: Math.round(scales.widthScale * 40),
        height: Math.round(scales.heightScale * 30),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    manipulators_block: {
        width: Math.round(scales.widthScale * 62),
        height: Math.round(scales.heightScale * 30),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    manipulator_add_button: {
        width: Math.round(scales.widthScale * 18),
        height: Math.round(scales.widthScale * 18),
        borderRadius: Math.round(scales.widthScale * 18),
        backgroundColor: app_styles(scales).colors.app.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Math.round(scales.widthScale),
        borderColor: app_styles(scales).colors.app.orange
    },
    manipulator_subtract_button: {
        width: Math.round(scales.widthScale * 18),
        height: Math.round(scales.widthScale * 18),
        borderRadius: Math.round(scales.widthScale * 18),
        backgroundColor: app_styles(scales).colors.app.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Math.round(scales.widthScale),
        borderColor: app_styles(scales).colors.app.black,
    },    
    button_container: {
        height: Math.round(scales.heightScale * 30),
        paddingHorizontal: Math.round(scales.widthScale * 2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    product_quantity_container: {
        width: Math.round(scales.widthScale * 16),
        height: Math.round(scales.heightScale * 30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    product_quantity: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 14),
        color: app_styles(scales).colors.text.primary
    },
    li_prefix: {
        width: Math.round(scales.widthScale * 8),
        height: Math.round(scales.widthScale * 8),
        borderRadius: Math.round(scales.widthScale * 8),
        backgroundColor: app_styles(scales).colors.text.primary,
        position: 'absolute',
        left: Math.round(scales.widthScale * -14),
        top: Math.round(scales.widthScale * 7)
    },
    badge_container: {
        paddingHorizontal: Math.round(scales.widthScale * 10),
        height: Math.round(scales.widthScale * 20),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: Math.round(scales.widthScale * 6),
        right: Math.round(scales.widthScale * 8),
        top: Math.round(scales.widthScale * 5)
    },
    badge_name: {
        fontFamily: app_styles(scales).fonts.weight.medium,
        fontSize: Math.round(scales.fontScale * 10),
        color: app_styles(scales).colors.text.white
    }
});


//---EXPORT---//
export default styles;