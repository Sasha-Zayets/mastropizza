//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";


//----STYLES----//
const styles = (scales) => StyleSheet.create({
  title: {
    fontFamily: app_styles(scales).fonts.weight.bold,
    fontSize: Math.round(scales.fontScale * 17),
    textAlign: 'center',
  },
  content: {
    fontFamily: app_styles(scales).fonts.weight.regular,
    fontSize: Math.round(scales.fontScale * 14),
    textAlign: 'justify',
  },
 content_bold: {
    fontFamily: app_styles(scales).fonts.weight.bold,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '49%',
    height: 40,
    backgroundColor: app_styles(scales).colors.app.orange,
    borderWidth: Math.round(scales.heightScale * 1),
    borderColor: app_styles(scales).colors.app.orange,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.round(scales.widthScale * 6),
  },
  button_light: {
    backgroundColor: app_styles(scales).colors.app.dark_orange,
    borderWidth: Math.round(scales.heightScale * 1),
    borderColor: app_styles(scales).colors.app.dark_orange,
  },
  text: {
    color: app_styles(scales).colors.app.white,
  },
  full_width: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: app_styles(scales).colors.app.light_black,
    height: 40,
    borderRadius: Math.round(scales.widthScale * 6),
  }
});


//----EXPORT----//
export default styles