class QueryModel{
    constructor(tableName){
        this.do = 'DO';
        this.on = 'ON';
        this.set = 'SET';
        this.and = 'AND';
        this.into = 'INTO';
        this.from = 'FROM';
        this.where = 'WHERE';
        this.update = 'UPDATE';
        this.insert = 'INSERT';
        this.values = 'VALUES';
        this.select = 'SELECT';
        this.conflict = 'CONFLICT';
        this.referenceNumber = 'reference_number';  
        
        this.tableName = tableName;
    }


    getOneQuery(selectors){
        let query = `${this.select} * ${this.from} ${this.tableName} ${this.where}`;
        for(let key in selectors){
            if(selectors[key]){
                query += ` ${key}=$/${key}/;`;
                break;
            }
        }
        return query;
    }
    

    createQuery(bookObject){
        let columns = '(';
        let values = '(';
        for(let key in bookObject){
            columns += `${key},`;
            values += `$/${key}/,`;
        }

        columns += `${this.referenceNumber})`;
        values += `$/${this.referenceNumber}/)`

        return `${this.insert} ${this.into} ${this.tableName} ${columns} \ 
            ${this.values} ${values} \
            ${this.on} ${this.conflict} (title) \
            ${this.do} ${this.update} ${this.set} quantity=${this.tableName}.quantity+1\
            ${this.where} ${this.tableName}.title = $/title/;`;
    }


    updateQuery(bookObject, selector = 'title'){
        let values = ''; 
        for(let key in bookObject){
            if(key!='title'){
                values += `${key}=$/${key}/,`;
            }
        }
        values = values.slice(0,values.length-1);
        return `${this.update} ${this.tableName} ${this.set} ${values} ${this.where} ${selector}=$/${selector}/;`;
    }


    filterQuery(filters){
        let query = `${this.select} * ${this.from} ${this.tableName} ${this.where}`;

        if(filters.author){
            query += ` author=$/author/ ${this.and} `;
        }

        if(filters.genre){
            query += ` genre=$/genre/ ${this.and} `;
        }

        if(filters.minPrice){
            query += ` price=>$/minPrice/ ${this.and} `;
        }

        if(filters.maxPrice){
            query += ` price<=$/maxPrice/ ${this.and} `;
        }
        return query.slice(0,query.length - 5) + ';';
    }
}

// const query = new QueryModel('booktable');
// const book = {title:'Title',author:'Author', image_url:'image_url', price:0, genre:'Fantasy'};
// console.log(query.updateQuery(book));
// console.log(query.createQuery(book));
// console.log(query.filterQuery({author:true, minPrice:true, maxPrice:true,genre:true}));
// console.log(query.getOneQuery({bookid:null,title:'arthur',reference_number:145353636366}));
module.exports = QueryModel;
