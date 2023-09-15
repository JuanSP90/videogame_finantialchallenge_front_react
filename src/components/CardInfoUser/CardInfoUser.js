import './CardInfoUser.css'
import React from 'react'

const CardInfoUser = (props) => {
    return (
        <div className="carta">
            <h3 className="titulo">{props.title}</h3>
            {/* aqui ponemos el nombre balance */}
            <p className="value">{props.value}</p>
            {/* aqui ponemos pues el valor de lo q pognamos */}
            <p>Mostrar RealStates</p>aqui poner el TRANSITION GROW
        </div>
    )
}

export default CardInfoUser