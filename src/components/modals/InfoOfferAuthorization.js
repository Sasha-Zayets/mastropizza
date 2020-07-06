//----IMPORTS----//
//React
import React, {useContext} from 'react';
//React native
import {View, Text, Modal, TouchableOpacity} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";

//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Components
import {Spacer} from "../shared";
//Translator
import translator from "../../translator/translator";
//Styles
import styles from "../../styles/components/modals/delivery-details-modal";
import stylesInfo from "../../styles/components/modals/info-offer-authorization";
import {app_styles} from "../../styles/app_styles";


//----COMPONENT----//
const InfoOfferAuthorization = ({isOpened, closeCallback, onMiss, redirectNavigation}) => {
  //Data and State
  const {state: {scales, language}} = useContext(AppSettingsContext);

  //Template
  return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={isOpened}
      >
        <View style={styles(scales).modal_content_container}>
          <View style={styles(scales).modal_card}>
            {/* Card head */}
            <View style={styles(scales).card_header}>
              <Text
                  style={styles(scales).card_title}>{translator.translate(language, "Повідомлення")}</Text>
              <TouchableOpacity onPress={closeCallback} style={styles(scales).close_modal_button}>
                <IcoMoonIcon name="cancel" color={app_styles(scales).colors.text.white}
                             size={Math.round(scales.widthScale * 14)} style={styles(scales).cancel_icon}/>
              </TouchableOpacity>
            </View>
            {/* Card body */}
            <View style={styles(scales).card_body}>
              <Text style={stylesInfo(scales).title}>
                {translator.translate(language, 'Ви не зареєстровані?')}
              </Text>
              <Spacer spaceHeight={10}/>
              <Text style={stylesInfo(scales).content}>
                {translator.translate(language, 'Для того, щоб зберегти ваше замовлення, а також використовувати весь функціонал додатку - потрібно')}
                <Text style={stylesInfo(scales).content_bold}>
                  {translator.translate(language, ' зареєструватись ')}
                </Text>
                {translator.translate(language, 'або ')}
                <Text style={stylesInfo(scales).content_bold}>
                  {translator.translate(language, 'увійти ')}
                </Text>
                {translator.translate(language, 'в систему')}
              </Text>
              <Spacer spaceHeight={15} />
              <View style={stylesInfo(scales).buttons}>
                <TouchableOpacity
                    onPress={() => redirectNavigation('LogIn')}
                    style={[stylesInfo(scales).button, stylesInfo(scales).button_light]}>
                  <Text style={stylesInfo(scales).text}>
                    {translator.translate(language, 'Увійти')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => redirectNavigation('Registration')}
                    style={stylesInfo(scales).button}>
                  <Text style={stylesInfo(scales).text}>
                    {translator.translate(language, 'Зареєструватися')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Spacer spaceHeight={20}/>
              <TouchableOpacity
                  onPress={onMiss}
                  style={stylesInfo(scales).full_width}>
                <Text style={stylesInfo(scales).text}>
                  {translator.translate(language, 'Пропустити')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}


//----EXPORT----//
export default InfoOfferAuthorization;