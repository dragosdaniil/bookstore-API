function createNewBook(payload){
    const template = {
        price: 9.99,
        genre: '',
        quantity: 1,
        image_url: ''
    }

    if(!payload.title){
        throw Error('"title" property is undefined');
    }
    
    if(!payload.author){
        throw Error('"author" property is undefined');
    }

    return {...template, ...payload};
    
}

module.exports = createNewBook;