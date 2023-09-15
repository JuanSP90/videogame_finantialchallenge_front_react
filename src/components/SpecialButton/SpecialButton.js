import React from 'react'

const SpecialButton = (props) => {
    return (
        <button
            id="SpecialButton"
            onClick={props.onclick}
        ><span></span>
            <span></span>
            <span></span>
            <span></span>
            Visitar sus casas</button>
    )
}

export default SpecialButton