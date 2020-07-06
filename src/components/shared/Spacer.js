//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";




//----COMPONENT----//
const Spacer = ({ spaceHeight }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);
    
    //Template
    return <View style={{ paddingTop: Math.round(scales.heightScale * spaceHeight), flexShrink: 0 }}></View>
}


//----EXPORT----//
export default Spacer