const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({

	name:{type:String},
    duration:{type:String}

	
});

const Content = mongoose.model("content", ContentSchema);
module.exports = Content;