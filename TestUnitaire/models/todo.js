//schema 
//titre String
//bolean bolean

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TodoSchema = new Schema(
    {
        titre: {
            type: String
        },
        fait:{
            type: Boolean
        }
    })

    let Todo = mongoose.model("Todo", TodoSchema);

    module.exports = Todo;