//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import {app_styles} from "../app_styles";


//---STYLES---/
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },
    container: {
        paddingBottom: Math.round(scales.heightScale * 20),
        flexGrow: 1
    }
});


//---EXPORT---/
export default styles;