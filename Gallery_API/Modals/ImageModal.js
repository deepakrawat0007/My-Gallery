const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    label: { type: String, required: true},
    image: { type: String},
    user:{type: mongoose.Types.ObjectId,ref:"users"}
},{timestamps:true});

const Image = mongoose.model("Images" , ImageSchema);

module.exports = Image;