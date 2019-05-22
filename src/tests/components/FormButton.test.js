import React from 'react'
import { shallow } from 'enzyme'
import FormButton from '../../components/FormButton'

describe('<FormButton /> ', () => {
  let wrapper

  describe('SumbitButton', () => {
    beforeEach(() => {
      const props = {
        type: 'secondary',
        buttonText: 'Save',
        className: 'event-save-button'
      }
      wrapper = shallow(<FormButton {...props} />)
    })

    it('contains button with class event-save-button', () => {
      expect(wrapper.find('Button').hasClass('event-save-button')).toBe(true)
    })
    it('contains button with value Save', () => {
      expect(wrapper.find('Button').render().text()).toEqual('Save')
    })
    it('contains secondary attribute', () => {
      expect(wrapper.find('Button').prop('secondary')).toBe(true)
    })
  })

  describe('CancelButton', () => {
    const props = {
      type: 'primary',
      buttonText: 'Cancel',
      className: 'event-cancel-button'
    }
    beforeEach(() => {
      wrapper = shallow(<FormButton {...props} />)
    })

    it('contains button with class event-cancel-button', () => {
      expect(wrapper.find('Button').hasClass('event-cancel-button')).toBe(true)
    })
    it('contains button with value Cancel', () => {
      expect(wrapper.find('Button').render().text()).toEqual('Cancel')
    })
    it('contains primary attribute', () => {
      expect(wrapper.find('Button').prop('primary')).toBe(true)
    })
  })
})
