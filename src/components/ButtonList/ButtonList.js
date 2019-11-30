import React from 'react'
import PropTypes from 'prop-types'

const buttonList = props => {
  return (
    <div>
      {props.items.map(button => (
        <button className="button" key={button}>
          {button}
        </button>
      ))}
    </div>
  )
}

buttonList.propTypes = {
  items: PropTypes.array,
}

export default buttonList
