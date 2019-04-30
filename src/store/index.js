import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import users from '../reducers/usersReducer'
import projects from '../reducers/projectsReducer'
import loggedInUser from '../reducers/loggedInUserReducer'
import signedUpUser from '../reducers/signedUpUserReducer'
import error from '../reducers/errorReducer'
import lastLocation from '../reducers/lastLocationReducer'
import userInfo from '../reducers/userInfoReducer'
import projectInfo from '../reducers/projectInfoReducer'
import events from '../reducers/eventsReducer'
import eventInfo from '../reducers/eventInfoReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  form: formReducer,
  users,
  projects,
  loggedInUser,
  signedUpUser,
  error,
  lastLocation,
  userInfo,
  projectInfo,
  events,
  eventInfo
})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
