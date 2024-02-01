const express = require('express')
const router = express.Router()

const {createBook, readBooks, readBook, updateBook, deleteBook} = require('../controllers/bookController')

router.route('/').get(readBooks).post(createBook)
router.route('/:id').get(readBook).patch(updateBook).delete(deleteBook)

module.exports = router