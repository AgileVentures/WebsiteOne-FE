import React from 'react'
import {shallow} from 'enzyme';

import ThemingLayout from '../ThemingLayout';


describe('ThemingLayout', () => {
    it('should show the demo', () => {
        const component = shallow(<ThemingLayout/>)
        expect(component.find('span').text()).toBe("😉")
    })
})