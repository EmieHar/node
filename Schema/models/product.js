const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
    }]
});

let Product = mongoose.model("Product", ProductSchema);

module.exports = Product;