import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './ButtonList.scss'

const ButtonList = props => {
  let buttons
  const [active, setActive] = useState(false)

  if (props.items) {
    buttons = props.items.map((button, idx) => (
      <button
        className={active === idx ? 'button selected' : 'button'}
        key={idx}
        onClick={event => {
          setActive(idx)
          props.clicked(event, button)
        }}
      >
        {button}
      </button>
    ))
  }

  return <div className="buttonList">{buttons}</div>
}

ButtonList.propTypes = {
  items: PropTypes.array.isRequired,
  clicked: PropTypes.func.isRequired,
}

export default ButtonList
