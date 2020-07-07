//----IMPORTS----//
//React native
import { StyleSheet } from 'react-native';
import { app_styles } from "../../app_styles";

//----STYLES----//
const styles = (scales) => StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: Math.round(scales.widthScale * 15),
  },
  frame: {
    height: Math.round(scales.widthScale * 160),
    width: '100%',
  },
  image_frame: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: Math.round(scales.widthScale * 10),
    backgroundColor: app_styles(scales).colors.app.light_grey,
  },
  header: {
    marginBottom: Math.round(scales.widthScale * 15),
  },
  title: {
    fontSize: Math.round(scales.fontScale * 16),
    fontFamily: app_styles(scales).fonts.weight.bold,
    color: app_styles(scales).colors.app.black,
  },
  information_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Math.round(scales.widthScale * 20),
  },
  blocks: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  bottom: {
    paddingTop: Math.round(scales.widthScale * 10),
    paddingBottom: Math.round(scales.widthScale * 10),
    borderTopWidth: 1,
    borderTopColor: app_styles(scales).colors.app.light_black,
  },
  value_phone: {
    color: app_styles(scales).colors.app.black,
    marginLeft: Math.round(scales.widthScale * 8),
  },
  socials_list: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    width: '100%',
    marginBottom: Math.round(scales.widthScale * 10),
    fontSize: Math.round(scales.fontScale * 14),
    fontFamily: app_styles(scales).fonts.weight.bold,
  },
  social_icon: {
    marginRight: Math.round(scales.widthScale * 10)
  },
  maps: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  maps_label: {
    fontSize: Math.round(scales.fontScale * 14),
    fontFamily: app_styles(scales).fonts.weight.bold,
    color: app_styles(scales).colors.app.orange,
  },
  contacts_card: {
    marginBottom: Math.round(scales.widthScale * 15),
  }
});


//----EXPORT----//
export default styles