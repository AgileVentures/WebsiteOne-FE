import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import users from '../reducers/usersReducer'
import loggedInUser from '../reducers/loggedInUserReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
console.log(loggedInUser)
const rootReducer = combineReducers({
  users,
  loggedInUser
})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
