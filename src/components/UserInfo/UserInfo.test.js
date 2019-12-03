import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import UserInfo from './UserInfo'

configure({ adapter: new Adapter() })

describe('UserInfo', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<UserInfo />)
  })

  it('should render section', () => {
    expect(wrapper.find('.userInfo')).toHaveLength(1)
  })

  it('should set img src', () => {
    wrapper.setProps({ avatar: 'http://src' })
    expect(
      wrapper
        .find('.userAvatar')
        .filterWhere(item => item.prop('src') === 'http://src')
    ).toHaveLength(1)
  })

  it('should name of just first', () => {
    wrapper.setProps({ firstName: 'John' })
    expect(wrapper.find('strong').text()).toMatch(/John/)
  })

  it('should concat first and last names', () => {
    wrapper.setProps({ firstName: 'John', lastName: 'Doe' })
    expect(wrapper.find('strong').text()).toMatch(/John Doe/)
  })
})
