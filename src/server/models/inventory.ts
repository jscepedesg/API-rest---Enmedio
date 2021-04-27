import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let inventorySchema = new Schema({
    article_id: {
        type: Schema.Types.ObjectId, 
        ref: 'ARTICLE', 
        required: true
    },
    quantity: {
        type: Number,
        required: [true, 'The quantity is necessary'],
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('INVENTORY', inventorySchema);