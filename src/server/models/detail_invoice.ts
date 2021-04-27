import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let detailInvoiceSchema = new Schema({
    article_id: {
        type: Schema.Types.ObjectId, 
        ref: 'ARTICLE', 
        required: true
    },
    invoice_id: {
        type: Schema.Types.ObjectId, 
        ref: 'INVOICE', 
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

export default mongoose.model('DETAIL_INVOICE', detailInvoiceSchema);