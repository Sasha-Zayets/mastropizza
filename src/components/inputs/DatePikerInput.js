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
//Moment
import moment from "moment";
//Localization
import translator from "../../translator/translator";
//Components
import { Spacer } from '../shared';
//Styles
import styles from "../../styles/components/inputs/date-picker-input";
import { app_styles } from '../../styles/app_styles';




//----COMPONENT----//
const DatePikerInput = ({ placeholder, error, clearError, callback, name, currentValue }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const [state, setState] = useState({
        showDatePiker: false,
        date: null,
        notFormatedDate: null
    });
    const [defaultDate, setDefaultDate] = useState(new Date());
    const [value, setValue] = useState(null);



    //Hooks and Methods
    useEffect(() => {
        if (state.date) {
            let inputValue = state.date;
            setValue(inputValue);
            moment.locale("uk");
            let unixTime = (moment(inputValue, "DD.MM.YYYY").valueOf()) / 1000;
            callback(name, unixTime)
            if (error) {
                clearError(name)
            }
        }
    }, [state]);


    const handleSelectDate = (event, value) => {
        if (event.type === 'dismissed') {
            setState({ ...state, showDatePiker: false });
            return;
        };

        let _date = new Date(value);
            _date.setMinutes( _date.getMinutes() - _date.getTimezoneOffset());
        let formatedDate = formatDatePickerValue(_date);

        setState({ ...state, date: formatedDate, notFormatedDate: value, showDatePiker: Platform.OS === 'ios' ? true : false });
    }


    const formatDatePickerValue = (date) => {
        moment.locale("uk");
        let formatedDate = moment(date).format("DD.MM.YYYY");
        return formatedDate;
    }


    const reformatDate = (date) => {
        if (date && date.includes("-")) {
            return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
        }
        return date;
    }



    const colorSchemes = {
        light: {
            background: app_styles(scales).colors.app.white,
            text: app_styles(scales).colors.text.primary,
            free_space_background: "rgba(0, 0, 0, 0.35)"
        },
        dark: {
            background: app_styles(scales).colors.text.primary,
            text: app_styles(scales).colors.text.white,
            free_space_background: "rgba(255, 255, 255, 0.55)"
        },
    };
    const colorScheme = useColorScheme();
    const colors = colorSchemes[colorScheme] || colorSchemes.light;


    //Template
    return (
        <>
            <TouchableOpacity onPress={() => setState({ ...state, showDatePiker: true })} activeOpacity={.7}>
                <View pointerEvents="none" style={styles(scales).input_container}>
                    <TextInput
                        style={styles(scales).input}
                        placeholderTextColor={app_styles(scales).colors.text.light_grey}
                        placeholder={placeholder}
                        editable={false}
                        value={value || reformatDate(currentValue)}
                    />
                </View>
            </TouchableOpacity>
            {
                error ?
                    (
                        <>
                            <Spacer spaceHeight={5} />
                            <View>
                                <Text style={styles(scales).error_text}>{error}</Text>
                            </View>
                        </>
                    )
                    : null
            }
            {
                state.showDatePiker
                    ? Platform.OS === 'ios'
                        ? (
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={state.showDatePiker}
                            >
                                <View style={styles(scales).modal_content_container}>
                                    <TouchableOpacity style={[styles(scales).top_container, {backgroundColor: colors.free_space_background}]} onPress={() => setState({ ...state, showDatePiker: false })}>
                                    </TouchableOpacity>
                                    <View style={[styles(scales).picker_container, { backgroundColor: colors.background }]}>
                                        <View style={[styles(scales).header, {borderBottomColor: colors.text}]}>
                                            <TouchableOpacity onPress={() => setState({ ...state, showDatePiker: false })}>
                                                <Text style={[styles(scales).close_piker, { color: colors.text }]}>{translator.translate(language, "Готово")}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Spacer spaceHeight={10} />
                                        <View style={{ flexGrow: 1, backgroundColor: colors.background }}>
                                            <DateTimePicker
                                                value={state.notFormatedDate || defaultDate}
                                                mode="date"
                                                display="calendar"
                                                maximumDate={defaultDate}
                                                is24Hour={true}
                                                onChange={handleSelectDate}
                                                style={{ width: '100%', backgroundColor: colors.background }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        )
                        : <DateTimePicker value={state.notFormatedDate || defaultDate}
                            mode="date"
                            maximumDate={defaultDate}
                            is24Hour={true}
                            display="default"
                            onChange={handleSelectDate}
                        />
                    : null
            }
        </>
    )
}


//----EXPORT----//
export default DatePikerInput;
