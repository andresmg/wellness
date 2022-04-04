import React, {useState} from 'react'

import {deleteRow, updateRow} from '../../services/ApiClient'
import {useFormState} from '../../hooks/useFormState'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'

import './EditElementsModal.css'


function EditElementsModal({deleteItem, element, hideModal}) {


    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                dataName: element.dataName,
                id: element.id,
                fecha: element.fecha,
                hora: element.hora,
                consumo: element.consumo,
                precio: element.precio,
                coste: element.coste,
            },
            error: {
                consumo: true,
                precio: true,
                coste: true,
            },
            touch: {},
        },
        {
            consumo: v => v.length,
            precio: v => v.length,
            coste: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteRow(id)
        deleteItem(updateData)
    }

    const editCarrouselItem = async () => {

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateRow(data)
                    .then(updateData => {
                        deleteItem(updateData)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Please change at least one field')
        }
    }

    return (
        <>
            <div className="EditElementsModal">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-5 EditElementsModal__container">
                            <span className="EditElementsModal__close" onClick={hideModal}></span>

                            <div className="col-sm-12">
                                <p className="EditElementsModal__ask">Edit row <span className="EditElementsModal__ask__date"><strong>date</strong> {element.fecha}</span><span className="EditElementsModal__ask__hour"><strong>hour</strong> {element.hora}</span></p>
                                <div className="card">
                                    <div className="card-body EditElementsModal__body">
                                        <div className="row align-items-center">
                                            <div className="col-sm-12">
                                                <InputWithLabel
                                                    value={data?.consumo}
                                                    onChange={onChange}
                                                    name="consumo"
                                                    type="text"
                                                    cssStyle="form-control"
                                                    placeholder={element?.title}
                                                    label={`Edit "consumo"`}
                                                />
                                            </div>
                                            <div className="col-sm-12">
                                                <InputWithLabel
                                                    value={data?.precio}
                                                    onChange={onChange}
                                                    name="precio"
                                                    type="text"
                                                    cssStyle="form-control"
                                                    placeholder={element?.title}
                                                    label={`Edit "precio"`}
                                                />
                                            </div>
                                            <div className="col-sm-12">
                                                <InputWithLabel
                                                    value={data?.coste}
                                                    onChange={onChange}
                                                    name="coste"
                                                    type="text"
                                                    cssStyle="form-control"
                                                    placeholder={element?.title}
                                                    label={`Edit "coste"`}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div onClick={() => editCarrouselItem(element.id)} className="wellness-btn">Edit row</div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div onClick={() => deleteCarrouselItem(element.id)} className="wellness-btn delete">Delete row</div>
                                            </div>
                                            <div className="col-12">
                                                {registerError && <p className="EditElementsModal__message">{registerError}</p>}
                                                {message && <p className="EditElementsModal__message">{message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EditElementsModal
