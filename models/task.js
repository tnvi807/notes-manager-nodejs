
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongoseenote`)

const noteSchema = mongoose.Schema({
    task:"string",
    describtion:"string"
})

module.exports = mongoose.model("note", noteSchema);
