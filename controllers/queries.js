const postgre = require('pg-promise')({
    capSQL: true // if you want all generated SQL capitalized
 });
require('dotenv').config({path:'../.env'});
const checkSchema = require('../template/schema');
const db = postgre(`postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/postgres`);
const {createCustomError} = require('../middleware/error');
const {updateWithImage, updateWithoutImage, createWithImage, createWtihoutImage, createNewBook} = require('./queryTemplates');
const BookModel = require('../models/bookModel');

const getAll = async (req,res,next) =>{
    const result = await db.any('SELECT * FROM bookTable');
    return res.status(200).json(result);
}


const createBook = async(req,res,next)=>{
    const book = req.body;
    const referenceNumber = Date.now();
    const validation = checkSchema(book)
    const bookInstance = new BookModel();
    bookInstance.buildBookFromObject(book);
    
    if(validation === true){
        await db.none(book.image_url?
            createWithImage:createWtihoutImage,
            {...book, reference_number:referenceNumber});   
            
    } else if (validation instanceof Array){
        
        return next(createCustomError(`${validation[1]} could not be found`));
    }
    return res.status(201).json({"status":"Success","message":"Book has been added successfully!"})
}


const getOne = async(req,res,next)=>{
    const {id:bookid, reference_number:referenceNumber, title:title} = req.params;
    let queryResult;
    try{

        if(bookid){
            queryResult = await db.one('SELECT * FROM bookTable WHERE bookId=$1',[bookid]);
        }else if(referenceNumber){
            queryResult = await db.one('SELECT * FROM bookTable WHERE reference_number=$1',[referenceNumber]);
        }else{
            queryResult = await db.one('SELECT *  FROM bookTable WHERE title=$1',[title]);
        }
        
    } catch(error){
        return next(createCustomError(`No ${referenceNumber} has been found`));
    }
    return res.status(200).json(queryResult);
}


const getByFilters = async (req,res,next)=>{
    const {author,genre} = req.query;
    let queryResult;
    try{

        if(author && genre){
            queryResult = await db.many('SELECT * FROM bookTable WHERE author=$1 AND genre=$2',[author, genre]);
        }else if(!genre){
            queryResult = await db.many('SELECT * FROM bookTable WHERE author=$1',[author]);
        }else if (!author){
            queryResult = await db.many('SELECT * FROM bookTable WHERE genre=$1',[genre]);
        }
    
    }catch(error){
        return next(createCustomError(`No results coresponding to the filters have been found`));
    }
    return res.status(200).json(queryResult);
}

const updateRow = async(req,res,next)=>{
    const book = req.body;
    const {reference_number:referenceNumber, title} = req.params;
    let newBook;

    if(referenceNumber){
        newBook = {...book, reference_number:referenceNumber};
    }else{
        newBook = {...book,title:title};
    }
        try {
                console.log(newBook.image_url?updateWithImage:updateWithoutImage,)
                await db.none(
                    newBook.image_url?updateWithImage:updateWithoutImage,
                    {...newBook}
                    );

            }catch(error){

                if(referenceNumber){
                    return next(createCustomError(`No ${referenceNumber} has been found`));
                }else{
                    return next(createCustomError(error));
                }
            
        }
    
    
    return res.status(200).json({message:"Success"});
}

module.exports = {getAll, createBook, getOne, getByFilters, updateRow}
