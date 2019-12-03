import React from 'react'
import PropTypes from 'prop-types'

import './UserInfo.scss'

const UserInfo = props => {
  return (
    <span className="userInfo">
      <img src={props.avatar} alt="User Avatar" className="userAvatar" />
      <strong>{props.firstName + ' ' + props.lastName}</strong>
    </span>
  )
}

UserInfo.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
}

export default UserInfo
