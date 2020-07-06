//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    note: {
        color: app_styles(scales).colors.text.white,
        fontSize: app_styles(scales).fonts.size.base * .9,
        fontFamily: app_styles(scales).fonts.weight.regular
    }
});


//---EXPORT---//
export default styles;