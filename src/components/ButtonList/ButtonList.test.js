import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ButtonList from './ButtonList'

configure({ adapter: new Adapter() })

describe('ButtonList', () => {
  let wrapper, mockOnClick

  beforeEach(() => {
    wrapper = shallow(<ButtonList />)

    mockOnClick = jest.fn().mockReturnValue('clicked')
  })

  it('should render no buttons', () => {
    expect(wrapper.find('button')).toHaveLength(0)
  })

  it('should render 3 buttons in list', () => {
    wrapper.setProps({ items: [1, 2, 3] })
    expect(wrapper.find('button')).toHaveLength(3)
  })

  it('uses passed in clicked prop onClick', () => {
    wrapper.setProps({ items: [1], clicked: mockOnClick })
    wrapper
      .find('button')
      .at(0)
      .simulate('click')
    expect(mockOnClick).toHaveBeenCalled()
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
