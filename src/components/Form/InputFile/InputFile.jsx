import './InputFile.css'
import React from 'react'

export default function InputFile({onChange, name, type, classStyle, label}) {
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="label">{label}</label>}
            <input
                onChange={onChange}
                name={name}
                type={type}
                className={`custom-file-input ${classStyle}`}
            />
        </div>
    )
}

