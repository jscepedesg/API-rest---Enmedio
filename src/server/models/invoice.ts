import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let invoiceSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId, 
        ref: 'CUSTOMER', 
        required: true
    },
    date: {
        type: Date,
        required: [true, 'The date is necessary'],
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('INVOICE', invoiceSchema);