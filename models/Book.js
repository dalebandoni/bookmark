const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
  },
  rating: {
    type: Number,
  },
  progress: {
    type: Boolean,
    default: false,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  notes: [
    {
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

module.exports = Book = mongoose.model('book', BookSchema)
