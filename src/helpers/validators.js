export const isValidUrl = value => {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return pattern.test(value)
}

export const validateProjectForm = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (values.repos) {
    const reposArrayErrors = []
    values.repos.forEach((repo, repoIndex) => {
      const repoErrors = {}
      if (!isValidUrl(repo)) {
        repoErrors.value = 'Must be a valid URL'
        reposArrayErrors[repoIndex] = repoErrors
      }
    })
    if (reposArrayErrors.length) {
      errors.repos = reposArrayErrors
    }
  }
  if (values.trackers) {
    const trackersArrayErrors = []
    values.trackers.forEach((tracker, trackerIndex) => {
      const trackerErrors = {}
      if (!isValidUrl(tracker)) {
        trackerErrors.value = 'Must be a valid URL'
        trackersArrayErrors[trackerIndex] = trackerErrors
      }
    })
    if (trackersArrayErrors.length) {
      errors.trackers = trackersArrayErrors
    }
  }
  return errors
}
