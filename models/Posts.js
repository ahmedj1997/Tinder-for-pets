const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postDate: Date,
    postLocation: String,
    postContent: String,
    postImage: String,
    amountLikes: Number,
    amountDislikes: Number
})

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};

