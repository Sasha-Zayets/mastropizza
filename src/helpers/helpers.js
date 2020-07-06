import { AsyncStorage } from "react-native";


const prepareLanguageToHttpRequest = (language) => {
    switch (language) {
        case "english":
            return "en";
        case "russian":
            return "ru";
        default:
            return "uk"
    }
}

const reformatUserPhone = (value) => {
    let cleanedPhone = value.replace(/[^0-9]+/g, '');
    let formatedNumber = "+" + cleanedPhone.substring(0, 3) + " " + cleanedPhone.substring(3, 5) + " " + cleanedPhone.substring(5, 8) + " " + cleanedPhone.substring(8, 10) + " " + cleanedPhone.substring(10, 12);
    return formatedNumber;
}

/**
* Format price to locale
*/
const formatPrice = (language, price) => {
    let priceTransformed = Number(price).toFixed(2);

    switch (language) {
        case 'english':
            return priceTransformed.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        default:
            return priceTransformed.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }
}

const checkIfDate = (value) => {
    return !isNaN(Date.parse(value));
}


const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    return token || null;
}


function getUniqueId() {
    if (typeof getUniqueId.increment === 'undefined') {
        getUniqueId.increment = 0;
    }
    return ++getUniqueId.increment;
}


const makeCopy = data => JSON.parse(JSON.stringify(data))


function escapeHtml(string) {
    return string
         .replace(/&lt;/gi, "<")
         .replace(/&gt;/gi, ">")
         .replace(/&quot;/gi, "\"")
         .replace(/&#39;/gi, "'")
         .replace(/&nbsp;/gi, "")
         .replace(/&rsquo;/gi, "'");
 }

const notEmptyString = (str) => {
    return !!(str && str.trim())
}

export { prepareLanguageToHttpRequest, formatPrice, reformatUserPhone, checkIfDate, checkAuth, getUniqueId, escapeHtml, makeCopy, notEmptyString };