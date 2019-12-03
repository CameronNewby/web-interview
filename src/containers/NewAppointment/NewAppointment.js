import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import { API_ENDPOINT } from '../../config'

// Component Imports
import ButtonList from '../../components/ButtonList/ButtonList'
import UserInfo from '../../components/UserInfo/UserInfo'
import Section from '../../components/Section/Section'

// Style Imports
import './NewAppointment.scss'
import '../../App.scss'

export class NewAppointment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      user: {},
      selectedConsultantType: '',
      selectedAppointmentDateTime: '',
      selectedAppointmentType: '',
      availableSlots: [],
      availableTypes: [],
      slots: [],
      consultantTypes: ['GP', 'Specialist', 'Nurse', 'Therapist', 'Physio'],
    }
  }

  // Lifecycle Hooks
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedConsultantType !== this.state.selectedConsultantType
    ) {
      this.getAppiontments()
    }
    if (
      prevState.selectedAppointmentDateTime !==
      this.state.selectedAppointmentDateTime
    ) {
      this.getAppointmentType()
    }
  }

  async componentDidMount() {
    try {
      const userResponse = await axios.get(
        `${API_ENDPOINT}/users/${this.state.userId}`
      )
      const slotsResponse = await axios.get(`${API_ENDPOINT}/availableSlots`)
      this.setState({
        user: userResponse.data,
        slots: slotsResponse.data,
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Event Handlers
  onConsultantTypeClick = (e, type) => {
    if (this.state.selectedConsultantType !== type) {
      this.setState({ selectedConsultantType: type.toLowerCase() })
    }
  }

  onAppointmentTimeClick = (e, datetime) => {
    this.setState({ selectedAppointmentDateTime: datetime })
  }

  onAppointmentTypeClick = (e, type) => {
    if (this.state.selectedAppointmentType !== type) {
      this.setState({ selectedAppointmentType: type })
    }
  }

  onNotesChange = e => {
    this.setState({ notes: e.target.value })
  }

  onBookClick = async e => {
    const data = {
      userId: this.state.userId,
      dateTime: this.state.selectedAppointmentDateTime,
      type: this.state.selectedConsultantType,
      notes: this.state.notes,
    }
    try {
      await axios.post(`${API_ENDPOINT}/appointments`, data)
    } catch (err) {
      console.error(err)
    }
  }

  // Methods
  getAppiontments = () => {
    const type = this.state.selectedConsultantType
    let availableSlots = []
    this.state.slots.forEach(slot => {
      if (slot.consultantType.indexOf(type) > -1) {
        availableSlots.push(slot)
      }
    })
    this.setState({ availableSlots: availableSlots })
  }

  getAppointmentType = () => {
    const time = this.state.selectedAppointmentDateTime
    this.state.slots.some(slot => {
      let slotTime = moment(slot.time).format('MMM Do HH:mm')
      if (slotTime === time) {
        this.setState({ availableTypes: slot.appointmentType })
        return true
      }
      return false
    })
  }

  render() {
    let slotTimes = <p className="">No Times Available</p>

    if (this.state.availableSlots.length > 0) {
      slotTimes = (
        <ButtonList
          items={this.state.availableSlots
            .sort((a, b) => moment(a.time).diff(b.time))
            .map(slot => moment(slot.time).format('MMM Do HH:mm'))}
          clicked={this.onAppointmentTimeClick}
        />
      )
    }

    return (
      <div className="contentCard">
        <div className="header">
          <h2 className="h6">New Appointment</h2>
          <UserInfo
            avatar={this.state.user.avatar}
            firstName={this.state.user.firstName}
            lastName={this.state.user.lastName}
          />
        </div>

        <div className="content">
          <Section icon="fa fa-stethoscope" title="Consultant Type">
            <ButtonList
              items={this.state.consultantTypes}
              clicked={this.onConsultantTypeClick}
            />
          </Section>

          <Section icon="fa fa-clock-o" title="Date & Time">
            {slotTimes}
          </Section>

          <Section icon="fa fa-video-camera" title="Appiontment Type">
            <ButtonList
              items={this.state.availableTypes}
              clicked={this.onAppointmentTypeClick}
            />
          </Section>

          <Section icon="fa fa-comments-o" title="Notes">
            <textarea
              className="notes"
              rows="5"
              placeholder="Describe your symptoms"
              onChange={this.onNotesChange}
            />
          </Section>
        </div>

        <div className="footer">
          <button className="button" onClick={this.onBookClick}>
            Book
          </button>
        </div>
      </div>
    )
  }
}

export default NewAppointment
