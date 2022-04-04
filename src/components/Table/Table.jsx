import React, {useState} from 'react'

import EditElementsModal from '../EditElementsModal/EditElementsModal'

import './Table.css'

function Table({info, updateData}) {

    const [bool, setBool] = useState(false)
    const [modal, setModal] = useState([])

    const editRowInfo = (rowInfo) => {
        setBool(!bool)
        setModal(rowInfo)
    }

    const deleteItem = (data) => {
        updateData(data)
        setBool(!bool)
    }


    return (
        <>
            {bool && <EditElementsModal element={modal} hideModal={() => setBool(!bool)} deleteItem={(updateData) => deleteItem(updateData)} />}
            <div className="row Table__Header">
                <div className="col">Fecha</div>
                <div className="col">Hora</div>
                <div className="col">Consumo (Wh)</div>
                <div className="col">Precio (€/kWh)</div>
                <div className="col">Coste por hora (€)</div>
            </div>
            <div className="Table__Wrapper">
                {info.map(el =>
                    <div className="row Table__Rows" onClick={() => editRowInfo(el)}>
                        <div className="col Table__Rows__Date">{el.fecha}</div>
                        <div className="col">{el.hora}</div>
                        <div className="col">{el.consumo}</div>
                        <div className="col">{el.precio}</div>
                        <div className="col">{el.coste}</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Table