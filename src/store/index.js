import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
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
import historyReducer from '../reducers/historyReducer'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer=  combineReducers({
  router: connectRouter(history),
  users,
  projects,
  loggedInUser,
  signedUpUser,
  error,
  lastLocation,
  userInfo,
  projectInfo,
  events,
  eventInfo,
  historyReducer
  
})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
)
