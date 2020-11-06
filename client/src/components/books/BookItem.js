import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteBook, addLike } from '../../actions/book'
import StyleButton from '../../components/layout/StyleButton'

const StyledBookItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  height: 100%;
  padding: 2.5rem;
  margin: 5rem 0rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  & .book-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 75%;

    & .book-title {
      font-size: 4.5rem;
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.dark};
    }

    & .book-author {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.dark};
    }

    & .rating {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.colors.dark};
    }
  }

  & .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;

    & .delete {
      background: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.white};
      padding: 1rem 1.5rem;
      margin: 2rem 0;

      &:hover {
        cursor: pointer;
      }
    }

    & .like-button {
      margin: 2rem 0rem 4rem;
    }

    & .finished i {
      color: ${({ theme }) => theme.colors.success};
    }

    & .unfinished i {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  @media ${({ theme }) => theme.mediaQueries['below-480']} {
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    & .book-info {
      margin-bottom: 2rem;
      align-items: center;
      text-align: center;
      & .book-title {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      & .book-author {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
      & .rating {
        font-size: 1.5rem;
      }
    }
    & .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;

      & .delete {
        background: ${({ theme }) => theme.colors.danger};
        color: ${({ theme }) => theme.colors.white};
        padding: 1rem 1.5rem;
        margin: 2rem 0;
      }

      & .finished i {
        color: ${({ theme }) => theme.colors.success};
      }

      & .unfinished i {
        color: ${({ theme }) => theme.colors.danger};
      }
    }
  }
`

const BookItem = ({
  book: { _id, author, title, name, rating, progress, liked },
  books,
  deleteBook,
  addLike,
}) => {
  const [isLiked, setIsLiked] = useState(liked)

  return (
    <StyledBookItem>
      <div className='book-info'>
        <h2 className='book-title'>{title}</h2>
        <h3 className='book-author'>{author}</h3>
        <span className='rating'>
          {rating ? (
            <div>
              {rating} <i className='fas fa-star'></i>
            </div>
          ) : (
            'No Rating'
          )}
        </span>
      </div>

      <div className='buttons'>
        <div
          className='like-button'
          onClick={e => {
            addLike(_id)
            setIsLiked(!isLiked)
          }}
        >
          {books.length === 0 && (
            <StyleButton secondary className='view-book'>
              <span>{isLiked ? 'Liked' : 'Unliked'}</span>
            </StyleButton>
          )}
        </div>
        {books.length > 0 && (
          <Link className='link' to={`/books/${_id}`}>
            <StyleButton>
              <span className='view-book'>View Book</span>
            </StyleButton>
          </Link>
        )}
        {books.length === 0 && (
          <Link className='link' to={`/edit-book/${_id}`}>
            <StyleButton>
              <span className='view-book'>Edit Book</span>
            </StyleButton>
          </Link>
        )}
        <span
          onClick={e => {
            if (window.confirm('Are you sure you want to delete this book?')) {
              deleteBook(_id)
            } else {
              return
            }
          }}
          className='delete'
        >
          Delete Book <i className='fas fa-trash-alt'></i>
        </span>
        <span className='progress'>
          <em>
            {progress === true ? (
              <span className='finished'>
                Finished <i className='fas fa-check-circle'></i>{' '}
              </span>
            ) : (
              <span className='unfinished'>
                Unfinished <i className='fas fa-times-circle'></i>
              </span>
            )}
          </em>
        </span>
      </div>
    </StyledBookItem>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  books: state.book.books,
})

export default connect(mapStateToProps, { deleteBook, addLike })(BookItem)
