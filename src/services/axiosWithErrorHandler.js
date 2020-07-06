import axios from 'axios';
import { navigate } from "../_navigationRefs";




const axiosWithErrorHandler = axios.create({
    timeout: 8000
});


axiosWithErrorHandler.interceptors.response.use(async function (config) {        
    if (config.data.status === 'error') {        
        if (Number(config.data.code) === 524) {
            return navigate('UpdateApp', {'message': config.data.message})
        } 
        return Promise.reject(config);
    }
    return config;
}, function (err) {
    return Promise.reject(err)
})

export default axiosWithErrorHandler;