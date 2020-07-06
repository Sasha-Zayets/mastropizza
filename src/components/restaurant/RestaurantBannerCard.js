//----IMPORTS----//
//React
import React, { useContext, useState } from 'react';
//React native
import { View, Text, Image } from 'react-native';
//Components
import { IntelligentImage, Spacer } from "../shared";
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import styles from "../../styles/components/restaurant/restaurant-banner-card";




//----COMPONENT----//
const RestaurantBannerCard = ({ banner, cardWidth }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);
    

    //Template
    return (
        <View style={[styles(scales).container, { width: cardWidth }]}>
            <View style={styles(scales).img_container}>
                <Image 
                    source={{uri: banner.image}}
                    style={styles(scales).img}
                />                
            </View>
        </View>
    )
}


//----EXPORT----//
export default RestaurantBannerCard