import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

// export const insertMovie = payload => api.post(`/movie`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

export const addUserToDatabase = user => api.post(`/user/createUser`, user)

export const startAlgorithm = () => api.get(`/algorithm`)

export const addUserPreference = userPreference => api.post(`/user/userPreference`, userPreference)

export const addCourse = course => api.post('/class/createClass', course)

// const apis = {
//     insertMovie,
//     getAllMovies,
//     updateMovieById,
//     deleteMovieById,
//     getMovieById,
// }

const apis = {
    addUserToDatabase,
    startAlgorithm,
    addUserPreference,
    addCourse,
}

export default apis
