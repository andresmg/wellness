import axios from "axios"

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    withCredentials: true,
})

http.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        if (error.response?.status === 401) {
            localStorage.clear()
            window.location.assign("/")
        }

        return Promise.reject(error)
    }
)


export const dataUpload = (data) => http.post("/uploaddata", {data})
export const getData = () => http.get("/getdata")
export const deleteRow = (id) => http.get(`/deleteitem/${id}`)
export const updateRow = ({id, dataName, fecha, hora, consumo, precio, coste}) => http.patch(`/updateitem`, {id, dataName, fecha, hora, consumo, precio, coste})

