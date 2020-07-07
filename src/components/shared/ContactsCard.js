import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../../styles/components/shared/contacts-card';
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
import {createIconSetFromIcoMoon} from "react-native-vector-icons";
import { app_styles } from '../../styles/app_styles.js';

import icoMoonConfig from "../../../selection.json";
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');

const ContactsCard = () => {
  const {state: {scales} } = useContext(AppSettingsContext);

  return (
      <View style={styles(scales).container}>
        <View style={styles(scales).frame}>
          <Image
              style={styles(scales).image_frame}
              source={require('../../../assets/images/house.jpg')}
              resizeMode="cover" />
        </View>
        <View style={[styles(scales).content, {backgroundColor: '#f5f5f5'}]}>
          <View style={styles(scales).header}>
            <Text style={styles(scales).title}>
              М.Луцьк, вул. Л.Українки 20
            </Text>
          </View>
          <View style={styles(scales).information_container}>
            <View style={styles(scales).blocks}>
              <IcoMoonIcon
                  name="phone-alt"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
              />
              <Text style={styles(scales).value_phone}>+38 099 176 7005</Text>
            </View>
            <View style={[styles(scales).blocks, {justifyContent: 'flex-end'}]}>
              <IcoMoonIcon
                  name="wall-clock"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
              />
              <Text style={styles(scales).value_phone}>24/7</Text>
            </View>
          </View>
          <View style={styles(scales).bottom}>
            <Text style={styles(scales).label}>Соц. мережі</Text>

            <View style={styles(scales).socials_list}>
              <IcoMoonIcon
                  name="facebook"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
                  style={styles(scales).social_icon}
              />
              <IcoMoonIcon
                  name="instagram"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
                  style={styles(scales).social_icon}
              />
              <IcoMoonIcon
                  name="youtube1"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
                  style={styles(scales).social_icon}
              />
            </View>
          </View>
          <View style={styles(scales).maps}>
            <Text style={styles(scales).maps_label}>Показати на карті</Text>
          </View>
        </View>
      </View>
  )
}

export default ContactsCard;