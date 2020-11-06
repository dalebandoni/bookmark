import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeNote } from '../../actions/book'

const Note = styled.div`
  background: ${({ theme }) => theme.colors.mainVibrant};
  margin-top: 5rem;
  padding: 1rem;
  width: 80%;
  min-height: 10rem;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5rem;

  & .flex-item {
    display: flex;
    justify-content: space-between;
  }

  & .note-text {
    font-size: 2rem;
    padding-right: 2rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    overflow-wrap: break-word;
  }

  & .icon {
    font-size: 2rem;

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.warning};
    }
  }

  @media ${({ theme }) => theme.mediaQueries['below-480']} {
    width: 100%;
  }
`

const NoteItem = ({ note: { text, _id }, bookId, removeNote }) => {
  console.log(_id, bookId)
  return (
    <Note>
      <div className='flex-item'>
        <span className='note-text'>
          <em>{text}</em>
        </span>
        <span onClick={e => removeNote(bookId, _id)} className='delete-button'>
          <i className='fas fa-trash icon'></i>
        </span>
      </div>
    </Note>
  )
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  removeNote: PropTypes.func.isRequired,
}

export default connect(null, { removeNote })(NoteItem)
