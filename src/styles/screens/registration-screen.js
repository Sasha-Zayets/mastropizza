//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../app_styles";



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: app_styles(scales).colors.app.white,
    },    
    logo_container: {
        width: '100%',
        alignItems: 'center'
    },
    btn_group: {
        width: '100%'
    },
    img: {
       width: Math.round(scales.widthScale * 130),
       height: Math.round(scales.widthScale * 78),
       resizeMode: 'contain' 
    }
});


//----EXPORT----//
export default styles;