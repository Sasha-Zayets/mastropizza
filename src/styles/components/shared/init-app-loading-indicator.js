//----IMPORTS----//
//React native
import { StyleSheet, Dimensions } from 'react-native';
import { app_styles } from "../../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({
    main_container: {
        backgroundColor: app_styles(scales).colors.app.orange,
        width: 220,
        height: 170,
        justifyContent: 'flex-end',
        resizeMode: 'contain'
    },
    note: {
        color: app_styles(scales).colors.text.white,
        fontSize: app_styles(scales).fonts.size.base * .9,
        fontFamily: app_styles(scales).fonts.weight.regular
    },
    loader_bottom: {

    }
});


//---EXPORT---//
export default styles;