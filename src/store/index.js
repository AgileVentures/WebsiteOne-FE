import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import users from '../reducers/usersReducer'
import projects from '../reducers/projectsReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  users,
  projects
})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
