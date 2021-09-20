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


    createQuery(bookObject){
        let columns = '(';
        let values = '(';
        for(let key in bookObject){
            columns += `${key},`;
            values += `$/${key}/,`;
        }

        columns += `${this.referenceNumber})`;
        values += `$/${this.referenceNumber}/)`

        let query = `${this.insert} ${this.into} ${this.tableName} ${columns} \ 
            ${this.values} ${values} \
            ${this.on} ${this.conflict} (title) \
            ${this.do} ${this.update} ${this.set} quantity=${this.tableName}.quantity+1\
            ${this.where} ${this.tableName}.title = $/title/;`;

        return query;
    }


    updateQuery(bookObject, selector = 'title'){
        let values = ''; 
        for(let key in bookObject){
            if(key!='title'){
                values += `${key}=$/${key}/,`;
            }
        }
        values = values.slice(0,values.length-1);
        let query = `${this.update} ${this.tableName} ${this.set} ${values} ${this.where} ${selector}=$/${selector}/;`;

        return query;
    }


    filterQuery(filters){
        let query = `${this.select} * ${this.from} ${this.tableName}`;

        if(filters.author){
            query += ` ${this.where} author=$/author/ ${this.and} `;
        }

        if(filters.genre){
            query += ` ${this.where} genre=$/genre/ ${this.and} `;
        }

        if(filters.minPrice){
            query += ` ${this.where} price>$/minPrice/ ${this.and} `;
        }

        if(filters.maxPrice){
            query += ` ${this.where} price<$/maxPrice/ ${this.and} `;
        }
        query = query.slice(0,query.length - 5) + ';';

        return query;
    }
}

// const query = new QueryModel('booktable');
// const book = {title:'Title',author:'Author', image_url:'image_url', price:0, genre:'Fantasy'};
// console.log(query.updateQuery(book));
// console.log(query.createQuery(book));
// console.log(query.filterQuery({author:true, minPrice:true, maxPrice:true,genre:true}));

module.exports = QueryModel;
