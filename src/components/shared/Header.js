//----IMPORTS---//
//React
import React, {useState, useEffect, useContext} from 'react';
//React native
import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Context
import {Context as MenuContext} from "../../context/MenuContext";
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
//Components
import DeliveryDetailsModal from "../modals/DeliveryDetailsModal";
//Styles
import styles from '../../styles/components/shared/header';
import {app_styles} from "../../styles/app_styles";
import {Spacer, VerticalSpacer} from "./index";


//----COMPONENT----//
const Header = ({navigation, backAllowed, title, exclamation, nocart, exclamationForCart, noIcons, settings, displayBell, unreadNotifications, isLogged, noBell}) => {

    //Data and State
    const {state: {itemsInCart}} = useContext(MenuContext);
    const {state: {scales}} = useContext(AppSettingsContext);
    const [scale, setScale] = useState(new Animated.Value(1));
    const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);


    //Hooks and Methods
    useEffect(() => {
        if (itemsInCart) {
            startEffect()
        }
    }, [itemsInCart]);


    //Methods and Hooks
    const startAnimation = () => {
        Animated.spring(
            scale,
            {
                toValue: 1.15,
                friction: 2
            }
        ).start();
    }

    const endAnimation = () => {
        Animated.spring(
            scale,
            {
                toValue: 1,
                friction: 2
            }
        ).start();
    }

    const startEffect = () => {
        startAnimation();
        setTimeout(() => {
            endAnimation();
        }, 300);
    }


    const defineTitleFontSize = () => {
        return title.length > 18 ? Math.round(scales.fontScale * 14) : Math.round(scales.fontScale * 16)
    }


    //Template
    return (
        <>
            <View style={styles(scales).container}>
                {
                    backAllowed
                        ? (
                            <>
                                <TouchableOpacity style={styles(scales).header_button_left}
                                                  onPress={() => navigation.goBack()}
                                                  activeOpacity={0.6}
                                >
                                    <IcoMoonIcon name="left-arrow" color={app_styles(scales).colors.app.white}
                                                 size={Math.round(scales.widthScale * 24)}
                                    />
                                </TouchableOpacity>
                                {
                                    displayBell && isLogged
                                        ? (
                                            <TouchableOpacity style={styles(scales).bell_container}
                                                              onPress={() => navigation.navigate('Notifications')}
                                                              activeOpacity={0.6}>
                                                <IcoMoonIcon name="bell1" color={app_styles(scales).colors.app.white}
                                                             size={Math.round(scales.widthScale * 25)}/>
                                                {
                                                    unreadNotifications
                                                        ? (
                                                            <View style={styles(scales).nots_num_cont}>
                                                                <Text style={styles(scales).nots_number}>
                                                                    {unreadNotifications}
                                                                </Text>
                                                            </View>
                                                        )
                                                        : null
                                                }
                                            </TouchableOpacity>
                                        )
                                        : (
                                            noBell
                                                ? <VerticalSpacer spaceWidth={47}/>
                                                : null
                                        )
                                }
                            </>
                        )
                        : (
                            <>
                                <TouchableOpacity style={styles(scales).header_button_left_menu}
                                                  onPress={() => navigation.navigate('AppMenu')} activeOpacity={0.6}>
                                    <View style={styles(scales).menu_button}>
                                        <View style={styles(scales).long_line}></View>
                                        <View style={styles(scales).long_line}></View>
                                        <View style={styles(scales).long_line}></View>
                                    </View>
                                </TouchableOpacity>
                                {
                                    displayBell && isLogged
                                        ? (
                                            <TouchableOpacity style={styles(scales).bell_container}
                                                              onPress={() => navigation.navigate('Notifications')}
                                                              activeOpacity={0.6}>
                                                <IcoMoonIcon name="bell1" color={app_styles(scales).colors.app.white}
                                                             size={Math.round(scales.widthScale * 26)}/>
                                                {
                                                    unreadNotifications
                                                        ? (
                                                            <View style={styles(scales).nots_num_cont}>
                                                                <Text style={styles(scales).nots_number}>
                                                                    {unreadNotifications}
                                                                </Text>
                                                            </View>
                                                        )
                                                        : null
                                                }
                                            </TouchableOpacity>
                                        )
                                        : null
                                }
                            </>
                        )
                }
                <View style={[
                    styles(scales).logo_container,
                    {
                        marginRight: noIcons ? Math.round(scales.widthScale * 47) : 0,
                        paddingLeft: exclamation && displayBell ? (isLogged ? 0 : Math.round(scales.widthScale * 47)) : 0,
                    }
                ]}>
                    {
                        title
                            ? (
                                <View style={{flex: 1}}>
                                    <Text style={[styles(scales).title, {fontSize: defineTitleFontSize()}]}>{title}</Text>
                                </View>
                            )
                            : (
                                <View>
                                    <IcoMoonIcon
                                        size={Math.round(scales.widthScale * 40)}
                                        color={app_styles(scales).colors.app.black}
                                        name={"logo"}
                                    />
                                </View>
                            )
                    }
                </View>
                {
                    !noIcons
                        ? (
                            <View style={styles(scales).cart_group_container}>
                                {
                                    exclamation
                                        ? (
                                            <TouchableOpacity style={styles(scales).exclamation_container}
                                                              onPress={() => setShowDeliveryDetails(true)} activeOpacity={0.6}>
                                                <IcoMoonIcon
                                                    size={Math.round(scales.widthScale * 25)}
                                                    color={app_styles(scales).colors.app.white}
                                                    name={"delivery-truck"}
                                                />
                                            </TouchableOpacity>
                                        )
                                        : null
                                }
                                {
                                    !nocart
                                        ? (
                                            exclamationForCart
                                                ? (
                                                    <TouchableOpacity
                                                        style={{paddingRight: Math.round(scales.widthScale * 16)}}
                                                        onPress={() => setShowDeliveryDetails(true)} activeOpacity={0.6}>
                                                        <IcoMoonIcon
                                                            size={Math.round(scales.widthScale * 25)}
                                                            color={app_styles(scales).colors.app.white}
                                                            name={"delivery-truck"}
                                                        />
                                                    </TouchableOpacity>
                                                )
                                                : (
                                                    <TouchableOpacity
                                                        style={[styles(scales).cart_container, {justifyContent: 'center'}]}
                                                        onPress={() => navigation.navigate('Cart')} activeOpacity={0.6}>
                                                        <Animated.View style={{transform: [{scale: scale}]}}>
                                                            <IcoMoonIcon name="shopping-bag"
                                                                         color={app_styles(scales).colors.app.white}
                                                                         size={Math.round(scales.widthScale * 26)}/>
                                                            {
                                                                itemsInCart
                                                                    ? (
                                                                        <View style={styles(scales).cart_items_num_cont}>
                                                                            <Text style={styles(scales).cart_items_number}>
                                                                                {itemsInCart}
                                                                            </Text>
                                                                        </View>
                                                                    )
                                                                    : null
                                                            }
                                                        </Animated.View>
                                                    </TouchableOpacity>
                                                )

                                        )
                                        : null
                                }
                                {
                                    settings
                                        ? (
                                            <TouchableOpacity style={styles(scales).settings_container}
                                                              onPress={() => navigation.navigate('Settings')}
                                                              activeOpacity={0.6}>
                                                <IcoMoonIcon name="settings" color={app_styles(scales).app_black}
                                                             size={Math.round(scales.widthScale * 22)}/>
                                            </TouchableOpacity>
                                        )
                                        : null
                                }
                            </View>
                        )
                        : null
                }

            </View>
            {/* Modals */}
            <DeliveryDetailsModal
                isOpened={showDeliveryDetails}
                closeCallback={() => setShowDeliveryDetails(false)}
            />
        </>
    );
}


//----EXPORT----//
export default Header;