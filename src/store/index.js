import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import users from '../reducers/usersReducer'
import projects from '../reducers/projectsReducer'
import loggedInUser from '../reducers/loggedInUserReducer'
import signedUpUser from '../reducers/signedUpUserReducer'
import error from '../reducers/errorReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  users,
  projects,
  loggedInUser,
  signedUpUser,
  error
})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
