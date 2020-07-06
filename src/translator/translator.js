import english from "./languages/english";
import russian from "./languages/russian";


class Translator {
    constructor(english, russian){
        this.english = english;
        this.russian = russian;
    }

    translate(language, value){
        switch (language) {
            case 'english':
                return this.english[value] || value;
            case 'russian':
                return this.russian[value] || value;
            default:
                return value;    
        };        
    }
}


export default new Translator(english, russian);