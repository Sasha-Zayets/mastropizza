//----IMPORTS----//
//React
import React, { useContext, useState, useEffect } from 'react';
//React native
import { Text, View, TextInput, TouchableOpacity, Platform, Modal } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../../context/AppSettingsContext";
//Date Time Piker
import DateTimePicker from '@react-native-community/datetimepicker';
//Expo
import { useColorScheme } from 'react-native-appearance';
//Localization
import translator from "../../translator/translator";
//Moment
import moment from "moment";
//Components
import { Spacer } from '../shared';
//Styles
import styles from "../../styles/components/inputs/date-time-picker-input";
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const DateTimePikerInput = ({ placeholder, error, clearError, callback, name }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const [state, setState] = useState({
        showDatePiker: false,
        showTimePiker: false,
        date: null,
        time: null,
        notFormatedDate: null
    });
    const [defaultDate, setDefaultDate] = useState(null);
    const [value, setValue] = useState(null);



    //Hooks and Methods
    useEffect(() => {
        if(!defaultDate){
            let now = new Date();
            let defaultDate = new Date(now);
                defaultDate.setMinutes(now.getMinutes() + 50);
            setDefaultDate(defaultDate)    
        }
        if (state.date && state.time) {
            let inputValue = state.date + " " + state.time;
            setValue(inputValue);
            moment.locale("uk");           
            let unixTime = (moment(inputValue, "DD.MM.YYYY HH:mm").valueOf() / 1000);
            callback(name, unixTime)
            if (error) {
                clearError(name)
            }
        }        
    }, [state]);



    const handleSelectIos = (event, value) => {
        if (event.type === 'dismissed') {
            setState({ ...state, showDatePiker: false, showTimePiker: false });
            return;
        };
        let formatedDate = formatDatePickerValue(value);
        setState({ ...state, date: formatedDate.date, time: formatedDate.time, showDatePiker: true, notFormatedDate: value });
    }


    const handleSelectDate = (event, value) => {
        if (event.type === 'dismissed') {
            setState({ ...state, showDatePiker: false, showTimePiker: false });
            return;
        };
        let formatedDate = formatDatePickerValue(value);
        setState({ ...state, date: formatedDate.date, showDatePiker: false, showTimePiker: true });
    }


    const handleSelectTime = (event, value) => {
        if (event.type === 'dismissed') {
            setState({ ...state, showDatePiker: false, showTimePiker: false });
            return;
        };        
        let formatedDate = formatDatePickerValue(value);
        setState({ ...state, time: formatedDate.time, showTimePiker: false });
    }


    const formatDatePickerValue = (date) => {
        moment.locale("uk");
        let formatedDate = moment(date).format("DD.MM.YYYY");
        let formatedTime = moment(date).format("HH:mm")
        return { date: formatedDate, time: formatedTime }
    }


    const colorSchemes = {
        light: {
            background: app_styles(scales).colors.app.white,
            text: app_styles(scales).colors.text.primary,
            free_space_background: "rgba(0, 0, 0, 0.35)"
        },
        dark: {
            background: app_styles(scales).colors.text.primary,
            text: app_styles(scales).colors.app.white,
            free_space_background: "rgba(255, 255, 255, 0.55)"
        },
    };
    const colorScheme = useColorScheme();
    const colors = colorSchemes[colorScheme] || colorSchemes.light;

    

    //Template
    return (
        <View style={styles(scales).main_container}>
            <TouchableOpacity style={styles(scales).input_container} onPress={() => setState({ ...state, showDatePiker: true })} activeOpacity={.7}>
                <View pointerEvents="none" >
                    <TextInput
                        style={styles(scales).input}
                        placeholderTextColor={app_styles(scales).colors.text.light_grey}
                        placeholderStyle={styles(scales).placeholder_style}
                        placeholder={placeholder}
                        editable={false}
                        value={value}
                    />
                </View>
            </TouchableOpacity>
            {
                error ?
                    (
                        <View>
                            <Spacer spaceHeight={5} />
                            <View>
                                <Text style={styles(scales).error_text}>{error}</Text>
                            </View>
                        </View>
                    )
                    : null
            }
            {
                Platform.OS === 'android'
                    ? (
                        <>
                            {
                                state.showDatePiker
                                    ? <DateTimePicker value={defaultDate}
                                        mode="date"
                                        minimumDate={defaultDate}
                                        is24Hour={true}
                                        display="default"
                                        onChange={handleSelectDate} />
                                    : null
                            }
                            {
                                state.showTimePiker
                                    ? <DateTimePicker value={defaultDate}
                                        mode="time"
                                        minimumDate={defaultDate}
                                        is24Hour={true}
                                        display="default"
                                        onChange={handleSelectTime} />
                                    : null
                            }
                        </>
                    )
                    : (
                        state.showDatePiker
                            ? (
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={state.showDatePiker}
                                >
                                    <View style={styles(scales).modal_content_container}>
                                        <TouchableOpacity style={[styles(scales).top_container, { backgroundColor: colors.free_space_background }]} onPress={() => setState({ ...state, showDatePiker: false })}>
                                        </TouchableOpacity>
                                        <View style={[styles(scales).picker_container, { backgroundColor: colors.background }]}>
                                            <View style={[styles(scales).header, { borderBottomColor: colors.text }]}>
                                                <TouchableOpacity onPress={() => setState({ ...state, showDatePiker: false })}>
                                                    <Text style={[styles(scales).close_piker, { color: colors.text }]}>{translator.translate(language, "Готово")}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Spacer spaceHeight={10} />
                                            <View style={{ flexGrow: 1, backgroundColor: colors.background }}>
                                                <DateTimePicker 
                                                    value={state.notFormatedDate || defaultDate}
                                                    mode="datetime"
                                                    minimumDate={defaultDate}
                                                    minuteInterval={5}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={handleSelectIos}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            )
                            : null
                    )
            }
        </View>
    )
}


//----EXPORT----//
export default DateTimePikerInput;
