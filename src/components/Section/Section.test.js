import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Section from './Section'

configure({ adapter: new Adapter() })

describe('Section', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Section />)
  })

  it('should render section', () => {
    expect(wrapper.find('section')).toHaveLength(1)
  })

  it('should render section with icon', () => {
    wrapper.setProps({ icon: 'fa' })
    expect(wrapper.find('.fa')).toHaveLength(1)
  })

  it('should render section with title', () => {
    wrapper.setProps({ title: 'a title' })
    expect(wrapper.find('.title').text()).toBe('a title')
  })
})
