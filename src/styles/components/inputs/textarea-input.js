//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({      
    main_container: {
        justifyContent: 'center',
        alignItems: "flex-start",
        alignSelf: 'stretch',
    },
    input_container: {
        alignSelf: 'stretch'
    },
    input: {
        textAlignVertical: "top",
        padding: Math.round(scales.heightScale * 10),
        fontFamily: app_styles(scales).fonts.weight.regular,
        borderRadius: Math.round(scales.widthScale * 6)
    },
    placeholder_style: {        
        fontFamily: app_styles(scales).fonts.weight.regular,
    },
    error_text: {
        fontSize: Math.round(scales.fontScale * 13),
        fontFamily: app_styles(scales).fonts.weight.regular,
        color: app_styles(scales).colors.text.red,
        textAlign: 'left'
    }
});


//---EXPORT---//
export default styles;