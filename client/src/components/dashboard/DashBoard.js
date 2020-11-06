import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Books from '../books/Books'

const Filter = styled.section`
  width: 100%;
  margin: 10rem 0rem 7rem;
  display: flex;
  justify-content: center;
  align-content: center;

  & .filter-nav {
    list-style-type: none;
    display: flex;

    li {
      padding: 1rem 0;
      margin: 0 5rem;
      font-size: 1.4rem;
      border-bottom: 2px solid transparent;
      transition: border-bottom 200ms ease-in-out;

      &:hover {
        border-bottom: 2px solid ${({ theme }) => theme.colors.main};
        cursor: pointer;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQueries['below-480']} {
    justify-content: center;
    margin-top: 1rem;

    & .filter-nav {
      flex-direction: column;
      align-items: center;
      margin: 0;
      width: 100%;

      li {
        width: 100%;
        padding: 2rem 0;
        border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
        text-align: center;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
`

const DashBoard = ({ book: { books, loading } }) => {
  const [bookCollection, setBookCollection] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  useEffect(() => {
    setBookCollection(books)
    setFilteredBooks(bookCollection)
  }, [books, bookCollection])

  const filterFinished = bookCollection.filter(book => book.progress === true)
  const filterUnfinished = bookCollection.filter(
    book => book.progress === false
  )
  const filterFavourites = bookCollection.filter(book => book.liked === true)

  const showFinished = () => {
    setFilteredBooks(filterFinished)
  }

  const showUnfinished = () => {
    setFilteredBooks(filterUnfinished)
  }

  const showFavourites = () => {
    setFilteredBooks(filterFavourites)
  }

  return (
    <Fragment>
      <Filter>
        <ul className='filter-nav'>
          <li onClick={() => setFilteredBooks(bookCollection)}>All</li>
          <li onClick={() => showFinished()}>Finished</li>
          <li onClick={() => showUnfinished()}>Unfinished</li>
          <li onClick={() => showFavourites()}>Favourites</li>
        </ul>
      </Filter>
      {filteredBooks && <Books books={filteredBooks} loading={loading} />}
    </Fragment>
  )
}

DashBoard.propTypes = {
  book: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  book: state.book,
})

export default connect(mapStateToProps)(DashBoard)
