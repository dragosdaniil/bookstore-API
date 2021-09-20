const postgre = require('pg-promise')({
    capSQL: true // if you want all generated SQL capitalized
 });
require('dotenv').config({path:'../.env'});
const db = postgre(`postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/postgres`);
const {createCustomError} = require('../middleware/error');
const QueryModel = require('../models/queryModel');
const BookModel = require('../models/bookModel');


const getAll = async (req,res,next) =>{
    const result = await db.any('SELECT * FROM bookTable');
    return res.status(200).json(result);
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
    const filters = req.query;
    const query = new QueryModel('bookTable');
    let queryResult;
    try{
        queryResult = await db.many(query.filterQuery(filters),{...filters});
    }catch(error){
        return next(createCustomError(`No results coresponding to the filters have been found`));
    }
    return res.status(200).json(queryResult);
}


const createBook = async(req,res,next)=>{
    const book = req.body;
    const referenceNumber = Date.now();
    const bookInstance = new BookModel();
    const query = new QueryModel('bookTable');
    bookInstance.buildBookFromObject(book);
    try{
        const newBook = bookInstance.toObject();
        await db.none(query.createQuery(newBook), {...newBook, reference_number:referenceNumber});   
    }catch(error){
        return next(createCustomError(error.message));
    }
    return res.status(201).json({"status":"Success","message":"Book has been added successfully!"})
}



const updateRow = async(req,res,next)=>{
    const book = req.body;
    const {reference_number:referenceNumber, title} = req.params;
    const query = new QueryModel('bookTable');    
    try {
        if(referenceNumber){
            await db.none(query.updateQuery(book, 'reference_number'), {...book, reference_number:referenceNumber});
        }else{
            await db.none(query.updateQuery(book), {...book, title:title});
        }
    }catch(error){
        return next(createCustomError(error.message));  
    }
    return res.status(200).json({message:"Success"});
}

module.exports = {getAll, createBook, getOne, getByFilters, updateRow}
