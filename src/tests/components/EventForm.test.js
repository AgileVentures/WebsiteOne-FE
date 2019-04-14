import React from 'react'
import { mount } from 'enzyme'
import EventForm from '../../components/EventForm'
import { StaticRouter } from 'react-router'

describe('EventForm', () => {
  let wrapper
  const context = {}
  beforeEach(() => {
    wrapper = mount(
      <StaticRouter context={context}>
        <EventForm />
      </StaticRouter>
    )
  })

  it('shows a DaysOfTheWeekSelect if the event is repeating', () => {
    wrapper = mount(
      <StaticRouter context={context}>
        <EventForm repeats={'weekly'} />
      </StaticRouter>
    )

    expect(wrapper.find('DaysOfTheWeekSelect')).toHaveLength(1)
  })

  it('shows the endDate select if the recurring event ends', () => {
    wrapper = mount(
      <StaticRouter context={context}>
        <EventForm repeats={'weekly'} repeatEnds={'on'} />
      </StaticRouter>
    )

    const endDateSelect = wrapper.find('DatePicker').filterWhere(item => {
      return item.prop('name') === 'endDate'
    })

    expect(endDateSelect).toHaveLength(1)
  })
})
