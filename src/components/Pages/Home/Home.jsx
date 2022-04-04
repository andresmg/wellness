import React, {useState, useEffect} from 'react'

import {dataUpload, getData} from '../../../services/ApiClient'

import InputFile from '../../Form/InputFile/InputFile'
import Table from '../../Table/Table'

import './Home.css'

function Home() {

    const [message, setMessage] = useState('')

    const [csvData, setCsvData] = useState([])

    const onFileSelected = async (selected) => {
        const csvFilePath = selected.target.files[0]

        const reader = new FileReader()

        reader.onload = function (e) {
            const text = JSON.stringify(e.target.result)
            convertToJson(text, csvFilePath.name)
        }

        reader.readAsText(csvFilePath)
    }

    const convertToJson = (inputCsv, fileName) => {

        const arrayCsv = inputCsv.replace(/\\r\\n\\r\\n/g, ', ').replace(/\\r\\n/g, ', ').split(',').map(s => s.replace(/"/gi, '').trim())

        const outputJson = []

        for (let i = 5; i < arrayCsv.length - 1; i += 5) {
            const [fecha, hora, consumo, precio, coste] =
                arrayCsv.slice(i, i + 5)

            outputJson.push({
                dataName: fileName.replace('.csv', ''),
                fecha,
                hora,
                consumo,
                precio,
                coste
            })
        }

        uploadData(outputJson)
        setCsvData(outputJson)

        setMessage('Data uploaded successfully.')
    }


    const uploadData = async (data) => {
        try {
            await dataUpload(data)
            const getAllData = await getData()
            setCsvData(getAllData)
        } catch (err) {
            setMessage(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setCsvData(data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getAllData = await getData()
            setCsvData(getAllData)
        }
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid Home">
            <div className="row">
                <div className="col-2 p-0 Home__Nav">
                    <div className="Home__Nav__Header" />
                    <div className="Home__Nav__FakeBorder" />
                    <div className="Home__Nav__Footer">{new Date().getFullYear()} © Wellness TechGroup</div>
                </div>
                <div className="col-10 Home__Content">

                    <div className="row justify-content-center">
                        <div className="col-10 Home__Content__Selectfile">
                            <h3>Upload new data</h3>
                            {!message ?
                                <InputFile
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="imgURL"
                                    type="file"
                                    classStyle="mt-5"
                                />
                                :
                                <>
                                    <p className="Home__Content__Error">{message}</p>
                                    <p className="Home__Content__Back" onClick={() => setMessage('')}>Back</p>
                                </>
                            }
                        </div>
                        <div className="col-10 Home__Content__Table">
                            {
                                csvData.length > 0 &&
                                <Table info={csvData} updateData={(data) => deleteItem(data)} />
                            }</div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Home

