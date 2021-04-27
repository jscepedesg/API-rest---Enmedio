import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary']
    },
    price: {
        type: Number,
        required: [true, 'The price is necessary']
    },
    image: {
        type: String,
        required: [true, 'The image is necessary'],
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('ARTICLE', articleSchema);