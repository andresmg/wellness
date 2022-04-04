import './InputWithLabel.css'
import React from 'react'

export default function InputWithLabel({value, name, onChange, onBlur, type, cssStyle, placeholder, label, tabIndex, disabled}) {



    return (
        <div className="form-group">
            {label &&
                <label className="label" htmlFor={name}>{label}</label>
            }

            <input
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                className={cssStyle}
                name={name}
                type={type}
                placeholder={placeholder}
                tabIndex={tabIndex}
                disabled = {disabled}
            />

            <div className="invalid-feedback">campo obligatorio</div>
        </div>
    )
}