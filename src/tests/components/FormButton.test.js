import React from 'react'
import { shallow } from 'enzyme'
import FormButton from '../../components/FormButton'

describe('<FormButton /> ', () => {
  let wrapper

  describe('SumbitButton', () => {
    beforeEach(() => {
      const props = {
        type: 'submit',
        buttonText: 'Save'
      }
      wrapper = shallow(<FormButton {...props} />)
    })

    it('contains button with class event-save-button', () => {
      expect(wrapper.find('Button').hasClass('event-save-button')).toBe(true)
    })
    it('contains button with value Save', () => {
      expect(wrapper.find('Button').text()).toEqual('Save')
    })
  })

  describe('CancelButton', () => {
    beforeEach(() => {
      const props = {
        type: 'cancel',
        buttonText: 'Cancel'
      }
      wrapper = shallow(<FormButton {...props} />)
    })

    it('contains button with class event-cancel-button', () => {
      expect(wrapper.find('Button').hasClass('event-cancel-button')).toBe(true)
    })
    it('contains button with value Cancel', () => {
      console.log(wrapper.debug())
      expect(wrapper.find('Button').text()).toEqual('Cancel')
    })
  })
})
