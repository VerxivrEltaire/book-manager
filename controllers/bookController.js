const {StatusCodes} = require('http-status-codes')
const Book = require('../models/Book')

const createBook = async (req, res) => {
    const book = await Book.create(req.body)
    res.status(StatusCodes.CREATED).json({ book })
}

const readBooks = async (req, res) => {
    const books = await Book.find({})
    res.status(StatusCodes.OK).json({ books, nbHits: books.length })
}

const readBook = async (req, res) => {
    const { id: bookId } = req.params
    const book = await Book.findOne({ _id: bookId })
    if (!book) {
        throw new Error(`No book with id : ${bookId}`)
    }

    res.status(200).json({ book })
}

const updateBook = async (req, res) => {
    const { id: bookId } = req.params

    const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!book) {
        throw new Error(`No book with id : ${bookId}`)
    }

    res.status(200).json({ book })
}

const deleteBook = async (req, res) => {
    const { id: bookId } = req.params
    const book = await Book.findOneAndDelete({ _id: bookId })
    if (!book) {
        throw new Error(`No book with id : ${bookId}`)
    }
    res.status(200).json({ book })
}

module.exports ={ createBook, readBooks, readBook, updateBook, deleteBook }