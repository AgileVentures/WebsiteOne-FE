import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import users from '../reducers/usersReducer'
import loggedInUser from '../reducers/loggedInUserReducer'
import signedUpUser from '../reducers/signedUpUserReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  users,
  loggedInUser,
  signedUpUser
})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
