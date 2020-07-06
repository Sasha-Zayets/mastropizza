//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, StyleSheet } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";


//----COMPONENT----//
const Block = ({ children }) => {   
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);


    //Template
    return (
        <View style={styles(scales).container}>
            { children }
        </View>
    );
}


//----STYLES----//
const styles = (scales) => StyleSheet.create({
    container: {   
        paddingHorizontal: Math.round(scales.widthScale * 16),
        width: '100%',        
    }
});


//----EXPORT----//
export default Block;


