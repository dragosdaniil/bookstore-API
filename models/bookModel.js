class BookModel {
    constructor(){
        this._title = '';
        this._author = '';
        this._price = 9.99;
        this._genre = '';
        this._quantity = 1;
        this._image_url = '';
    }

    get getTitle(){
        return this._title;
    }

    get getAuthor(){
        return this._author;
    }

    get getPrice(){
        return this._price;
    }

    get getGenre(){
        return this._genre;
    }

    get getQuantity(){
        return this._quantity;
    }

    get getImageUrl(){
        return this._image_url;
    }

    set setPrice(newPrice){
        this._price = newPrice;
    }

    set setQuantity(newQuantity){
        this._quantity = newQuantity;
    }

    set setTitle(newTitle){
        this._title = newTitle;
    }

    set setAuthor(newAuthor){
        this._author = newAuthor;
    }

    set setGenre(newGenre){
        this._genre = newGenre;
    }

    set setImageUrl(newImageUrl){
        this._image_url = newImageUrl;
    }

    buildBookFromObject(bookObject){
        this.setTitle(bookObject.title); // must be
        this.setAuthor(bookObject.author); // must be
        this.setPrice(bookObject.price?bookObject.price:this.getPrice()); // optional
        this.setGenre(bookObject.genre?bookObject.genre:this.getGenre()); // optional
        this.setQuantity(bookObject.quantity?bookObject.quantity:this.getQuantity()); // optional
        this.setImageUrl(bookObject.image_url?bookObject.image_url:this.getImageUrl()); // optional
    }
}
module.exports = BookModel;