import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../common/Button';

describe('<Button />', () => {
  const submitHandler = jest.fn();
  const props = {
    name: 'stripe-button',
    value: 'Update Card Details',
    className: 'btn',
    onClick: submitHandler,
    disabled: false,
  };

  const wrapper = shallow(<Button {...props} />);

  it('should render without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should display the value', () => {
    expect(wrapper.find('.btn').text()).toBe('Update Card Details');
  });

  it('should have type attribute default value as button', () => {
    expect(wrapper.props()['type']).toBe('button');
  });

  it('should call onclick event handler when clicked', () => {
    wrapper.simulate('click')
    expect(submitHandler).toBeCalledTimes(1);
  });
});
