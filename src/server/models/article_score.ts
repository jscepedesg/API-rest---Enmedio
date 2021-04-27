import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleScoreSchema = new Schema({
    article_id: {
        type: Schema.Types.ObjectId, 
        ref: 'ARTICLE', 
        required: true
    },
    customer_id: {
        type: Schema.Types.ObjectId, 
        ref: 'CUSTOMER', 
        required: true
    },
    score: {
        type: Number,
        required: [true, 'The score is necessary'],
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('ARTICLE_SCORE', articleScoreSchema);