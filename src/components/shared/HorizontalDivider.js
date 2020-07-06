//----IMPORTS----//
//React
import React, { useContext } from 'react';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//React native
import { View, StyleSheet } from 'react-native';



//----COMPONENT----//
const HorizontalDivider = ({ height, color, marginVertical }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);

    //Template
    return <View style={styles(scales, height, color, marginVertical).divider}></View>
}



//----STYLES----//
const styles = (scales, height, color, marginVertical) => StyleSheet.create({
    divider: {
        height: Math.round(scales.heightScale * height) || Math.round(scales.heightScale * 2),
        alignSelf: 'stretch',
        backgroundColor: color || '#D8D8D8',
        marginVertical: Math.round(scales.heightScale * marginVertical) || 0
    }
});


//----EXPORT----//
export default HorizontalDivider;