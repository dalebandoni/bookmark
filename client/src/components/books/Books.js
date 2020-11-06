import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import BookItem from './BookItem'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { getBooks } from '../../actions/book'

const BookList = styled.section`
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries['below-480']} {
    width: 90%;
    margin: 0 auto;
  }
`

const Books = ({ books, loading, getBooks }) => {
  useEffect(() => {
    getBooks()
  }, [getBooks])

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {books.length > 0 ? (
        <BookList>
          {books.map(book => (
            <BookItem key={book._id} book={book} />
          ))}
        </BookList>
      ) : (
        <h2>No books found.</h2>
      )}
    </Fragment>
  )
}

Books.propTypes = {
  getBooks: PropTypes.func.isRequired,
}

export default connect(null, { getBooks })(Books)
