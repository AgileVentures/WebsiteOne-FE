import axios from '../helpers/http'
import { GET_USERS } from '../types'

export let getUsers = users => ({ type: GET_USERS, payload: users })

export let fetchUsers = () => dispatch => {
  return axios
    .get('/api/v1/users')
    .then(response => {
      /* eslint-disable-next-line */
      let { users, gravatar_url, karma_total } = response.data
      users = users.map(user => {
        user.gravatar_url = gravatar_url[user.id]
        user.karma_total = karma_total[user.id]
        return user
      })
      dispatch(getUsers(users))
    })
}
