import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let customerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'The firstname is necessary']
    },
    lastname: {
        type: String,
        required: [true, 'The lastname is necessary']
    },
    phone: {
        type: String,
        required: [true, 'The phone is necessary']
    },
    email: {
        type: String,
        required: [true, 'The email is necessary'],
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('CUSTOMER', customerSchema);