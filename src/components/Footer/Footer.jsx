import './Footer.css'
import React from 'react'

function Footer() {
    return (
        <footer className="container-fluid">
            <div className="row">
                <div className="col-12 Footer__copy" translate="no"> Todos los derechos reservados {new Date().getFullYear()} © Wellness TechGroup</div>
            </div>
        </footer>
    )
}

export default Footer