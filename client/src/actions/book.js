import axios from 'axios'
import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  BOOK_ERROR,
  DELETE_BOOK,
  ADD_NOTE,
  REMOVE_NOTE,
  LIKE_BOOK,
  FILTER_FINISHED,
  FILTER_UNFINISHED,
  FILTER_LIKED,
} from './types'

export const getBooks = () => async dispatch => {
  try {
    const res = await axios.get('/api/books')

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const getBook = id => async dispatch => {
  try {
    const res = await axios.get(`/api/books/${id}`)

    dispatch({
      type: GET_BOOK,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const addBook = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(`/api/books/`, formData, config)

    dispatch({
      type: GET_BOOK,
      payload: res.data,
    })

    history.push('/')
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const deleteBook = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/books/${id}`)

    dispatch({
      type: DELETE_BOOK,
      payload: id,
    })
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const addNote = (bookId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(`/api/books/notes/${bookId}`, formData, config)

    dispatch({
      type: ADD_NOTE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const removeNote = (bookId, noteId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/books/notes/${bookId}/${noteId}`)

    dispatch({
      type: REMOVE_NOTE,
      payload: noteId,
    })
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const addLike = bookId => async dispatch => {
  try {
    const res = await axios.put(`/api/books/like/${bookId}`)

    dispatch({
      type: LIKE_BOOK,
      payload: { bookId, liked: res.data },
    })
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}
