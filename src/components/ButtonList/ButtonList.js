import React from 'react'
import PropTypes from 'prop-types'

const buttonList = props => {
  return (
    <div>
      {props.items.map(button => (
        <button
          className="button"
          key={button}
          onClick={event => props.clicked(event, button)}
        >
          {button}
        </button>
      ))}
    </div>
  )
}

buttonList.propTypes = {
  items: PropTypes.array,
  clicked: PropTypes.func,
}

export default buttonList
