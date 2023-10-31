const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    mssv: {
        type: Number,
        require: true,
    },
    mess: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Blog', blogSchema);