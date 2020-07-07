//----IMPORTS----//
//React native
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { app_styles } from "../app_styles";


const screen_width = Dimensions.get('window').width;



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    container: {
        padding: Math.round(scales.widthScale * 15)
    }
});


//----EXPORT----//
export default styles;