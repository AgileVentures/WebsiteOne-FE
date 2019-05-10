import React from 'react'
import { shallow } from 'enzyme'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Footer, { LinksList } from '../../components/Footer'

describe('Footer', () => {
  let wrapper

  describe('Footer component', () => {
    beforeEach(() => {
      wrapper = shallow(<Footer />)
    })

    it('contains a div with class footer', () => {
      expect(wrapper.find('div.footer').length).toEqual(1)
    })

    it('contains three LinkList components', () => {
      expect(wrapper.find(LinksList).length).toEqual(3)
    })

    it('contains two content divs', () => {
      expect(wrapper.find('div.content').length).toEqual(2)
    })

    it('contains a mailto link', () => {
      expect(wrapper.contains(<a href='mailto:info@agileventures.org'>info@agileventures.org</a>)).toEqual(true)
    })
  })

  describe('LinksList component', () => {
    let wrapper

    const props = [
      { text: 'Text 1', href: '/href1' },
      { text: 'Text 2', href: '/href2' },
      { text: 'Text 3', href: '/href3' }
    ]
    beforeEach(() => {
      wrapper = shallow(<LinksList links={props} />)
    })

    it('renders a List', () => {
      expect(wrapper.find(List).length).toEqual(1)
    })

    it('renders the links', () => {
      expect(wrapper.find(Link).length).toEqual(props.length)
    })

    it('renders the correct text and href for each internal link', () => {
      const links = wrapper.find(Link)

      for (let i = 0; i < links.length; i++) {
        expect(links.at(i).prop('to')).toEqual(props[i].href)
        expect(links.at(i).contains(props[i].text)).toEqual(true)
      }
    })

    it('renders the correct link for external urls', () => {
      const props = [
        { text: 'Text 1', href: 'http://www.test.1' },
        { text: 'Text 2', href: 'http://www.test.2' },
        { text: 'Text 3', href: 'http://www.test.3' }
      ]
      wrapper = shallow(<LinksList links={props} />)
      for (let i = 1; i < 4; i++) {
        const url = 'http://www.test.' + i
        expect(wrapper.contains(<a href={url} target='_blank' rel='noreferrer'>Text {i}</a>)).toEqual(true)
      }
    })
  })
})
