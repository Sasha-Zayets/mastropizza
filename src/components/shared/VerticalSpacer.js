//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";


//----COMPONENT----//
const VerticalSpacer = ({ spaceWidth }) => {
     //Data and State
     const { state: { scales } } = useContext(AppSettingsContext);

    //Template
    return <View style={{ paddingLeft: Math.round(scales.widthScale * spaceWidth) }}></View>
}


//----EXPORT----//
export default VerticalSpacer