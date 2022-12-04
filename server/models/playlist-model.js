const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        published: { type: Boolean, required: true },
        likes: { type: [{ liker: String }], required: true },
        dislikes: { type: [{ disliker: String }], required: true },
        listens: { type: Number, required: true },
        comments: { type: [{ commenter: String, comment: String }], required: true },
        publishedDate: { type: Date, required: false },
        username: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
