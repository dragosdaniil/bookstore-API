class QueryModel{
    constructor(tableName){
        this.do = 'DO';
        this.on = 'ON';
        this.set = 'SET';
        this.into = 'INTO';
        this.where = 'WHERE';
        this.update = 'UPDATE';
        this.insert = 'INSERT';
        this.values = 'VALUES';
        this.conflict = 'CONFLICT';
        this.referenceNumber = 'reference_number';  
        
        this.tableName = tableName;
    }

    createQuery(bookObject){
        let columns = '(';
        let values = '(';
        for(let key in bookObject){
            columns +=`${key},`;
            values += `$<${key}>,`;
        }

        columns += `${this.referenceNumber})`;
        values += `$<${this.referenceNumber}>)`

        let query = `${this.insert} ${this.into} ${this.tableName} ${columns} \ 
            ${values} ${this.on} ${this.conflict} \
            ${this.do} ${this.update} ${this.set} quantity=${this.tableName}.quantity+1\
            ${this.where} ${this.tableName}.title = $<title>;
        `;

        return query;
    }

    filterQuery(){

    }

    updateQuery(bookObject){
        let values = ''; 
        for(let key in bookObject){
            if(key!='title'){
                values += `${key}=$<${key}>,`;
            }
        }
        values = values.slice(0,values.length);
        let query = `${this.update} ${this.tableName} ${this.set} ${values} ${this.where} title=$<title>`;

        return query;
    }
}

module.exports = QueryModel;
