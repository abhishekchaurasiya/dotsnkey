const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    language: [{
        type: String,
        required: true,
        trim: true,
    }],
    active: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model("Customer", customerSchema)