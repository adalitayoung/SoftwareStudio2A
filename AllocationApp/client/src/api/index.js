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

export const addStudentToClass = tempStudent => api.post(`/user/addToClass`, tempStudent)

export const addPreferencesBackground = tempStudent => api.post(`/user/addPreferencesBackground`, tempStudent)

//export const updateTechBackground = tempStudent => api.post(`/user/updateTechBackground`, tempStudent)

export const addCourse = course => api.post('/class/createClass', course)
export const getCourseByName = name => api.get(`/class/${name}`)
export const getAllCourses = () => api.get('/class/getAllClasses')

export const login = loginDetails => api.post('/user/login', loginDetails)

// const apis = {
//     insertMovie,
//     getAllMovies,
//     updateMovieById,
//     deleteMovieById,
//     getMovieById,
// }

const apis = {
    addUserToDatabase,
    addStudentToClass,
    startAlgorithm,
    addPreferencesBackground,
   // updateTechBackground,
    addCourse,
    getCourseByName,
    getAllCourses,
    login,
}

export default apis
