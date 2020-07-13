//----IMPORTS----//
//React
import React, {useEffect, useState, useContext} from 'react';
//React native
import {View, Text, TouchableOpacity, ScrollView, FlatList, Image, Linking, YellowBox} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../context/AppSettingsContext";
//Componetns
import Header from "../components/shared/Header";
import {
    SafeView,
    Block,
    Spacer,
    DataLoadingIndicator,
    VerticalSpacer,
    IntelligentImage,
    HorizontalDivider
} from "../components/shared";
import {ButtonOrder} from "../components/buttons";
import {MenuModal, NetworkErrorModal} from "../components/modals";
import CarouselRestaurant from "../components/restaurant/CarouselRestaurant";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Navigation Events
import {NavigationEvents} from 'react-navigation';
//HTML-render
import HTML from "react-native-render-html";
//Helpers
import {notEmptyString} from "../helpers/helpers";
//Localization
import translator from "../translator/translator";
//Styles
import styles from '../styles/screens/restaurant-screen';
import {app_styles} from '../styles/app_styles';


//----COMPONENT----//
const RestaurantScreen = ({navigation}) => {
    //Data and State
    const {state: {scales, language, emmaPizzaRestaurant, emmaPizzaRestaurantMetaData, settingsNetworkError, screen_width, contacts}, getEmmaPizzaRestaurant, clearSettingsNetworkError} = useContext(AppSettingsContext);
    const [bodyTextStyles, setBodyTextStyles] = useState({});
    const [paragraphStyles, setParagraphStyles] = useState({});
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);


    //Hooks and Methods
    useEffect(() => {
        
        setBodyTextStyles({
            fontFamily: app_styles(scales).fonts.weight.regular,
            fontSize: Math.round(scales.fontScale * 14),
            color: app_styles(scales).colors.text.primary
        });
        setParagraphStyles({
            textAlign: "justify",
            marginBottom: Math.round(scales.heightScale * 15)
        });


    }, [emmaPizzaRestaurant]);


    const getRestaurant = async () => {
        setIsDataLoading(true);
        await getEmmaPizzaRestaurant();
        setIsDataLoading(false);
    }

    const handleFocus = async () => {
        if (!Object.keys(emmaPizzaRestaurant).length || emmaPizzaRestaurantMetaData.language !== language) {
            await getRestaurant();
        }
    }


    const generateGalleryCard = (item) => {
        return (
            <View style={styles(scales).card_container}>
                <IntelligentImage
                    thumbnailStyles={styles(scales).thumbnail_image}
                    thumbnailSource={item.image_preview}
                    fullSizeSource={item.image}
                    fullSizeStyles={styles(scales).full_image}
                />
            </View>
        );
    }


    const hasBanner = () => {
        return !!(emmaPizzaRestaurant && emmaPizzaRestaurant.top_banner && emmaPizzaRestaurant.top_banner.images && emmaPizzaRestaurant.top_banner.images.length)
    }

    const hasMenu = () => {
        return !!(emmaPizzaRestaurant.page_data && emmaPizzaRestaurant.page_data.menu_banner && emmaPizzaRestaurant.page_data.menu_banner.images && emmaPizzaRestaurant.page_data.menu_banner.images.length)
    }

    const hasGallery = () => {
        return !!(emmaPizzaRestaurant && emmaPizzaRestaurant.gallery && emmaPizzaRestaurant.gallery.images && emmaPizzaRestaurant.gallery.images.length)
    }

    const filteredGallery = () => {
        if(hasGallery()){
            return emmaPizzaRestaurant.gallery.images.filter(item => {
                let needle = 'image/placeholder.png';
                return !item.image.includes(needle);
            });
        }
    }

    const hasAtLeLeastOneSocial = () => {
        return notEmptyString(emmaPizzaRestaurant.facebook)
            || notEmptyString(emmaPizzaRestaurant.instagram)
            || notEmptyString(emmaPizzaRestaurant.youtube)
            || notEmptyString(emmaPizzaRestaurant.tripadvisor)
    }

    const handleUrl = (event, href) => {
        Linking.openURL(href);
    }



    const makeCall = () => {
        let cleanedPhoneNumber = emmaPizzaRestaurant.phone.replace(/\D||\s/g, "");

        if (cleanedPhoneNumber.indexOf('38') === 0) {
            cleanedPhoneNumber = cleanedPhoneNumber.substring(2);
        }
        const link = Platform.OS === 'ios' ? `tel://+38${cleanedPhoneNumber}` : `tel:+38${cleanedPhoneNumber}`;
        Linking.openURL(link)
    }

    const sendEmail = () => {
        let address = contacts.email;
        if (!notEmptyString(address)) return;
        let link = `mailto: ${contacts.email}`
        return Linking.openURL(link)
    }

    const openMap = () => {
        let link = emmaPizzaRestaurant.gmap;
        return notEmptyString(link) ? Linking.openURL(link.trim()) : false;
    }

    const handleLink = async (link, type) => {
        if (type === 'instagram') {
            let urlParts = link.split('/');
            let username = urlParts[urlParts.length - 1];
            let url = `instagram://user?username=${username}`;
            try {
                await Linking.openURL(url)
            } catch (err) {
                await Linking.openURL(link.trim())
            }
        } else if (type === 'youtube') {
            let urlParts = link.split('/');
            let chanelName = urlParts[urlParts.length - 1];
            let url = `youtube://chanel=${chanelName}`;
            try {
                await Linking.openURL(url)
            } catch (err) {
                await Linking.openURL(link.trim())
            }
        } else {
            await Linking.openURL(link.trim())
        }

    }





    //Template
    return (
        <>
            <SafeView>
                <NavigationEvents
                    onWillFocus={handleFocus}
                />
                <Header
                    title={translator.translate(language, 'Про MastroPizza')}
                    navigation={navigation}
                    backAllowed
                    noIcons
                />
                <View style={styles(scales).body}>
                    {
                        !isDataLoading
                            ? (
                                !settingsNetworkError
                                    ? (
                                        Object.keys(emmaPizzaRestaurant).length
                                            ? (
                                                <ScrollView showsVerticalScrollIndicator={false}
                                                            bounces={false}
                                                            keyboardShouldPersistTaps={'always'}
                                                >
                                                    <HorizontalDivider height={1} color={app_styles(scales).colors.text.grey} />
                                                    {
                                                        hasBanner()
                                                            ? (
                                                                <>
                                                                    <CarouselRestaurant
                                                                        scales={scales}
                                                                        data={emmaPizzaRestaurant.top_banner.images}
                                                                    />
                                                                    <Spacer spaceHeight={20}/>
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        emmaPizzaRestaurant.page_data && notEmptyString(emmaPizzaRestaurant.page_data.description1)
                                                            ? (
                                                                <Block>
                                                                    <HTML
                                                                        key={emmaPizzaRestaurant.page_data}
                                                                        baseFontStyle={bodyTextStyles}
                                                                        html={emmaPizzaRestaurant.page_data.description1 || '<p></p>'}
                                                                        onLinkPress={(event, href) => handleUrl(event, href)}
                                                                        imagesMaxWidth={screen_width}
                                                                        tagsStyles={{ p: paragraphStyles }}
                                                                        listsPrefixesRenderers={{
                                                                            ol: () => {
                                                                                return <Text style={styles(scales).li_prefix}></Text>
                                                                            },
                                                                            ul: () => {
                                                                                return <Text style={styles(scales).li_prefix}></Text>
                                                                            },
                                                                        }}
                                                                    />
                                                                    <Spacer spaceHeight={20}/>
                                                                </Block>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        hasGallery()
                                                            ? (
                                                                <>
                                                                    <Text
                                                                        style={styles(scales).title}>{translator.translate(language, "Галерея")}</Text>
                                                                    <Spacer spaceHeight={15}/>
                                                                    <FlatList
                                                                        contentContainerStyle={{paddingHorizontal: Math.round(scales.widthScale * 16)}}
                                                                        horizontal
                                                                        showsHorizontalScrollIndicator={false}
                                                                        keyExtractor={image => "key" + image.id}
                                                                        data={filteredGallery()}
                                                                        renderItem={({item}) => generateGalleryCard(item)}
                                                                        ItemSeparatorComponent={() => <VerticalSpacer spaceWidth={15}/>}
                                                                    />
                                                                    <Spacer spaceHeight={20}/>
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        emmaPizzaRestaurant.page_data && notEmptyString(emmaPizzaRestaurant.page_data.description2)
                                                            ? (
                                                                <Block>
                                                                    <HTML
                                                                        baseFontStyle={bodyTextStyles}
                                                                        html={emmaPizzaRestaurant.page_data.description2  || '<p></p>'}
                                                                        onLinkPress={(event, href) => handleUrl(event, href)}
                                                                        imagesMaxWidth={screen_width}
                                                                        listsPrefixesRenderers={{
                                                                            ol: () => {
                                                                                return <Text style={styles(scales).li_prefix}></Text>
                                                                            },
                                                                            ul: () => {
                                                                                return <Text style={styles(scales).li_prefix}></Text>
                                                                            },
                                                                        }}
                                                                    />
                                                                    <Spacer spaceHeight={20}/>
                                                                </Block>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        hasMenu()
                                                            ? (
                                                                <Block>
                                                                    <ButtonOrder
                                                                        color={app_styles(scales).colors.app.blue}
                                                                        icon
                                                                        iconName="menu2"
                                                                        iconSize={18}
                                                                        callback={() => setShowMenuModal(true)}
                                                                        title={translator.translate(language, "Переглянути меню")}
                                                                    />
                                                                    <Spacer spaceHeight={20}/>
                                                                </Block>
                                                            )
                                                            : null
                                                    }
                                                    <Block>
                                                        <View style={{paddingHorizontal: Math.round(scales.widthScale * 30), paddingVertical: Math.round(scales.heightScale *15)}}>
                                                            <ButtonOrder
                                                                callback={() => navigation.navigate('Menu', {from_service: true})}
                                                                title={translator.translate(language, "Перейти до меню")}
                                                                icon
                                                                iconName="menu1"
                                                                iconSize={19}
                                                                color={app_styles(scales).colors.app.blue}
                                                            />
                                                        </View>
                                                        <Spacer spaceHeight={20}/>
                                                        {
                                                            hasAtLeLeastOneSocial()
                                                                ? (
                                                                    <>
                                                                        <Text
                                                                            style={styles(scales).title}>{translator.translate(language, "Ми в соцмережах")}</Text>
                                                                        <Spacer spaceHeight={15}/>
                                                                        <View style={[
                                                                            app_styles(scales).row_center,
                                                                            {
                                                                                paddingHorizontal: Math.round(scales.widthScale * 100)
                                                                            }
                                                                        ]}>
                                                                            {
                                                                                notEmptyString(emmaPizzaRestaurant.facebook)
                                                                                    ? (
                                                                                        <>
                                                                                            <TouchableOpacity
                                                                                                style={styles(scales).social_btn}
                                                                                                onPress={() => handleLink(emmaPizzaRestaurant.facebook, 'facebook')}
                                                                                                activeOpacity={.8}
                                                                                            >
                                                                                                <IcoMoonIcon
                                                                                                    name="facebook-app-logo"
                                                                                                    color={app_styles(scales).colors.text.grey}
                                                                                                    size={30}
                                                                                                />
                                                                                            </TouchableOpacity>
                                                                                        </>
                                                                                    )
                                                                                    : null
                                                                            }
                                                                            {
                                                                                notEmptyString(emmaPizzaRestaurant.instagram)
                                                                                    ? (
                                                                                        <>
                                                                                            <TouchableOpacity
                                                                                                style={styles(scales).social_btn}
                                                                                                onPress={() => handleLink(emmaPizzaRestaurant.instagram, 'inastagram')}
                                                                                                activeOpacity={.8}
                                                                                            >
                                                                                                <IcoMoonIcon
                                                                                                    name="social-media"
                                                                                                    color={app_styles(scales).colors.text.grey}
                                                                                                    size={30}
                                                                                                />
                                                                                            </TouchableOpacity>
                                                                                        </>
                                                                                    )
                                                                                    : null
                                                                            }
                                                                            {
                                                                                notEmptyString(emmaPizzaRestaurant.youtube)
                                                                                    ? (
                                                                                        <>
                                                                                            <TouchableOpacity
                                                                                                style={styles(scales).social_btn}
                                                                                                onPress={() => handleLink(emmaPizzaRestaurant.youtube, 'youtube')}
                                                                                                activeOpacity={.8}
                                                                                            >
                                                                                                <IcoMoonIcon
                                                                                                    name="youtube"
                                                                                                    color={app_styles(scales).colors.text.grey}
                                                                                                    size={30}
                                                                                                />
                                                                                            </TouchableOpacity>
                                                                                        </>
                                                                                    )
                                                                                    : null
                                                                            }
                                                                            {
                                                                                notEmptyString(emmaPizzaRestaurant.tripadvisor)
                                                                                    ? (
                                                                                        <>
                                                                                            <TouchableOpacity
                                                                                                style={styles(scales).social_btn}
                                                                                                onPress={() => handleLink(emmaPizzaRestaurant.tripadvisor, 'tripadvisor')}
                                                                                                activeOpacity={.8}
                                                                                            >
                                                                                                <IcoMoonIcon
                                                                                                    name="tripadvisor-seeklogocom"
                                                                                                    color={app_styles(scales).colors.text.grey}
                                                                                                    size={30}
                                                                                                />
                                                                                            </TouchableOpacity>
                                                                                        </>
                                                                                    )
                                                                                    : null
                                                                            }
                                                                        </View>
                                                                        <Spacer spaceHeight={20}/>
                                                                    </>
                                                                )
                                                                : null
                                                        }
                                                    </Block>
                                                    {/* Contacts */}
                                                    <View style={styles(scales).contacts_block}>
                                                        {
                                                            notEmptyString(emmaPizzaRestaurant.schedule)
                                                                ? (
                                                                    <>
                                                                        <Spacer spaceHeight={14}/>
                                                                        <Text style={styles(scales).contact_title}>{translator.translate(language, 'Графік роботи')}</Text>
                                                                        <Spacer spaceHeight={5} />
                                                                        <View style={app_styles(scales).row_start}>
                                                                            <View style={styles(scales).icon_container}>
                                                                                <IcoMoonIcon name="wall-clock"
                                                                                             color={app_styles(scales).colors.app.white}
                                                                                             size={Math.round(scales.widthScale * 16)}/>
                                                                            </View>
                                                                            <View>
                                                                                <Text
                                                                                    style={styles(scales).text}>{emmaPizzaRestaurant.schedule}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </>
                                                                )
                                                                : null
                                                        }
                                                        {
                                                            notEmptyString(emmaPizzaRestaurant.address)
                                                                ? (
                                                                    <>
                                                                        <Spacer spaceHeight={14}/>
                                                                        <Text style={styles(scales).contact_title}>{translator.translate(language, 'Адреса')}</Text>
                                                                        <Spacer spaceHeight={5}/>
                                                                        <View style={app_styles(scales).row_start}>
                                                                            <View style={styles(scales).icon_container}>
                                                                                <IcoMoonIcon name="pin"
                                                                                             color={app_styles(scales).colors.app.white}
                                                                                             size={Math.round(scales.widthScale * 17)}/>
                                                                            </View>
                                                                            <TouchableOpacity onPress={openMap}
                                                                                              activeOpacity={.7}>
                                                                                <Text
                                                                                    style={styles(scales).text}>{emmaPizzaRestaurant.address}</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </>
                                                                )
                                                                : null
                                                        }
                                                        {
                                                            notEmptyString(emmaPizzaRestaurant.phone)
                                                                ? (
                                                                    <>
                                                                        <Spacer spaceHeight={14}/>
                                                                        <Text style={styles(scales).contact_title}>{translator.translate(language, 'Телефон')}</Text>
                                                                        <Spacer spaceHeight={5} />
                                                                        <View style={app_styles(scales).row_start}>
                                                                            <View style={styles(scales).icon_container}>
                                                                                <IcoMoonIcon name="phone-alt"
                                                                                             color={app_styles(scales).colors.app.white}
                                                                                             size={Math.round(scales.widthScale * 16)}/>
                                                                            </View>
                                                                            <TouchableOpacity onPress={makeCall}
                                                                                              activeOpacity={.7}>
                                                                                <Text
                                                                                    style={styles(scales).text}>{emmaPizzaRestaurant.phone}</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </>
                                                                )
                                                                : null
                                                        }
                                                        {
                                                            notEmptyString(contacts.email)
                                                                ? (
                                                                    <>
                                                                        <Spacer spaceHeight={14}/>
                                                                        <Text style={styles(scales).contact_title}>Email</Text>
                                                                        <Spacer spaceHeight={5} />
                                                                        <View style={app_styles(scales).row_start}>
                                                                            <View style={styles(scales).icon_container}>
                                                                                <IcoMoonIcon name="envelope"
                                                                                             color={app_styles(scales).colors.app.light_black}
                                                                                             size={Math.round(scales.widthScale * 16)}/>
                                                                            </View>
                                                                            <TouchableOpacity onPress={sendEmail}
                                                                                              activeOpacity={.7}>
                                                                                <Text
                                                                                    style={styles(scales).text}>{contacts.email}</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </>
                                                                )
                                                                : null
                                                        }
                                                    </View>
                                                </ScrollView>
                                            )
                                            : null
                                    )
                                    : <NetworkErrorModal
                                        isOpened={settingsNetworkError}
                                        closeCallback={clearSettingsNetworkError}
                                    />
                            )
                            : <DataLoadingIndicator/>
                    }
                </View>
            </SafeView>

            {/* Menu Modal */}
            {
                hasMenu()
                    ? <MenuModal
                        menu={restaurant.menu_banner}
                        isOpened={showMenuModal}
                        closeCallback={() => setShowMenuModal(false)}
                    />
                    : null
            }
        </>
    );
}


//----EXPORT----//
export default RestaurantScreen;