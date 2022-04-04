import './FormButton.css'
import React from 'react'

export default function Button({type, cssStyle, disabled, children}) {
    return (
        <button
            type={type}
            className={cssStyle}
            disabled={disabled}
        >
            {children}
        </button>
    )
}