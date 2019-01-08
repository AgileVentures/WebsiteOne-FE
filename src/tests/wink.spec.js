import React from 'react'
import {shallow} from 'enzyme';

import {Wink} from '../Wink';


describe('Wink', () => {
    it('should wink', () => {
        const component = shallow(<Wink/>)
        expect(component.find('span').text()).toBe("😉")
    })
})