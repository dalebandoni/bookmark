import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import BookItem from '../books/BookItem'
import { getBook } from '../../actions/book'
import StyleButton from '../layout/StyleButton'
import NoteItem from './NoteItem'

const Book = ({ getBook, book: { book, loading }, match }) => {
  useEffect(() => {
    getBook(match.params.id)
  }, [getBook])

  return loading || book === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <BookItem book={book} />
      <Link className='link' to='/'>
        <StyleButton inline>Back To Books</StyleButton>
      </Link>
      <Link className='link' to={`/note-form/${book._id}`}>
        <StyleButton secondary>Add Note</StyleButton>
      </Link>
      {book.notes.map(note => {
        return <NoteItem key={note._id} note={note} bookId={book._id} />
      })}
    </Fragment>
  )
}

Book.propTypes = {
  getBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  book: state.book,
})

export default connect(mapStateToProps, { getBook })(Book)
