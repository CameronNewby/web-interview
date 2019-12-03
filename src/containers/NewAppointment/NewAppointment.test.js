import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import moment from 'moment'

import { NewAppointment } from './NewAppointment'

configure({ adapter: new Adapter() })

describe('New Appointment', () => {
  let wrapper, mock, postSpy

  mock = new MockAdapter(axios)

  beforeEach(() => {
    // Setup axios mocks
    mock.onGet('http://localhost:3010/users/1').reply(200, {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'http:some_avatar.jpg',
    })

    mock.onGet('http://localhost:3010/availableSlots').reply(200, [
      {
        id: 1,
        consultantType: ['gp'],
        appointmentType: ['audio', 'video'],
        time: '2019-11-27T10:11:00.000Z',
      },
      {
        id: 2,
        consultantType: ['specialist', 'gp'],
        appointmentType: ['audio'],
        time: '2019-12-01T14:16:30.000Z',
      },
    ])

    mock.onPost('http://localhost:3010/appointments').reply(200)

    postSpy = jest.spyOn(axios, 'post')

    wrapper = shallow(<NewAppointment />)

    // Spy on the event handlers
    jest.spyOn(wrapper.instance(), 'onConsultantTypeClick')
    jest.spyOn(wrapper.instance(), 'onAppointmentTimeClick')
    jest.spyOn(wrapper.instance(), 'onAppointmentTypeClick')
    jest.spyOn(wrapper.instance(), 'onNotesChange')
    jest.spyOn(wrapper.instance(), 'onBookClick')

    // Spy on the methods
    jest.spyOn(wrapper.instance(), 'getAppiontments')
    jest.spyOn(wrapper.instance(), 'getAppointmentType')
  })

  it('component mounts and sets users state', async () => {
    await wrapper.instance().componentDidMount()
    expect(wrapper.state()).toHaveProperty('user', {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'http:some_avatar.jpg',
    })

    expect(wrapper.state('slots')).toHaveLength(2)
  })

  it('should filter slots by consiultant type to give available slots', async () => {
    await wrapper.instance().componentDidMount()

    // Simulate consultant type select click
    wrapper.instance().onConsultantTypeClick({}, 'Specialist')
    expect(wrapper.state('selectedConsultantType')).toBe('specialist')
    expect(wrapper.instance().getAppiontments.mock.calls).toHaveLength(1)
    expect(wrapper.state('availableSlots')).toHaveLength(1)
  })

  it('should set date time and then get appointment types', async () => {
    await wrapper.instance().componentDidMount()

    // Simulate appiontment type select click
    wrapper
      .instance()
      .onAppointmentTimeClick(
        {},
        moment('2019-12-01T14:16:30').format('MMM Do HH:mm')
      )
    expect(wrapper.state('selectedAppointmentDateTime')).toBe('Dec 1st 14:16')
    expect(wrapper.instance().getAppointmentType.mock.calls).toHaveLength(1)
    expect(wrapper.state()).toHaveProperty('availableTypes', ['audio'])
  })

  it('should set the appointment type on click', async () => {
    await wrapper.instance().componentDidMount()

    // Simulate appiontment type select click
    wrapper.instance().onAppointmentTypeClick({}, 'audio')
    expect(wrapper.state('selectedAppointmentType')).toBe('audio')
  })

  it('should set the notes on each change', async () => {
    await wrapper.instance().componentDidMount()

    // Simulate on change of textfeild
    wrapper.instance().onNotesChange({ target: { value: 'note' } })
    expect(wrapper.state('notes')).toBe('note')
  })

  it('should send post request on book button click', async () => {
    await wrapper.instance().componentDidMount()

    // Simulate book button click
    wrapper.instance().onBookClick({})
    expect(postSpy).toHaveBeenCalledTimes(1)
  })
})
