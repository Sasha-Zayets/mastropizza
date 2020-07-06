//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";


//----STYLES----//
const styles = (scales) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll_container: {
    paddingHorizontal: Math.round(scales.widthScale * 16)
  },
  slider_item: {
    width: '100%',
    height: 60,
  }
});


//----EXPORT----//
export default styles