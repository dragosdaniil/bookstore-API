const postgre = require('pg-promise')({
    capSQL: true // if you want all generated SQL capitalized
 });
require('dotenv').config({path:'../.env'});
const checkSchema = require('../template/schema')
const db = postgre(`postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/postgres`);
const {createCustomError} = require('../middleware/error');

const getAll = async (req,res,next) =>{
    const result = await db.any('SELECT * FROM bookTable');
    return res.status(200).json(result);
}


const createBook = async(req,res,next)=>{
    const book = req.body;
    const referenceNumber = Date.now();
    const validation = checkSchema(book)
    console.log(book)
    if(validation === true){
       db.none('INSERT INTO bookTable (title, reference_number, author, price, genre, quantity) \
       VALUES($/title/,$/reference_number/,$/author/,$/price/,$/genre/,$/quantity/) \
       ON CONFLICT (title) \
       DO UPDATE SET quantity=bookTable.quantity+1 \
       WHERE bookTable.title=$/title/', {...book, reference_number:referenceNumber});        
    } else if (validation instanceof Array){
        
        return next(createCustomError(`${validation[1]} could not be found`));
    }
    return res.status(201).json({"status":"Success","message":"Book has been added successfully!"})
}


const getOne = async(req,res,next)=>{
    const {id:bookid, reference_number:referenceNumber} = req.params;
    let queryResult;
    try{

        if(bookid){
            queryResult = await db.one('SELECT * FROM bookTable WHERE bookId=$1',[bookid]);
        }else{
            queryResult = await db.one('SELECT * FROM bookTable WHERE reference_number=$1',[referenceNumber]);
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
    const referenceNumber = req.params.reference_number;
    
        try {
            db.none('UPDATE bookTable\
            SET title=$/title/,\
            author=$/author/, price=$/price/,\
            genre=$/genre/, quantity=$/quantity/\
            WHERE reference_number=$/reference_number/',
            {...book,reference_number:referenceNumber})
        } catch(error){
            return next(createCustomError(`No ${referenceNumber} has been found`));
        }
    
    
    return res.status(200).json({message:"Success"});
}

module.exports = {getAll, createBook, getOne, getByFilters, updateRow}
