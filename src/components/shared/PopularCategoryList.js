import React, {useContext} from 'react';

import { Animated, View, Text, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import styles from '../../styles/components/shared/popular-category-list';
import {app_styles} from "../../styles/app_styles";
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";

const PopularCategoryList = ({ slides, heightSlide = 100, animValue}) => {
  const {state: {scales}} = useContext(AppSettingsContext);
  const marginRight = 40;
  const widthViewPort = Dimensions.get('window').width - marginRight;

  const items = ['1', '2', '3', '4'];

  const renderItem = ({item}) => {
    return (
        <View style={{
          backgroundColor: 'white',
          borderRadius: Math.round(scales.widthScale * 5),
          marginLeft: Math.round(scales.widthScale * 15),
          marginRight: Math.round(scales.widthScale * 25),
          width: widthViewPort,
          overflow: 'hidden',
          }}>
          <Image
              source={ require('../../../assets/images/banner.jpeg') }
              resizeMode={'contain'}
              style={{
                width: widthViewPort,
                height: '100%',
                borderRadius: Math.round(scales.widthScale * 5),
              }}
          />
        </View>
    )
  }
  return (
      <SafeAreaView style={{height: heightSlide, backgroundColor: 'white'}}>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center'}}>
          <Carousel
              layout={"default"}
              data={items}
              sliderWidth={widthViewPort}
              itemWidth={widthViewPort}
              loop={true}
              renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
  )
}

export default PopularCategoryList;