//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";


//----COMPONENT----//
const VerticalDivider = ({ color, rMargin }) => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);


    //Template
    return (
        <View style={{
            flex: 1,
            width: Math.round(scales.widthScale * 1),
            marginRight: Math.round(scales.widthScale * rMargin) || Math.round(scales.widthScale * 7),
            backgroundColor: color
        }}
        >
        </View>
    );

}


//----EXPORT----//
export default VerticalDivider