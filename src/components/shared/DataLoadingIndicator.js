//----IMPORTS----//
//React
import React, { useContext }  from 'react';
//React native
import { View, ActivityIndicator, StyleSheet } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Styles
import { app_styles } from '../../styles/app_styles';



//----COMPONENT----//
const DataLoadingIndicator = () => {
    //Data and State
    const { state: { scales } } = useContext(AppSettingsContext);


    //Template
    return (
        <View style={styles(scales).container}>
            <ActivityIndicator animating size="large" color={app_styles(scales).colors.app.blue}/>
        </View>
    );
}



//----STYLES----//
const styles = (scales) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


//----EXPORT----//
export default DataLoadingIndicator;