import React, { Component, Fragment } from 'react'

import logo from './logo.png'

import './App.scss'

import NewAppointment from './containers/NewAppointment/NewAppointment'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedAppointmentType: 'gp',
      availableSlots: [],
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="app-header">
            <span className="icon">
              <i className="fa fa-bars"></i>
              <img src={logo} className="app-logo" alt="Babylon Health" />
            </span>
          </div>
        </div>
        <NewAppointment />
      </Fragment>
    )
  }
}

export default App
