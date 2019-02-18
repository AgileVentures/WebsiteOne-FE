import axios from '../helpers/http'
import { GET_USER_INFO } from '../types'

export let fetchUserInfo = id => dispatch => {
  return axios.get(`/api/v1/users/${id}`).then(response => {
    /* eslint-disable-next-line */
    let {
      user,
      karmaTotal,
      gravatarUrl,
      bio,
      projects,
      contributions,
      videos,
      commitCountTotal,
      hangouts,
      authentications,
      profile,
      membershipLength,
      activity
    } = response.data
    user.bio = bio
    user.karmaTotal = karmaTotal
    user.gravatarUrl = gravatarUrl
    user.projects = projects
    user.contributions = contributions
    user.videos = videos
    user.commitCountTotal = commitCountTotal
    user.hangouts = hangouts
    user.authentications = authentications
    user.profile = profile
    user.membershipLength = membershipLength
    user.activity = activity
    dispatch({ type: GET_USER_INFO, payload: user })
  })
}
