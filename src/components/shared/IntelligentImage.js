//----IMPORTS----//
//React
import React, {useState, useContext} from 'react';
//React native
import {View, Image, Modal, TouchableOpacity} from 'react-native';
//Context
import {Context as AppSettingsContext} from "../../context/AppSettingsContext";
//React-native-vector-icons package
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
//Components
import SafeView from "./SafeView";
//Styles
import styles from "../../styles/components/shared/intelligent-image";
import {app_styles} from "../../styles/app_styles";


//----COMPONENT----//
const IntelligentImage = ({thumbnailSource, thumbnailStyles, fullSizeSource, fullSizeStyles, isZoomable = true}) => {
    //Data and State
    const {state: {scales}} = useContext(AppSettingsContext);
    const [thumbnailUri, setThumbnailUri] = useState(require("../../../assets/images/default.png"));
    const [fullSizeUri, setFullSizeUri] = useState(require("../../../assets/images/default.png"));
    const [zoomImage, setZoomImage] = useState(false);


    //Template
    return (
        <>
            <View>
                {
                    isZoomable
                        ? (
                            <TouchableOpacity onPress={() => setZoomImage(true)} activeOpacity={.7}>
                                <Image
                                    style={thumbnailStyles}
                                    source={thumbnailUri}
                                    onLoad={() => {
                                        setThumbnailUri({uri: thumbnailSource})
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )
                        : <Image
                            style={thumbnailStyles}
                            source={thumbnailUri}
                            onLoad={() => {
                                setThumbnailUri({uri: thumbnailSource})
                            }}
                            resizeMode="cover"
                        />
                }
            </View>
            {/* MODAL */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={zoomImage}
            >
               <SafeView>
                   <View style={styles(scales).modal_content_container}>
                       {/* Close modal */}
                       <View style={styles(scales).header_row}>
                           <TouchableOpacity onPress={() => setZoomImage(false)}
                                             style={styles(scales).close_modal_button_container}>
                               <View style={styles(scales).close_modal_button}>
                                   <IcoMoonIcon name="cancel" color={app_styles(scales).colors.text.primary}
                                                size={Math.round(scales.widthScale * 14)}/>
                               </View>
                           </TouchableOpacity>
                       </View>
                       {/* Modal card */}
                       <View style={styles(scales).modal_card}>
                           <Image
                               onLoad={() => {
                                   setFullSizeUri({uri: fullSizeSource})
                               }}
                               style={fullSizeStyles}
                               source={fullSizeUri}
                           />
                       </View>
                   </View>
               </SafeView>
            </Modal>
        </>
    )
}


//----EXPORT----//
export default IntelligentImage;