//-------------------------------------------------------------------------------------------------------------------------------------------//
//----IMPORTS----//
//React Components
import React from "react";
//React Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//Navigation refs
/**
 * Makes available to use navigation in context files (not only in screens included into navigation)
 */
import { setNavigator } from '../_navigationRefs';

//SafeAreaProvider
import { SafeAreaProvider } from 'react-native-safe-area-context';
//-------------------------------------------------------------------------------------------------------------------------------------------//
//----PROVIDERS----//
import { Provider as AppSettingsProvider } from '../../src/context/AppSettingsContext';
import { Provider as AuthProvider } from '../../src/context/AuthContext';
import { Provider as MenuProvider } from "../../src/context/MenuContext";


//-------------------------------------------------------------------------------------------------------------------------------------------//
//----SCREENS----//
//App stack
import RestaurantScreen from "../screens/RestaurantScreen";
import MenuScreen from "../screens/MenuScreen";
import CartScreen from "../screens/CartScreen";
import MakeOrderScreen from "../screens/MakeOrderScreen";
import AppMenuScreen from "../screens/AppMenuScreen";
import LogInScreen from "../screens/LogInScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import PasswordForgotScreen from "../screens/PasswordForgotScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen.js";
import TermsAndConditionsPageScreen from "../screens/TermsAndConditionsPageScreen.js";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import OrdersHistoryScreen from "../screens/OrdersHistoryScreen";
import OrderHistoryDetailsScreen from "../screens/OrdersHistoryDetailsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import UpdateAppScreen from "../screens/UpdateAppScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ReadNotificationScreen from "../screens/ReadNotificationScreen";
import ProductScreen from "../screens/ProductScreen";
import PizzaConstructorScreen from "../screens/PizzaConstructorScreen";
import NewsScreen from "../screens/NewsScreen";
import PostScreen from "../screens/PostScreen";


//MAIN STACK
const AppStack = createStackNavigator(
    {
        AppMenu: AppMenuScreen,
        Restaurant: RestaurantScreen,
        Menu: MenuScreen,
        Cart: CartScreen,
        MakeOrder: MakeOrderScreen,
        LogIn: LogInScreen,
        Registration: RegistrationScreen,
        PasswordForgot: PasswordForgotScreen,
        TermsAndConditions: TermsAndConditionsScreen,
        TermsAndConditionsPage: TermsAndConditionsPageScreen,
        EditProfile: ProfileEditScreen,
        OrdersHistory: OrdersHistoryScreen,
        OrderDetails: OrderHistoryDetailsScreen,
        ChangePassword: ChangePasswordScreen,
        Contacts: ContactsScreen,
        UpdateApp: UpdateAppScreen,
        Notifications: NotificationsScreen,
        ReadNotification: ReadNotificationScreen,
        Product: ProductScreen,
        PizzaConstructor: PizzaConstructorScreen,
        News: NewsScreen,
        Post: PostScreen
    },
    {
        initialRouteName: 'Menu',
        headerMode: 'none',
    }
)


AppStack.navigationOptions = ({ navigation }) => {
    return {
        cardStyle: {
            backgroundColor: '#465C87'
        }
    }
}


//-------------------------------------------------------------------------------------------------------------------------------------------//
//----APP CONTAINER----//
const App = createAppContainer(AppStack);



//-------------------------------------------------------------------------------------------------------------------------------------------//
//----EXPORT----//
export default () => {
    return (
        <SafeAreaProvider>
            <AppSettingsProvider>
                <AuthProvider>
                    <MenuProvider>
                        <App ref={(navigator) => { setNavigator(navigator) }} />
                    </MenuProvider>
                </AuthProvider>
            </AppSettingsProvider>
        </SafeAreaProvider>
    );
}
