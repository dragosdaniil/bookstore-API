const postgre = require('pg-promise')({
    capSQL: true // if you want all generated SQL capitalized
 });
require('dotenv').config({path:'../.env'});
const db = postgre(`postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/postgres`);
const {createCustomError} = require('../middleware/error');
const QueryModel = require('../models/queryModel');
const BookModel = require('../models/bookModel');
const query = new QueryModel('bookTable');

const getAll = async (req,res,next) =>{
    const result = await db.any('SELECT * FROM bookTable');
    const jsonResult = {status:"Success", Books:result, Items:result.length};
    return res.status(200).json(jsonResult);
}


const getOne = async(req,res,next)=>{
    const selectors = req.params;
    let queryResult;
    try{
        queryResult = await db.one(query.getOneQuery(selectors), {...selectors});
    } catch(error){
        return next(createCustomError(`No ${Object.keys(selectors)[0]} has been found`));
    }
    return res.status(200).json(queryResult);
}


const getByFilters = async (req,res,next)=>{
    const filters = req.query;
    let queryResult;
    try{
        queryResult = await db.many(query.filterQuery(filters),{...filters});
    }catch(error){
        return next(createCustomError(`No results coresponding to the filters have been found`));
    }
    const jsonResult = {status:"Success", Books:queryResult, Items:queryResult.length};
    return res.status(200).json(jsonResult);
}


const createBook = async(req,res,next)=>{
    const payload = req.body;
    const referenceNumber = Date.now();
    const bookInstance = new BookModel();
    try{
        for(let i = 0; i<payload.length;i++){
            bookInstance.buildBookFromObject(payload[i]);
            const newBook = bookInstance.toObject();
            await db.none(query.createQuery(newBook), {...newBook, reference_number:referenceNumber});
        }
    }catch(error){
        return next(createCustomError(error.message));
    }
    return res.status(201).json({"status":"Success","message":"Books have been added successfully!"})
}



const updateRow = async(req,res,next)=>{
    const book = req.body;
    const {reference_number:referenceNumber, title} = req.params;    
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
