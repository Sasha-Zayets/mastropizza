//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, ActivityIndicator, StyleSheet } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import { app_styles } from "../../styles/app_styles";



//----COMPONENT----//
const FlatListFooter = () => {
    const { state: { scales } } = useContext(AppSettingsContext);

    
    return (
        <View style={styles(scales).container}>
            <View style={styles(scales).inner_container}>
                <ActivityIndicator animating size="large" color={app_styles(scales).colors.app.blue}/>
            </View>
        </View>
    );
}



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0
    },
    inner_container: {
        width: Math.round(scales.widthScale * 55),
        height: Math.round(scales.widthScale * 55),
        borderRadius: Math.round(scales.widthScale * 55),
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    }

});


//----EXPORT----//
export default FlatListFooter;