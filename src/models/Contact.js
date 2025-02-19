const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    phones: {
        type: [String],
        required: [true, 'At least one phone number is required'],
        validate: {
            validator: function (phones) {
                return phones.every(phone => /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(phone));
            },
            message: 'Invalid phone number format. Expected formats: (XX) XXXX-XXXX or (XX) XXXXX-XXXX'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Contact', contactSchema);