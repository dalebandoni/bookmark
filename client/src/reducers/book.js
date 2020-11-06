import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  ADD_NOTE,
  REMOVE_NOTE,
  LIKE_BOOK,
} from '../actions/types'

const initialState = {
  books: [],
  book: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [payload, ...state.books],
        loading: false,
      }
    case GET_BOOKS:
      return {
        ...state,
        books: payload,
        book: null,
        loading: false,
      }
    case GET_BOOK:
    case UPDATE_BOOK:
      return {
        ...state,
        book: payload,
        books: [],
        loading: false,
      }
    case LIKE_BOOK:
      return {
        ...state,
        book: { ...state.book, liked: payload.liked },
        loading: false,
      }
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== payload),
      }
    case ADD_NOTE:
      return {
        ...state,
        book: { ...state.book, notes: payload },
      }
    case REMOVE_NOTE:
      return {
        ...state,
        book: {
          ...state.book,
          notes: state.book.notes.filter(note => note._id !== payload),
        },
        loading: false,
      }
    default:
      return state
  }
}
