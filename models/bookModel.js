class BookModel {

    #title
    #author
    #price
    #genre
    #quantity
    #image_url

    constructor(){
        this.#title = '';
        this.#author = '';
        this.#price = 9.99;
        this.#genre = '';
        this.#quantity = 1;
        this.#image_url = '';
    }

    get getTitle(){
        return this.#title;
    }

    get getAuthor(){
        return this.#author;
    }

    get getPrice(){
        return this.#price;
    }

    get getGenre(){
        return this.#genre;
    }

    get getQuantity(){
        return this.#quantity;
    }

    get getImageUrl(){
        return this.#image_url;
    }

    set setPrice(newPrice){
        this.#price = newPrice;
    }

    set setQuantity(newQuantity){
        this.#quantity = newQuantity;
    }

    set setTitle(newTitle){
        this.#title = newTitle;
    }

    set setAuthor(newAuthor){
        this.#author = newAuthor;
    }

    set setGenre(newGenre){
        this.#genre = newGenre;
    }

    set setImageUrl(newImageUrl){
        this.#image_url = newImageUrl;
    }

    buildBookFromObject(bookObject){
        this.setTitle=bookObject.title; // must be
        this.setAuthor=bookObject.author; // must be
        this.setPrice=bookObject.price?bookObject.price:this.getPrice; // optional
        this.setGenre=bookObject.genre?bookObject.genre:this.getGenre; // optional
        this.setQuantity=bookObject.quantity?bookObject.quantity:this.getQuantity; // optional
        this.setImageUrl=bookObject.image_url?bookObject.image_url:this.getImageUrl; // optional
    }

    toObject(){
        let newObj = {};

    }
}

module.exports = BookModel;