const SCHEMA = {
                title:true,
                author:true,
                price:false,
                genre:false,
                quantity:false,
                image_url:false,
            };

const checkSchema = (book) => {
    for (key in SCHEMA){
        if (SCHEMA[key]){
            if(!book[key]){
                return [false, key];
            }
        }
    }
    return true;
}

module.exports = checkSchema;