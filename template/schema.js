const SCHEMA = {
                bookId:false,
                title:true,
                author:true,
                price:false,
                genre:false,
                quantity:false,
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