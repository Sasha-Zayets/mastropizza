import axiosWithErrorHandler from './axiosWithErrorHandler'
import { AsyncStorage } from "react-native";


axiosWithErrorHandler.interceptors.request.use(async function(config){
    const token = await AsyncStorage.getItem('token');

    if(token){
        config.headers.common['Auth-Key'] = `${token}`
    }

    return config
}, function (err) {
    Promise.reject(err)
})

export default axiosWithErrorHandler;