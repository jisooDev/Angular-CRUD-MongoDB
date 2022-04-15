const mogoose = require('mongoose');
const Schema = mogoose.Schema;

let Book = new Schema({
    name:{
        type: String
    },
    price:{
        type: String
    },
    description:{
        type: String
    }
},{
    collection: 'books'
})

module.exports = mogoose.model('Book',Book);