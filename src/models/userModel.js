const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, unique: true, trim: true
    },
    city: { type: String, required: true },
    mobile: { type: Number, unique: true },
    mediaurl: { type: String },
    ID:{type:String}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 