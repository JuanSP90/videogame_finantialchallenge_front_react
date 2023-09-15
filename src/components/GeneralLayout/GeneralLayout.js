import React from 'react'
import NavGame from '../NavGame/NavGame'

const GeneralLayout = ({ children }) => {

  return (
    <div>
      <NavGame />
      {children}

    </div>
  )
}

export default GeneralLayout