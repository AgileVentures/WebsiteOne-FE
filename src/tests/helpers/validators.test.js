import { isValidUrl, validateProjectForm } from '../../helpers/validators'

describe('validators', () => {
  describe('isValidUrl', () => {
    it('validates a valid url', () => {
      const url = 'https://www.test.com'
      expect(isValidUrl(url)).toEqual(true)
    })
    it('does not validate an invalid url', () => {
      const url = 'invalid'
      expect(isValidUrl(url)).toEqual(false)
    })
  })
  describe('validateProjectForm', () => {
    it('returns no errors with a valid form', () => {
      const values = {
        title: 'test',
        description: 'some'
      }
      expect(validateProjectForm(values)).toEqual({})
    })
    it('returns the correct error with an invalid form', () => {
      expect(validateProjectForm({})).toEqual({
        title: 'Required',
        description: 'Required'
      })
    })
    it('returns the correct error with an invalid url for a repo', () => {
      const values = {
        title: 'test',
        description: 'some',
        repos: ['fake']
      }
      expect(validateProjectForm(values)).toEqual({
        repos: [{
          value: 'Must be a valid URL'
        }]
      })
    })
    it('returns the correct error with an invalid url for a tracker', () => {
      const values = {
        title: 'test',
        description: 'some',
        trackers: ['fake']
      }
      expect(validateProjectForm(values)).toEqual({
        trackers: [{
          value: 'Must be a valid URL'
        }]
      })
    })
  })
})
