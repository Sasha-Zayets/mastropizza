//----IMPORTS----//
//React
import React, {useContext, useEffect, useState} from 'react';
//React native
import {View, Text, Image, Linking, TouchableOpacity, Dimensions, FlatList} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
//HTML-render
import HTML from "react-native-render-html";
//Helpres
import {notEmptyString, prepareLanguageToHttpRequest} from "../../helpers/helpers";
//Styles
import styles from '../../styles/components/news/news-card';
import {app_styles} from "../../styles/app_styles";
//Moment
import moment from "moment";
import 'moment/locale/uk';
import 'moment/locale/ru';
//Components
import {Block, IntelligentImage, Spacer, VerticalSpacer} from "../shared";
//Localization
import translator from "../../translator/translator";


//----COMPONENT----//
const NewsCard = ({navigation, post, preview}) => {
    //Data and State
    const {state: {scales, language}} = useContext(AppSettingsContext);
    const [bodyTextStyles, setBodyTextStyles] = useState({});
    const [paragraphStyles, setParagraphStyles] = useState({});


    //Hooks
    useEffect(() => {
        setBodyTextStyles({
            fontFamily: app_styles(scales).fonts.weight.regular,
            fontSize: Math.round(scales.fontScale * 14),
            color: app_styles(scales).colors.text.primary
        });
        setParagraphStyles({
            textAlign: "justify",
            marginBottom: Math.round(scales.heightScale * 10)
        });
    }, []);


    //Methods
    const handleUrl = (event, href) => {
        return notEmptyString(href) ? Linking.openURL(href) : false;
    }


    const transformUnixTime = (time) => {
        const lang = prepareLanguageToHttpRequest(language);
        moment.locale(lang);
        return moment(parseInt(time) * 1000).format('DD MMMM YYYY');
    }

    const populateTags = () => {
        return post.tags.map((item, index) => {
            return (
                <View key={index}>
                   <Text style={styles(scales).tag}># {item.name}</Text>
                </View>
            );
        })
    }


    const renderDateAndTags = () => {
        return (
            <View style={app_styles(scales).row_start}>
                <View style={styles(scales).date_container}>
                    <Text style={styles(scales).date}>{transformUnixTime(post.date)}</Text>
                </View>
                {
                    post.tags && post.tags.length
                        ? (
                            <>
                                <VerticalSpacer spaceWidth={14}/>
                                <View style={styles(scales).tags_container}>
                                    {populateTags()}
                                </View>
                            </>
                        )
                        : null
                }
            </View>
        );
    }


    const generateThumbnailExtraStyles = () => {
        return {
            borderTopLeftRadius: preview ? Math.round(scales.widthScale * 6) : 0,
            borderTopRightRadius: preview ? Math.round(scales.widthScale * 6) : 0,
        }
    }




    const hasGallery = () => {
        return !!(post && post.gallery && post.gallery.images && post.gallery.images.length)
    }


    const filteredGallery = () => {
        if(hasGallery()){
            return post.gallery.images.filter(item => {
                let needle = 'image/placeholder.png';
                return !item.image.includes(needle);
            });
        }
    }


    const generateGalleryCard = (item) => {
        return (
            <View style={styles(scales).gallery_card_container}>
                <IntelligentImage
                    thumbnailStyles={styles(scales).thumbnail_image}
                    thumbnailSource={item.image_preview}
                    fullSizeSource={item.image}
                    fullSizeStyles={styles(scales).full_image}
                />
            </View>
        );
    }




    //Template
    return (
        <View style={styles(scales).card_container}>
            {/* Thumbnail */}
            <View style={styles(scales).thumbnail_container}>
                <Image
                    source={{uri: post.image_preview || post.image}}
                    style={[styles(scales).thumbnail, generateThumbnailExtraStyles()]}
                />
            </View>
            <View style={{
                    backgroundColor: preview ? '#f5f5f5' : '#FFFFFF',
                    borderRadius: 5,
            }}>
                <Spacer spaceHeight={20}/>
                <View>
                    {/* Title */}
                    <Block>
                        <View style={{flex: 1}}>
                            <Text style={styles(scales).title}>{post.title}</Text>
                        </View>
                        <Spacer spaceHeight={10}/>
                    </Block>
                    {/* Body or preview */}
                    {
                        preview
                            ? (
                                <Block>
                                    { renderDateAndTags() }
                                    <Spacer spaceHeight={15} />
                                    <TouchableOpacity onPress={() => navigation.navigate('Post', {'postId': post.id})}
                                                      activeOpacity={.8}>
                                        <Text style={styles(scales).read_more}>{translator.translate(language, "Читати")}</Text>
                                    </TouchableOpacity>
                                </Block>
                            )
                            : (
                                <>
                                    <Block>
                                        <Spacer spaceHeight={10}/>
                                        <HTML
                                            baseFontStyle={bodyTextStyles}
                                            html={post.text}
                                            onLinkPress={(event, href) => handleUrl(event, href)}
                                            imagesMaxWidth={Dimensions.get('window').width}
                                            tagsStyles={{ p: paragraphStyles }}
                                            listsPrefixesRenderers={{
                                                ol: () => {
                                                    return <Text></Text>
                                                },
                                                ul: () => {
                                                    return <Text></Text>
                                                },
                                            }}
                                        />
                                    </Block>
                                    {
                                        hasGallery()
                                            ? (
                                                <>
                                                    <Spacer spaceHeight={15} />
                                                    <FlatList
                                                        horizontal
                                                        contentContainerStyle={{paddingHorizontal: Math.round(scales.widthScale * 16)}}
                                                        showsHorizontalScrollIndicator={false}
                                                        keyExtractor={image => "key" + image.id}
                                                        data={filteredGallery()}
                                                        renderItem={({item}) => generateGalleryCard(item)}
                                                        ItemSeparatorComponent={() => <VerticalSpacer spaceWidth={15}/>}
                                                    />
                                                </>
                                            )
                                            : null
                                    }
                                    <Spacer spaceHeight={20} />
                                    <Block>
                                        { renderDateAndTags() }
                                    </Block>
                                </>
                            )
                    }
                </View>
                <Spacer spaceHeight={20}/>
            </View>
        </View>
    );
}


//----EXPORT----//
export default NewsCard;