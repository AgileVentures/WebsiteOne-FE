import { SELECTED_LANGUAGE, FILTERED_PROJECTS_STATE } from '../types'

export let selectedlanguage = selectedLanguage => {
  return {
    type: SELECTED_LANGUAGE,
    payload: selectedLanguage
  }
}

export let filteredprojects = props => {
  return {
    type: FILTERED_PROJECTS_STATE,
    payload: props
  }
}
