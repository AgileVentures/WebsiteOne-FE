import { SELECTED_LANGUAGE, FILTERED_PROJECTS_STATE } from '../types'

export let selectedLanguageAction = selectedLanguage => {
  return {
    type: SELECTED_LANGUAGE,
    payload: selectedLanguage
  }
}

export let filteredProjectsAction = props => {
  return {
    type: FILTERED_PROJECTS_STATE,
    payload: props
  }
}
