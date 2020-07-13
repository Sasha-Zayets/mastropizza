import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../../styles/components/shared/contacts-card';
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
import {createIconSetFromIcoMoon} from "react-native-vector-icons";
import { app_styles } from '../../styles/app_styles.js';

import icoMoonConfig from "../../../selection.json";
import {notEmptyString} from "../../helpers/helpers";
const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');

const ContactsCard = ({ restaurant }) => {
  const {state: {scales} } = useContext(AppSettingsContext);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    socialList();
  }, []);

  const socialList = () => {
    const key = ['facebook', 'instagram', 'youtube', 'vk'];
    const totalSocials = [];

    key.forEach(item => {
      if(notEmptyString(restaurant[item])) {
        totalSocials.push({[item]: restaurant[item]});
      }
    });

    setSocials(totalSocials);
  }

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
              { restaurant.address }
            </Text>
          </View>
          <View style={styles(scales).information_container}>
            <View style={styles(scales).blocks}>
              <IcoMoonIcon
                  name="phone-alt"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
              />
              <Text style={styles(scales).value_phone}>
                { restaurant.phone }
              </Text>
            </View>
            <View style={[styles(scales).blocks, {justifyContent: 'flex-end'}]}>
              <IcoMoonIcon
                  name="wall-clock"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
              />
              <Text style={styles(scales).value_phone}>
                { restaurant.schedule }
              </Text>
            </View>
          </View>
          <View style={styles(scales).bottom}>
            <Text style={styles(scales).label}>Соц. мережі</Text>

            <View style={styles(scales).socials_list}>
              {
                socials.map((item, index) => {
                  return (
                    <IcoMoonIcon
                        key={index}
                        name="facebook"
                        color={app_styles(scales).colors.app.orange}
                        size={Math.round(scales.widthScale * 18)}
                        style={styles(scales).social_icon}
                    />
                  )
                })
              }

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