import React, { Component } from 'react'

// Component Imports
import ButtonList from '../../components/ButtonList/ButtonList'

// Style Imports
import '../../App.scss'

class NewAppointment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedAppointmentType: 'gp',
      availableSlots: [],
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

  render() {
    return (
      <div className="contentCard">
        <div className="header">
          <h2 className="h6">New Appointment</h2>
        </div>

        <div className="content">
          <div className="section">
            <span className="icon">
              <i className="fa fa-stethoscope"></i>
              <strong>Consultant Type</strong>
            </span>
            <ButtonList items={this.state.consultantTypes} />
          </div>

          <div className="section">
            <span className="icon">
              <i className="fa fa-clock-o"></i>
              <strong>Date & Time</strong>
            </span>
          </div>

          <div className="section">
            <span className="icon">
              <i className="fa fa-video-camera"></i>
              <strong>Appiontment Type</strong>
            </span>
          </div>

          <div className="section">
            <span className="icon">
              <i className="fa fa-comments-o"></i>
              <strong>Notes</strong>
            </span>
            <textarea style={{ width: '100%' }} />
          </div>
        </div>

        <div className="footer">
          <button className="button">Book</button>
        </div>
      </div>
    )
  }
}

export default NewAppointment
