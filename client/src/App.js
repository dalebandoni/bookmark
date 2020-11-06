import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import MainWrapper from './components/layout/MainWrapper'
import DashBoard from './components/dashboard/DashBoard'
import Book from './components/book/Book'
import NoteForm from './components/book/NoteForm'
import BookForm from './components/book/BookForm'
import EditBook from './components/book/EditBook'

// Redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <MainWrapper>
            <Switch>
              <Route exact path='/' component={DashBoard} />
              <Route exact path='/books/:id' component={Book} />
              <Route exact path='/books/:id' component={Book} />
              <Route exact path='/note-form/:id' component={NoteForm} />
              <Route exact path='/add-book' component={BookForm} />
              <Route exact path='/edit-book/:id' component={EditBook} />
            </Switch>
          </MainWrapper>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
