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
        <div className="navBar">
          <div className="navBarContent">
            <i className="fa fa-bars"></i>
            <img src={logo} className="appLogo" alt="Babylon Health" />
          </div>
        </div>
        <NewAppointment />
      </Fragment>
    )
  }
}

export default App
