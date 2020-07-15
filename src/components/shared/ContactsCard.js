import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';

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
        totalSocials.push({
          name: restaurant[item],
          nameIcon: item
        });
      }
    });

    setSocials(totalSocials);
  }

  const makeCall = (value) => {
    let cleanedPhoneNumber = value.replace(/\D||\s/g, "");

    if (cleanedPhoneNumber.indexOf('38') === 0) {
      cleanedPhoneNumber = cleanedPhoneNumber.substring(2);
    }
    const link = Platform.OS === 'ios' ? `tel://+38${cleanedPhoneNumber}` : `tel:+38${cleanedPhoneNumber}`;
    Linking.openURL(link);
  }

  const handleLink = async (link, type) => {
    if (type === 'instagram') {
      let urlParts = link.split('/');
      let username = urlParts[urlParts.length - 1];
      let url = `instagram://user?username=${username}`;
      try {
        await Linking.openURL(url)
      } catch (err) {
        await Linking.openURL(link.trim())
      }
    } else if (type === 'youtube') {
      let urlParts = link.split('/');
      let chanelName = urlParts[urlParts.length - 1];
      let url = `youtube://chanel=${chanelName}`;
      try {
        await Linking.openURL(url)
      } catch (err) {
        await Linking.openURL(link.trim())
      }
    } else {
      await Linking.openURL(link.trim())
    }
  }

  const openMap = () => {
    let link = restaurant.gmap;
    return notEmptyString(link) ? Linking.openURL(link.trim()) : false;
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
            <TouchableOpacity
              onPress={() => makeCall(restaurant.phone)}
              activeOpacity={.7}
              style={styles(scales).information_container}>
              <View style={styles(scales).blocks}>
                <IcoMoonIcon
                  name="phone-alt"
                  color={app_styles(scales).colors.app.orange}
                  size={Math.round(scales.widthScale * 18)}
                />
                <Text style={styles(scales).value_phone} numberOfLines={1}>
                  { restaurant.phone }
                </Text>
              </View>
            </TouchableOpacity>
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
          {
            socials.length
              ? <View style={styles(scales).bottom}>
                <Text style={styles(scales).label}>Соц. мережі</Text>
                <View style={styles(scales).socials_list}>
                  {
                    socials.map((item, index) => {
                      return (
                        <TouchableOpacity onPress={() => handleLink(item.name, item.nameIcon)}>
                          <IcoMoonIcon
                            key={index}
                            name={item.nameIcon}
                            color={app_styles(scales).colors.app.orange}
                            size={Math.round(scales.widthScale * 18)}
                            style={styles(scales).social_icon}
                          />
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>
              : null
          }
          <View style={styles(scales).maps}>
            {
              restaurant.gmap
                ? <TouchableOpacity onPress={openMap}>
                  <Text style={styles(scales).maps_label}>Показати на карті</Text>
                </TouchableOpacity>
                : null
            }
          </View>
        </View>
      </View>
  )
}

export default ContactsCard;
