import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import StyleButton from '../../components/layout/StyleButton'
import PropTypes from 'prop-types'
import { addNote, getBook } from '../../actions/book'
import Spinner from '../layout/Spinner'

const StyledForm = styled.section`
  margin-top: 10rem;

  & .title {
    font-size: 5rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.dark};
  }

  & .title-sub {
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.dark};
  }

  & .form {
    margin-top: 5rem;
  }

  & .form-label {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  & .form-input {
    margin-bottom: 1rem;
    border: none;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
    width: 50rem;
    height: 10rem;
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

  @media ${({ theme }) => theme.mediaQueries['below-480']} {
    & .form-input {
      width: 100%;
    }
  }
`

const NoteForm = ({ book: { book, loading }, addNote, getBook, match }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    getBook(match.params.id)
  }, [getBook])

  return loading || book === null ? (
    <Spinner />
  ) : (
    <StyledForm>
      <h3 className='title'>
        Add a Note <span className='title-sub'>({book.title})</span>
      </h3>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault()
          addNote(book._id, { text })
          setText('')
        }}
      >
        <label className='form-label' htmlFor='text'>
          Note
        </label>
        <textarea
          className='form-input'
          type='text'
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Create a note...'
        />
        <input type='submit' className='btn-submit' value='Submit' />
      </form>
      <Link className='link' to={`/books/${book._id}`}>
        <StyleButton>Go Back</StyleButton>
      </Link>
    </StyledForm>
  )
}

NoteForm.propTypes = {
  book: PropTypes.object.isRequired,
  addNote: PropTypes.func.isRequired,
  getBook: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  book: state.book,
})

export default connect(mapStateToProps, { addNote, getBook })(NoteForm)
