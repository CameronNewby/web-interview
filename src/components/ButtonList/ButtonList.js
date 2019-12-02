import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './ButtonList.scss'

const ButtonList = props => {
  const [active, setActive] = useState(false)

  return (
    <div className="buttonList">
      {props.items.map((button, idx) => (
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
      ))}
    </div>
  )
}

ButtonList.propTypes = {
  items: PropTypes.array,
  clicked: PropTypes.func,
}

export default ButtonList
