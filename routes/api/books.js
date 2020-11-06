const { json } = require('express')
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Book = require('../../models/Book')

// Create a Book
// @route POST api/books
router.post(
  '/',
  [
    check('title', 'Title is required.').not().isEmpty(),
    check('author', 'Author is required.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, author, isbn, rating, progress, liked } = req.body

    const bookFields = {}

    if (title) bookFields.title = title
    if (author) bookFields.author = author
    if (isbn) bookFields.isbn = isbn
    if (rating) bookFields.rating = rating
    if (progress) bookFields.progress = progress
    if (liked) bookFields.liked = liked

    try {
      console.log(isbn)
      let book = await Book.findOne({ isbn: isbn })
      if (book) {
        book = await Book.findOneAndUpdate(
          { isbn: isbn },
          { $set: bookFields },
          { new: true }
        )
        console.log('BOOK! UPDATE')
        return res.json(book)
      }

      console.log('NO BOOK, MAKE A NEW ONE')
      book = new Book(bookFields)
      await book.save()
      return res.json({ msg: 'No book' })
    } catch (error) {
      console.log(error)
      return res.status(500).send('Server Error')
    }
  }
)

// Get all Books
// @route GET api/books

router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    return res.status(500).send('Server Error')
  }
})

// Get a book by Id
// @route GET api/books/:id

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ msg: 'Book not found.' })
    }
    res.json(book)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Book not found.' })
    }
    return res.status(500).send('Server Error')
  }
})

// Delete a Book
// @route DELETE api/books/:id

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ msg: 'Book not found.' })
    }
    await book.remove()

    res.json({ msg: 'Book removed.' })
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Book not found.' })
    }
    return res.status(500).send('Server Error')
  }
})

// Like Book and Unlike Book
// @route POST /api/books/like/:id

router.put('/like/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (book) {
      console.log(book)
      book.liked = !book.liked
    }

    await book.save()

    res.json(book)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

// Add Note to a book
// @route POST /api/books/notes/:id
router.post(
  '/notes/:id',
  check('text', 'Test is required.').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return restart.status(400).json({ errors: errors.array() })
    }

    try {
      const book = await Book.findById(req.params.id)

      const newNote = {
        text: req.body.text,
      }

      book.notes.unshift(newNote)

      await book.save()
      res.json(book.notes)
    } catch (error) {
      console.log(error)
      return res.status(500).send('Server Error')
    }
  }
)

// Delete Note from a book
// @route DELETE /api/books/notes/:id/:note_id
router.delete('/notes/:id/:note_id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    const note = book.notes.find(note => note.id === req.params.note_id)

    if (!note) {
      return res.status(404).json({ msg: 'Note does not exist.' })
    }

    const removeIndex = book.notes.indexOf(note)

    book.notes.splice(removeIndex, 1)

    await book.save()

    res.json(book.notes)
  } catch (error) {
    return res.status(500).send('Server Error')
  }
})

module.exports = router
