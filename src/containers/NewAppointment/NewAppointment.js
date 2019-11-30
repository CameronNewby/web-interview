import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import { API_ENDPOINT } from '../../config'

// Component Imports
import ButtonList from '../../components/ButtonList/ButtonList'
import UserInfo from '../../components/UserInfo/UserInfo'

// Style Imports
import '../../App.scss'

class NewAppointment extends Component {
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
      consultantTypes: [
        'GP',
        'Specialist',
        'Nurse',
        'Therapist',
        'Triage Nurse',
        'Physio',
      ],
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
      let slotTime = moment(slot.time).format('MMM DD hh:mm')
      if (slotTime === time) {
        this.setState({ availableTypes: slot.appointmentType })
        return true
      }
      return false
    })
  }

  render() {
    let slotTimes = <p>No Times Available</p>

    if (this.state.availableSlots.length > 0) {
      slotTimes = (
        <ButtonList
          items={this.state.availableSlots.map(slot =>
            moment(slot.time).format('MMM DD hh:mm')
          )}
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
          <section>
            <span className="icon">
              <i className="fa fa-stethoscope"></i>
              <strong>Consultant Type</strong>
            </span>
            <ButtonList
              items={this.state.consultantTypes}
              clicked={this.onConsultantTypeClick}
            />
          </section>

          <section>
            <span className="icon">
              <i className="fa fa-clock-o"></i>
              <strong>Date & Time</strong>
            </span>
            {slotTimes}
          </section>

          <section>
            <span className="icon">
              <i className="fa fa-video-camera"></i>
              <strong>Appiontment Type</strong>
            </span>
            <ButtonList
              items={this.state.availableTypes}
              clicked={this.onAppointmentTypeClick}
            />
          </section>

          <section>
            <span className="icon">
              <i className="fa fa-comments-o"></i>
              <strong>Notes</strong>
            </span>
            <textarea style={{ width: '100%' }} />
          </section>
        </div>

        <div className="footer">
          <button className="button">Book</button>
        </div>
      </div>
    )
  }
}

export default NewAppointment
