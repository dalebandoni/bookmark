import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import StyleButton from '../../components/layout/StyleButton'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { addBook, getBook } from '../../actions/book'

const StyledForm = styled.section`
  margin-top: 10rem;

  & .title {
    font-size: 5rem;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  & .title-sub {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.textGrey};
  }

  & .form {
    margin-top: 5rem;
  }

  & .form-label {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  & .form-input {
    margin-bottom: 1rem;
    padding: 1.5rem 1rem;
    width: 30rem;
    border: 1px solid ${({ theme }) => theme.colors.main};
  }

  & .drop-down {
    width: 15rem;
    text-align: right;
  }

  & .checkbox {
    width: 30rem;
    margin-top: 2rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;

    & .box {
      height: 40px;
      width: 40px;
      text-align: center;
      margin-left: 2rem;
    }
  }

  & .btn-submit {
    padding: 1rem 1.5rem;
    border: none;
    display: block;
    margin: 2rem 0;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.mainVibrant};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    letter-spacing: 1;
    transition: background 200ms ease-in-out;

    & .link {
      text-decoration: none;
    }

    &:hover {
      cursor: pointer;
    }
  }
`

const EditBook = ({
  addBook,
  getBook,
  history,
  book: { book, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    rating: '',
    progress: false,
  })

  useEffect(() => {
    console.log('running...')
    getBook(match.params.id)

    setFormData({
      title: loading || !book.title ? '' : book.title,
      author: loading || !book.author ? '' : book.author,
      isbn: loading || !book.isbn ? '' : book.isbn,
      rating: loading || !book.rating ? '' : book.rating,
      progress: loading || !book.progress ? false : book.progress,
    })
  }, [loading, getBook])

  const { title, author, isbn, rating, progress } = formData
  console.log(formData)
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return loading || book === null ? (
    <Spinner />
  ) : (
    <StyledForm>
      <h3 className='title'>Edit Book </h3>
      <span className='title-sub'>({book.title})</span>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault()
          addBook(formData, history)
        }}
      >
        <div className='form-group'>
          <label className='form-label' htmlFor='title'>
            * Title
          </label>
          <input
            className='form-input'
            type='text'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            placeholder='Enter Book Title'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='author'>
            * Author
          </label>
          <input
            className='form-input'
            type='text'
            name='author'
            value={author}
            onChange={e => onChange(e)}
            placeholder='Enter Author Name'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='isbn'>
            * ISBN
          </label>
          <input
            className='form-input'
            type='text'
            name='isbn'
            value={isbn}
            onChange={e => onChange(e)}
            placeholder='Enter ISBN'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='rating'>
            Your Rating (1-5)
          </label>
          <select
            value={rating}
            onChange={e => onChange(e)}
            name='rating'
            className='drop-down'
            htmlFor='rating'
          >
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <div className='form-group'>
          <p className='checkbox'>
            Mark Book As Finished{' '}
            <input
              className='box'
              type='checkbox'
              name='finished'
              checked={progress}
              value={progress}
              onChange={e => {
                setFormData({ ...formData, progress: !progress })
              }}
            />
          </p>
        </div>
        <input type='submit' className='btn-submit' value='Submit' />
      </form>
      <Link className='link' to={`/books/${book._id}`}>
        <StyleButton>Go Back</StyleButton>
      </Link>
    </StyledForm>
  )
}

EditBook.propTypes = {
  addBook: PropTypes.func.isRequired,
  getBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  book: state.book,
})

export default connect(mapStateToProps, { addBook, getBook })(EditBook)
