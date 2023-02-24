const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ReviewSchema = new Schema(
    {
        stars: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true
    }
});

let Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;