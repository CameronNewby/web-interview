import React from 'react'
import PropTypes from 'prop-types'

import './Section.scss'

const Section = props => {
  return (
    <section>
      <div className="icon">
        <i className={props.icon}></i>
      </div>
      <div className="body">
        <div className="title">
          <b>{props.title}</b>
        </div>
        {props.children}
      </div>
    </section>
  )
}

Section.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Section
