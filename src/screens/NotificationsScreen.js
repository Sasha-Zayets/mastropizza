//----IMPORTS----//
//React
import React, { useContext } from 'react';
//React native
import { View, FlatList } from 'react-native';
//Context
import { Context as AppSettingsContext } from "../context/AppSettingsContext";
import { Context as AuthContext } from "../context/AuthContext";
//Componetns
import Header from "../components/shared/Header";
import { SafeView, Block, DataLoadingIndicator, Spacer, IntelligentImage } from "../components/shared";
import NoContentBlock from "../components/shared/NoContentBlock";
import NotificationCard from "../components/notifications/NotificationCard";
import { NetworkErrorModal } from '../components/modals';
//Styles
import styles from "../styles/screens/notifications-screen";
//Localization
import translator from '../translator/translator';


//----COMPONENT----//
const NotificationsScreen = ({ navigation }) => {
    //Data and State
    const { state: { scales, language } } = useContext(AppSettingsContext);
    const { state: { networkError, notifications }, clearNetworkError } = useContext(AuthContext);


    //Hooks and Methods
    function getUniqueNumber(){
        if(typeof getUniqueNumber.count === 'undefined'){
            getUniqueNumber.count = 0;            
        }
        return ++getUniqueNumber.count;
    }



    //Template
    return (
        <>
            <SafeView>
                <Header
                    title={translator.translate(language, "Повідомлення")}
                    backAllowed
                    navigation={navigation}
                    noIcons
                />
                <View style={styles(scales).body}>
                    {
                        !networkError
                            ? (
                                notifications && notifications.length
                                    ? (
                                        <Block>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                keyExtractor={notification => "key" + notification.id + getUniqueNumber()}
                                                data={notifications}
                                                renderItem={({ item }) => <NotificationCard notification={item} navigation={navigation} />}
                                                ItemSeparatorComponent={() => <Spacer spaceHeight={20} />}
                                                contentContainerStyle={{ paddingVertical: Math.round(scales.heightScale * 20) }}
                                                bounces={false}
                                            />
                                        </Block>
                                    )
                                    : <NoContentBlock
                                        navigation={navigation}
                                        title={translator.translate(language, "Історія порожня")}
                                        note={translator.translate(language, "На даний момент Вам не надсилалося жодного push-повідомлення")}
                                        toMainLink
                                    />
                            )
                            : <NetworkErrorModal
                                isOpened={networkError}
                                closeCallback={clearNetworkError}
                            />
                    }
                </View>
            </SafeView>
        </>
    );
}



//----EXPORT----//
export default NotificationsScreen;