import React from 'react'
import PropTypes from 'prop-types'

import './UserInfo.scss'

const userInfo = props => {
  return (
    <span className="userInfo">
      <img src={props.avatar} alt="User Avatar" className="userAvatar" />
      <p>{props.firstName + ' ' + props.lastName}</p>
    </span>
  )
}

userInfo.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
}

export default userInfo
